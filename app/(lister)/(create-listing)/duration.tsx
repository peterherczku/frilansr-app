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

const CURRENT = "duration";

export default function CreateListingDurationpage() {
	const { updateDraft, isPending } = useUpdateDraftListing();
	const [errors, setErrors] = useState<ZodIssue[]>([]);

	async function onSubmit() {
		/*const res = updateListingTypeSchema.safeParse({ type });
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
			<CreateListingHeader currentPage={CURRENT} done={6} max={8} />
			<CreateListingBody
				scrollable={false}
				isLoading={isPending}
				onSubmit={onSubmit}
			>
				<CreateListingSubheader current={7} max={8}>
					<CreateListingTitle>Duration</CreateListingTitle>
					<CreateListingSubtitle>
						Specify the approximate duration of the job
					</CreateListingSubtitle>
				</CreateListingSubheader>
				<View className="flex-col">
					<CreateListingErrors errors={errors} />
					<Text className="text-xl">Duration</Text>
				</View>
			</CreateListingBody>
		</CreateListingContainer>
	);
}
