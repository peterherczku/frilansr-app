import { JobType } from "@/api/listingFunctions";
import {
	CreateListingBody,
	CreateListingContainer,
	CreateListingErrors,
	CreateListingHeader,
	CreateListingSubheader,
	CreateListingSubtitle,
	CreateListingTitle,
} from "@/components/lister/createListing/CreateListing";
import { JobTypeSelectInput } from "@/components/lister/createListing/JobTypeSelectInput";
import { Text } from "@/components/ui/Text";
import { useUpdateDraftListing } from "@/hooks/listing/draft/useUpdateDraftListing";
import { getNextPage } from "@/utils/createListingUtil";
import { updateListingTypeSchema } from "@/utils/validators";
import { router } from "expo-router";
import { useState } from "react";
import { TextInput, View } from "react-native";
import { ZodIssue } from "zod";

const CURRENT = "type";

export default function CreateListingTypePage() {
	const { updateDraft, isPending } = useUpdateDraftListing();
	const [errors, setErrors] = useState<ZodIssue[]>([]);
	const [type, setType] = useState<JobType>("DOG_WALKING");

	async function onSubmit() {
		const res = updateListingTypeSchema.safeParse({ type });
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
			<CreateListingHeader currentPage={CURRENT} done={0} max={7} />
			<CreateListingBody
				scrollable={false}
				isLoading={isPending}
				onSubmit={onSubmit}
			>
				<CreateListingSubheader current={1} max={7}>
					<CreateListingTitle>Job type</CreateListingTitle>
					<CreateListingSubtitle>
						Choose the most fitting job type to help candidates understand the
						nature of the job.
					</CreateListingSubtitle>
				</CreateListingSubheader>
				<View className="flex-col">
					<CreateListingErrors errors={errors} />
					<Text className="text-xl">Type</Text>
					<JobTypeSelectInput selected={type} setSelected={setType} />
				</View>
			</CreateListingBody>
		</CreateListingContainer>
	);
}
