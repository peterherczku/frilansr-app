import { Feather, FontAwesome6 } from "@expo/vector-icons";
import { Image as ExpoImage } from "expo-image";
import { router, useLocalSearchParams } from "expo-router";
import { ActivityIndicator, TouchableOpacity, View } from "react-native";
import { Colors } from "@/constants/Colors";
import { ListingHeader } from "@/components/listing/ListingHeader";
import { LocationBox, LocationMapView } from "@/components/listing/LocationBox";
import { ListingJobLister } from "@/components/listing/ListingJobLister";
import { Dimensions } from "react-native";
import { useListing } from "@/hooks/listing/useListing";
import { SafeAreaView } from "react-native-safe-area-context";
import { Text } from "@/components/ui/Text";
import { cssInterop } from "nativewind";
import { jobTypeText } from "@/utils/enumUtils";
import { formatDate } from "@/utils/dateUtil";
import {
	convertCentsToDecimalString,
	formatMoney,
	formatRawMoney,
} from "@/utils/numberUtil";
import { Circle } from "react-native-maps";
import { calculateNetPayout } from "@/utils/paymentUtil";

const Image = cssInterop(ExpoImage, {
	className: "style",
});

export default function ListingIndexPage() {
	const { id } = useLocalSearchParams();

	const { listing, isLoading, error } = useListing(id as string);
	if (isLoading) {
		return (
			<SafeAreaView className="flex-1 bg-white justify-center items-center">
				<ActivityIndicator size="large" color="gray" />
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

	const netPayout = formatRawMoney(
		calculateNetPayout(listing.salary, listing.duration)
	);

	return (
		<>
			<ListingHeader listing={listing}>
				<View className="m-[20] z-0">
					<View className="flex-row items-center justify-between">
						<View>
							<Text className="text-2xl font-zain-bold">{listing.title}</Text>
							<Text className="text-[17px] text-muted mt-[-8]">
								{jobTypeText(listing.type)}
							</Text>
						</View>
						<View className="flex-row items-center justify-between">
							<Image
								source={{ uri: listing.user.imageUrl }}
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
									{listing.duration} mins
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
								{formatDate(listing.date)}
							</Text>
						</View>
					</View>
					<View className="flex-row justify-between items-center my-[5]">
						<Text className="text-xl font-zain-bold">Salary</Text>
						<Text className="text-lg font-zain-bold text-theme">
							{formatMoney(convertCentsToDecimalString(listing.salary))} kr /
							hour
						</Text>
					</View>
					<LocationBox>
						<LocationMapView
							initialRegion={{
								longitude: listing.location.longitude,
								latitude: listing.location.latitude,
								latitudeDelta: 0.0125,
								longitudeDelta: 0.0125,
							}}
							className="my-[10]"
						>
							<Circle
								center={listing.location}
								radius={200}
								strokeWidth={2}
								strokeColor="rgba(52, 152, 219, 0.8)"
								fillColor="rgba(52, 152, 219, 0.5)"
							/>
						</LocationMapView>
					</LocationBox>
					<ListingJobLister id={id as string} />
				</View>
			</ListingHeader>
			<TouchableOpacity
				className="absolute bottom-[40] left-[20] h-[50] m-auto bg-theme rounded-lg shadow-custom flex-row justify-between items-center px-[25]"
				style={{
					width: Dimensions.get("window").width - 40,
				}}
				onPress={() => router.push(`/(worker)/(listing)/${id}/apply`)}
			>
				<Text className="font-zain-bold text-white text-xl">
					Apply for the job
				</Text>
				<Text className="text-white font-zain-bold text-xl">
					{netPayout} kr
				</Text>
			</TouchableOpacity>
		</>
	);
}
