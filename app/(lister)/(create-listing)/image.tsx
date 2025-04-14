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
import { useListingImageUploader } from "@/hooks/listing/draft/useListingImageUploader";
import { useUpdateDraftListing } from "@/hooks/listing/draft/useUpdateDraftListing";
import { getNextPage } from "@/utils/createListingUtil";
import { useImageUploader } from "@/utils/uploadthing";
import { updateListingDescriptionSchema } from "@/utils/validators";
import { Image as ExpoImage } from "expo-image";
import { openSettings } from "expo-linking";
import { router } from "expo-router";
import { cssInterop } from "nativewind";
import { useState } from "react";
import {
	Alert,
	Pressable,
	TextInput,
	TouchableOpacity,
	View,
} from "react-native";
import { ZodIssue } from "zod";
import Ionicons from "@expo/vector-icons/Ionicons";

const CURRENT = "image";

const Image = cssInterop(ExpoImage, {
	className: "style",
});

export default function CreateListingImagePage() {
	const [errors, setErrors] = useState<ZodIssue[]>([]);

	const { handleImagePicker, isUploading, image } = useListingImageUploader();

	async function onSubmit() {
		const nextPage = getNextPage(CURRENT);

		router.push(`/(lister)/(create-listing)/${nextPage}`);
	}

	return (
		<CreateListingContainer>
			<CreateListingHeader currentPage={CURRENT} done={2} max={7} />
			<CreateListingBody isLoading={isUploading} onSubmit={onSubmit}>
				<CreateListingSubheader current={3} max={7}>
					<CreateListingTitle>Image</CreateListingTitle>
					<CreateListingSubtitle>
						Choosing a compelling cover image adds visual appeal and reinforces
						the brand of your job listing.
					</CreateListingSubtitle>
				</CreateListingSubheader>
				<View className="flex-col gap-[5]">
					<CreateListingErrors errors={errors} />
					<Text className="text-xl">Select an image</Text>
					{!image && (
						<TouchableOpacity
							className="h-[200] w-full rounded-[20] bg-[#d9d9d9] justify-center items-center"
							onPress={handleImagePicker}
						>
							<Ionicons name="image" size={40} color="gray" />
							<Text className="text-lg text-gray-500">Select Image</Text>
						</TouchableOpacity>
					)}
					{image && (
						<View className="items-center gap-2">
							<Image
								className="h-[200] w-full rounded-[20]"
								source={{ uri: image }}
							/>
							<View className="flex-row items-center gap-3">
								<View className="flex-1 h-1 bg-zinc-300 rounded-full" />
								<Text className="text-muted font-zain-bold">OR</Text>
								<View className="flex-1 h-1 bg-zinc-300 rounded-full" />
							</View>
							<TouchableOpacity
								className="py-3 w-full rounded-[20] bg-[#D6E5D0] items-center justify-center"
								onPress={handleImagePicker}
							>
								<Text className="text-theme font-zain-bold">
									Select new Image
								</Text>
							</TouchableOpacity>
						</View>
					)}
				</View>
			</CreateListingBody>
		</CreateListingContainer>
	);
}
