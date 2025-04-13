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
import { updateListingTitleSchema } from "@/utils/validators";
import { router } from "expo-router";
import { useState } from "react";
import { View } from "react-native";
import { ZodIssue } from "zod";

const CURRENT = "salary";

export default function CreateListingSalaryPage() {
	const { draft } = useDraftListing();
	const { updateDraft, isPending } = useUpdateDraftListing();
	const [errors, setErrors] = useState<ZodIssue[]>([]);
	const [title, setTitle] = useState(draft?.draft.title || "");

	async function onSubmit() {
		const res = updateListingTitleSchema.safeParse({ title });
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
						Choose a concise and catchy title that immediately grabs attention.
					</CreateListingSubtitle>
				</CreateListingSubheader>
				<View className="flex-col">
					<CreateListingErrors errors={errors} />
				</View>
			</CreateListingBody>
		</CreateListingContainer>
	);
}
