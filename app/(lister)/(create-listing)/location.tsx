import {
	CreateListingBody,
	CreateListingContainer,
	CreateListingErrors,
	CreateListingHeader,
	CreateListingSubheader,
	CreateListingSubtitle,
	CreateListingTitle,
} from "@/components/lister/createListing/CreateListing";
import { LocationMapView } from "@/components/listing/LocationBox";
import { Text } from "@/components/ui/Text";
import { useDraggableMarker } from "@/hooks/listing/draft/useDraggableMarker";
import { useUpdateDraftListing } from "@/hooks/listing/draft/useUpdateDraftListing";
import { getNextPage } from "@/utils/createListingUtil";
import { updateListingLocationSchema } from "@/utils/validators";
import { FontAwesome5 } from "@expo/vector-icons";
import { router } from "expo-router";
import { useState } from "react";
import { View } from "react-native";
import { ZodIssue } from "zod";

const CURRENT = "location";

export default function CreateListingLocationPage() {
	const { updateDraft, isPending } = useUpdateDraftListing();
	const [errors, setErrors] = useState<ZodIssue[]>([]);
	const {
		isMapMoving,
		handleRegionChange,
		markerPosition,
		handleRegionChangeComplete,
	} = useDraggableMarker();

	async function onSubmit() {
		const res = updateListingLocationSchema.safeParse(markerPosition);
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
			<CreateListingHeader currentPage={CURRENT} done={4} max={7} />
			<CreateListingBody
				isLoading={isPending || isMapMoving}
				onSubmit={onSubmit}
			>
				<CreateListingSubheader current={5} max={7}>
					<CreateListingTitle>Location</CreateListingTitle>
					<CreateListingSubtitle>
						Select the exact position of the starting location of the job.
					</CreateListingSubtitle>
				</CreateListingSubheader>
				<View className="flex-col">
					<CreateListingErrors errors={errors} />
					<Text className="text-xl">Pick location</Text>
					<View className="relative">
						<LocationMapView
							className="rounded-[20] h-[200]"
							onRegionChange={handleRegionChange}
							onRegionChangeComplete={handleRegionChangeComplete}
						/>
						<View className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-full shadow-lg">
							<FontAwesome5 name="map-marker-alt" size={40} color={"#1289A7"} />
						</View>
					</View>
				</View>
			</CreateListingBody>
		</CreateListingContainer>
	);
}
