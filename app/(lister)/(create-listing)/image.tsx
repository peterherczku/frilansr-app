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
import { getNextPage } from "@/utils/createListingUtil";
import { Image as ExpoImage, useImage } from "expo-image";
import { router } from "expo-router";
import { cssInterop, remapProps } from "nativewind";
import { useMemo, useState } from "react";
import {
	ActivityIndicator,
	Alert,
	Pressable,
	TextInput,
	TouchableOpacity,
	View,
} from "react-native";
import { ZodIssue } from "zod";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Skeleton } from "@/components/ui/Skeleton";
import { cn } from "@/utils/cn";

const CURRENT = "image";

const Image = cssInterop(ExpoImage, {
	className: "style",
});

function ListingImageUploading() {
	return (
		<TouchableOpacity className="h-[200] w-full rounded-[20] bg-[#d9d9d9] justify-center items-center">
			<ActivityIndicator size={"large"} color={"gray"} />
		</TouchableOpacity>
	);
}

function ListingSelectImageZone({
	handleImagePicker,
	isUploading,
}: {
	handleImagePicker: () => void;
	isUploading: boolean;
}) {
	return (
		<TouchableOpacity
			className="h-[200] w-full rounded-[20] bg-[#d9d9d9] justify-center items-center"
			onPress={handleImagePicker}
		>
			{isUploading && <ActivityIndicator size={"large"} color={"gray"} />}
			{!isUploading && (
				<>
					<Ionicons name="image" size={40} color="gray" />
					<Text className="text-lg text-gray-500">Select Image</Text>
				</>
			)}
		</TouchableOpacity>
	);
}

function ListingImageOrUploadNew({
	imageLoading,
	setImageLoading,
	image,
	handleImagePicker,
}: {
	imageLoading: boolean;
	setImageLoading: (loading: boolean) => void;
	image: string | undefined;
	handleImagePicker: () => void;
}) {
	return (
		<View className="items-center gap-2">
			{imageLoading && (
				<Skeleton
					width={"100%"}
					height={200}
					className="rounded-[20] absolute z-10"
				/>
			)}
			<Image
				className="h-[200] w-full rounded-[20]"
				onLoadStart={() => setImageLoading(true)}
				onLoadEnd={() => setImageLoading(false)}
				onError={() => setImageLoading(false)}
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
				<Text className="text-theme font-zain-bold">Select new Image</Text>
			</TouchableOpacity>
		</View>
	);
}

export default function CreateListingImagePage() {
	const [errors, setErrors] = useState<ZodIssue[]>([]);

	const [imageLoading, setImageLoading] = useState(false);
	const { handleImagePicker, isUploading, image } = useListingImageUploader();

	async function onSubmit() {
		const nextPage = getNextPage(CURRENT);

		router.push(`/(lister)/(create-listing)/${nextPage}`);
	}

	return (
		<CreateListingContainer>
			<CreateListingHeader currentPage={CURRENT} done={2} max={8} />
			<CreateListingBody
				isLoading={isUploading || imageLoading}
				onSubmit={onSubmit}
			>
				<CreateListingSubheader current={3} max={8}>
					<CreateListingTitle>Image</CreateListingTitle>
					<CreateListingSubtitle>
						Choosing a compelling cover image adds visual appeal and reinforces
						the brand of your job listing.
					</CreateListingSubtitle>
				</CreateListingSubheader>
				<View className="flex-col gap-[5]">
					<CreateListingErrors errors={errors} />
					<Text className="text-xl">Select an image</Text>
					{isUploading ? (
						<ListingImageUploading />
					) : !image ? (
						<ListingSelectImageZone
							isUploading={isUploading}
							handleImagePicker={handleImagePicker}
						/>
					) : (
						<ListingImageOrUploadNew
							imageLoading={imageLoading}
							setImageLoading={setImageLoading}
							handleImagePicker={handleImagePicker}
							image={image}
						/>
					)}
				</View>
			</CreateListingBody>
		</CreateListingContainer>
	);
}
