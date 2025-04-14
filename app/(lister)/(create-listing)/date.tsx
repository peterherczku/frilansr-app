import {
	CreateListingBody,
	CreateListingContainer,
	CreateListingErrors,
	CreateListingHeader,
	CreateListingSubheader,
	CreateListingSubtitle,
	CreateListingTitle,
} from "@/components/lister/createListing/CreateListing";
import { JobDateSelectInput } from "@/components/lister/createListing/JobDateSelectInput";
import { Text } from "@/components/ui/Text";
import { useUpdateDraftListing } from "@/hooks/listing/draft/useUpdateDraftListing";
import { useState } from "react";
import { TouchableOpacity, View } from "react-native";
import { ZodIssue } from "zod";
import DateTimePicker from "@react-native-community/datetimepicker";
import { JobTimeSelectInput } from "@/components/lister/createListing/JobTimeSelectInput";
import { differenceInMinutes } from "@/utils/dateUtil";
import { updateListingDateDurationSchema } from "@/utils/validators";
import { getNextPage } from "@/utils/createListingUtil";
import { router } from "expo-router";
import { useDraftListing } from "@/hooks/listing/draft/useDraftListing";

const CURRENT = "date";
type ActiveModal = "date" | "starting" | "ending" | null;

function calculateEndingTime(start: Date, duration: number): Date {
	const ending = new Date(start);
	ending.setMinutes(ending.getMinutes() + duration);
	return ending;
}

export default function CreateListingDurationpage() {
	const { draft } = useDraftListing();
	const { updateDraft, isPending } = useUpdateDraftListing();
	const [errors, setErrors] = useState<ZodIssue[]>([]);

	const [activeModal, setActiveModal] = useState<ActiveModal>(null);

	const initialDate = draft?.draft.date
		? new Date(draft.draft.date)
		: new Date();
	const initialDuration = draft?.draft.duration;
	const [date, setDate] = useState<Date>(initialDate);
	const [startingTime, setStartingTime] = useState<Date>(initialDate);
	const [endingTime, setEndingTime] = useState<Date>(
		initialDuration
			? calculateEndingTime(initialDate, initialDuration)
			: new Date()
	);

	async function onSubmit() {
		const finalDate = new Date(
			date.getFullYear(),
			date.getMonth(),
			date.getDate(),
			startingTime.getHours(),
			startingTime.getMinutes(),
			startingTime.getMilliseconds()
		);
		const duration = differenceInMinutes(endingTime, startingTime);
		const res = updateListingDateDurationSchema.safeParse({
			date: finalDate.toISOString(),
			duration,
		});
		if (!res.success) {
			setErrors(res.error.issues);
			return;
		}

		try {
			await updateDraft(res.data);
			const nextPage = getNextPage(CURRENT);

			router.push(`/(lister)/(create-listing)/${nextPage}`);
		} catch (error) {
			console.error("Failed to update draft:", error);
		}
	}

	function confirmModal(newDate: Date) {
		switch (activeModal) {
			case "date":
				setDate(newDate);
				break;
			case "starting":
				setStartingTime(newDate);
				if (newDate > endingTime) setEndingTime(newDate);
				break;
			case "ending":
				setEndingTime(newDate);
				break;
		}
	}

	const renderDateTimeModal = () => {
		if (!activeModal) return null;

		const currentValue =
			activeModal === "date"
				? date
				: activeModal === "starting"
				? startingTime
				: endingTime;
		const mode = activeModal === "date" ? "date" : "time";

		return (
			<>
				<View
					className="absolute top-0 left-0 w-screen h-screen z-10"
					style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
				/>
				<View className="absolute w-full bottom-0 z-20">
					<View className="my-[50] mx-[20] p-4 bg-white rounded-[10] shadow-lg">
						<Text className="text-lg font-zain-bold text-center">
							{activeModal === "date" && "Schedule job"}
							{activeModal === "starting" && "Starting time"}
							{activeModal === "ending" && "Ending time"}
						</Text>
						<DateTimePicker
							display="spinner"
							value={currentValue}
							mode={mode}
							minimumDate={activeModal === "ending" ? startingTime : new Date()}
							maximumDate={new Date(2025, 11, 31)}
							onChange={(e, selectedDate) => {
								if (selectedDate) {
									confirmModal(selectedDate);
								}
							}}
						/>
						<TouchableOpacity
							className="mt-4 bg-theme p-4 rounded-lg"
							onPress={() => setActiveModal(null)}
						>
							<Text className="text-xl text-center text-white font-zain-bold">
								Confirm
							</Text>
						</TouchableOpacity>
					</View>
				</View>
			</>
		);
	};

	return (
		<CreateListingContainer>
			<CreateListingHeader currentPage={CURRENT} done={6} max={8} />
			<CreateListingBody
				scrollable={false}
				isLoading={isPending || activeModal !== null}
				onSubmit={onSubmit}
			>
				<CreateListingSubheader current={7} max={8}>
					<CreateListingTitle>Date</CreateListingTitle>
					<CreateListingSubtitle>
						Specify the date and the approximate duration of the job
					</CreateListingSubtitle>
				</CreateListingSubheader>
				<View className="flex-col gap-2">
					<CreateListingErrors errors={errors} />
					<Text className="text-xl">Date</Text>
					<JobDateSelectInput
						date={date}
						setDateVisible={() => setActiveModal("date")}
					/>
					<Text className="text-xl">Starting time</Text>
					<JobTimeSelectInput
						time={startingTime}
						setModalVisible={() => setActiveModal("starting")}
					/>
					<Text className="text-xl">Ending time</Text>
					<JobTimeSelectInput
						time={endingTime}
						setModalVisible={() => setActiveModal("ending")}
					/>
				</View>
			</CreateListingBody>
			{renderDateTimeModal()}
		</CreateListingContainer>
	);
}
