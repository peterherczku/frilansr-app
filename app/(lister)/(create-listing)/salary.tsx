import {
	CreateListingBody,
	CreateListingContainer,
	CreateListingErrors,
	CreateListingHeader,
	CreateListingSubheader,
	CreateListingSubtitle,
	CreateListingTitle,
} from "@/components/lister/createListing/CreateListing";
import { Text } from "@/components/ui/Text";
import { useDraftListing } from "@/hooks/listing/draft/useDraftListing";
import { useUpdateDraftListing } from "@/hooks/listing/draft/useUpdateDraftListing";
import { getNextPage } from "@/utils/createListingUtil";
import { convertCentsToDecimalString } from "@/utils/numberUtil";
import {
	updateListingSalarySchema,
	updateListingTitleSchema,
} from "@/utils/validators";
import { router } from "expo-router";
import { useState } from "react";
import { TextInput, View } from "react-native";
import { ZodIssue } from "zod";

const CURRENT = "salary";

export default function CreateListingSalaryPage() {
	const { draft } = useDraftListing();
	const { updateDraft, isPending } = useUpdateDraftListing();
	const [errors, setErrors] = useState<ZodIssue[]>([]);
	const salaryValue = draft?.draft.salary;
	const [salary, setSalary] = useState(
		salaryValue !== undefined ? convertCentsToDecimalString(salaryValue) : ""
	);

	async function onSubmit() {
		const res = updateListingSalarySchema.safeParse({ salary });
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

	return (
		<CreateListingContainer>
			<CreateListingHeader currentPage={CURRENT} done={3} max={7} />
			<CreateListingBody isLoading={isPending} onSubmit={onSubmit}>
				<CreateListingSubheader current={4} max={7}>
					<CreateListingTitle>Salary</CreateListingTitle>
					<CreateListingSubtitle>
						Outlining an accurate salary attracts applicants who value fair
						compensation.
					</CreateListingSubtitle>
				</CreateListingSubheader>
				<View className="flex-col">
					<CreateListingErrors errors={errors} />
					<Text className="text-xl">Enter amount</Text>
					<View className="flex-row items-center gap-2 bg-[#d9d9d9] px-6 rounded-[20] py-2">
						<TextInput
							keyboardType="numeric"
							value={salary}
							onChangeText={setSalary}
							numberOfLines={2}
							multiline={true}
							placeholder="1,000"
							className="text-3xl text-muted"
						/>
						<Text className="text-3xl text-muted mt-[8]">kr per hour</Text>
					</View>
				</View>
			</CreateListingBody>
		</CreateListingContainer>
	);
}
