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
import { updateListingDescriptionSchema } from "@/utils/validators";
import { router } from "expo-router";
import { useState } from "react";
import { TextInput, View } from "react-native";
import { ZodIssue } from "zod";

const CURRENT = "description";

export default function CreateListingDescriptionPage() {
	const { draft } = useDraftListing();
	const { updateDraft, isPending } = useUpdateDraftListing();
	const [errors, setErrors] = useState<ZodIssue[]>([]);
	const [description, setDescription] = useState(
		draft?.draft.description || ""
	);

	async function onSubmit() {
		const res = updateListingDescriptionSchema.safeParse({ description });
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
			<CreateListingHeader currentPage={CURRENT} done={1} max={7} />
			<CreateListingBody isLoading={isPending} onSubmit={onSubmit}>
				<CreateListingSubheader current={2} max={7}>
					<CreateListingTitle>Description</CreateListingTitle>
					<CreateListingSubtitle>
						Crafting a clear job description helps candidates understand the
						role and decide if it suits their skills.
					</CreateListingSubtitle>
				</CreateListingSubheader>
				<View className="flex-col">
					<CreateListingErrors errors={errors} />
					<Text className="text-xl">Description</Text>
					<View className="text-lg py-2 px-6 rounded-[20] bg-[#d9d9d9]">
						<TextInput
							value={description}
							onChangeText={setDescription}
							numberOfLines={2}
							multiline={true}
							placeholder="Responsible for daily walks and ensuring pets are well-cared for. Duties include feeding, playing, and monitoring pet safety."
							className="text-base h-[80]"
						/>
					</View>
				</View>
			</CreateListingBody>
		</CreateListingContainer>
	);
}
