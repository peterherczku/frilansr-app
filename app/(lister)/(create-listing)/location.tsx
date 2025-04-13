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
import { useDraftListing } from "@/hooks/listing/useDraftListing";
import { useUpdateDraftListing } from "@/hooks/listing/useUpdateDraftListing";
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

const CURRENT = "location";

export default function CreateListingLocationPage() {
	const { draft } = useDraftListing();
	const { updateDraft, isPending } = useUpdateDraftListing();
	const [errors, setErrors] = useState<ZodIssue[]>([]);

	async function onSubmit() {
		/*const res = updateListingSalarySchema.safeParse({ salary });
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
		}*/
	}

	return (
		<CreateListingContainer>
			<CreateListingHeader currentPage={CURRENT} done={4} max={7} />
			<CreateListingBody isLoading={isPending} onSubmit={onSubmit}>
				<CreateListingSubheader current={5} max={7}>
					<CreateListingTitle>Location</CreateListingTitle>
					<CreateListingSubtitle>
						Select the exact position of the starting location of the job.
					</CreateListingSubtitle>
				</CreateListingSubheader>
				<View className="flex-col">
					<CreateListingErrors errors={errors} />
					<Text className="text-xl">Pick location</Text>
				</View>
			</CreateListingBody>
		</CreateListingContainer>
	);
}
