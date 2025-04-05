import { useListing } from "@/hooks/listing/useListing";
import { Image as ExpoImage } from "expo-image";
import { remapProps } from "nativewind";
import { View } from "react-native";
import { Text } from "../Text";

const Image = remapProps(ExpoImage, {
	className: "style",
});

export function ListingJobLister({ id }: { id: string }) {
	const { listing, isLoading, error } = useListing(id as string);
	if (isLoading) {
		return (
			<View>
				<Text>Loading</Text>
			</View>
		);
	}
	if (error || !listing) {
		return (
			<View>
				<Text>Error {error?.message ?? ""}</Text>
			</View>
		);
	}

	return (
		<View className="my-[20]">
			<Text className="zain-bold text-2xl">About the Job Lister</Text>
			<Text className="mt-[-6] text-muted">
				More information will be revealed after taking the job
			</Text>
			<View className="mt-[10] mb-[70] flex-row items-center gap-[15]">
				<Image
					source={{ uri: listing.user.imageUrl }}
					className="w-[100] h-[100] rounded-full bg-[#d9d9d9]"
				/>
				<View>
					<Text className="zain-bold text-xl">{listing.user.name}</Text>
					<Text
						numberOfLines={2}
						className="text-muted leading-[20] max-w-[200]"
					>
						Pellentesque tincidunt lectus et mi lacinia interdum. Nam sit amet
						metus.
					</Text>
				</View>
			</View>
		</View>
	);
}
