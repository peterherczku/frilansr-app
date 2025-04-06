import { Feather, FontAwesome6 } from "@expo/vector-icons";
import { Image as ExpoImage } from "expo-image";
import { router, useLocalSearchParams } from "expo-router";
import { TouchableOpacity, View } from "react-native";
import { Colors } from "@/constants/Colors";
import { ListingHeader } from "@/components/listing/ListingHeader";
import { useUser } from "@clerk/clerk-expo";
import { LocationBox, LocationMapView } from "@/components/listing/LocationBox";
import { ListingJobLister } from "@/components/listing/ListingJobLister";
import { Dimensions } from "react-native";
import { useListing } from "@/hooks/listing/useListing";
import { SafeAreaView } from "react-native-safe-area-context";
import { Text } from "@/components/ui/Text";
import { cssInterop } from "nativewind";

const Image = cssInterop(ExpoImage, {
	className: "style",
});

export default function ListingIndexPage() {
	const { id } = useLocalSearchParams();
	const { user } = useUser();

	const { listing, isLoading, error } = useListing(id as string);
	if (isLoading) {
		return (
			<SafeAreaView>
				<Text>Loading</Text>
			</SafeAreaView>
		);
	}
	if (error || !listing) {
		return (
			<SafeAreaView>
				<Text>Error {error?.message}</Text>
			</SafeAreaView>
		);
	}

	return (
		<>
			<ListingHeader>
				<View className="m-[20] z-0">
					<View className="flex-row items-center justify-between">
						<View>
							<Text className="text-2xl font-zain-bold">{listing.title}</Text>
							<Text className="text-[17px] text-muted mt-[-8]">
								{listing.type}
							</Text>
						</View>
						<View className="flex-row items-center justify-between">
							<Image
								source={{ uri: user?.imageUrl }}
								className="w-[50] h-[50] rounded-full"
							/>
						</View>
					</View>
					<View className="flex-row gap-[10] my-[20]">
						<View
							className="rounded-lg h-[45] flex-1 flex-row justify-between items-center px-[12]"
							style={{
								backgroundColor: "rgba(85,147,62,0.4)",
							}}
						>
							<View className="flex-row items-center gap-[10]">
								<FontAwesome6
									name="clock"
									size={25}
									color={Colors.light.themeColor}
								/>
								<Text className="text-theme text-lg">Job length</Text>
							</View>
							<View>
								<Text className="text-[17px] font-zain-bold text-theme">
									40 - 50 mins
								</Text>
							</View>
						</View>
						<TouchableOpacity
							className="rounded-lg h-[45] w-[45] flex-row items-center justify-center"
							style={{
								backgroundColor: "rgba(85,147,62,0.4)",
							}}
						>
							<FontAwesome6
								name="heart-circle-plus"
								size={20}
								color={Colors.light.themeColor}
							/>
						</TouchableOpacity>
						<TouchableOpacity
							className="h-[45] w-[45] rounded-lg flex-row items-center justify-center"
							style={{
								backgroundColor: "rgba(85,147,62,0.4)",
							}}
						>
							<Feather name="share" size={20} color={Colors.light.themeColor} />
						</TouchableOpacity>
					</View>
					<View className="flex-row justify-between items-center my-[5]">
						<Text className="text-xl font-zain-bold">Date</Text>
						<View>
							<Text className="text-lg font-zain-bold text-theme">
								Monday at 13:00 - 14:00
							</Text>
						</View>
					</View>
					<View className="flex-row justify-between items-center my-[5]">
						<Text className="text-xl font-zain-bold">Salary</Text>
						<Text className="text-lg font-zain-bold text-theme">
							120,00 kr / hour
						</Text>
					</View>
					<LocationBox>
						<LocationMapView className="my-[10]" />
					</LocationBox>
					<ListingJobLister id={id as string} />
				</View>
			</ListingHeader>
			<TouchableOpacity
				className="absolute bottom-[40] left-[20] h-[50] m-auto bg-theme rounded-lg shadow-custom flex-row justify-between items-center px-[25]"
				style={{
					width: Dimensions.get("window").width - 40,
				}}
				onPress={() => router.push(`/(listing)/${id}/apply`)}
			>
				<Text className="font-zain-bold text-white text-xl">
					Apply for the job
				</Text>
				<Text className="text-white font-zain-bold text-xl">180,00 kr</Text>
			</TouchableOpacity>
		</>
	);
}
