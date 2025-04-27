import { ActivityIndicator, TouchableOpacity, View } from "react-native";
import { Colors } from "@/constants/Colors";
import { FontAwesome6, Ionicons } from "@expo/vector-icons";
import { Image as ExpoImage } from "expo-image";
import { router } from "expo-router";
import { cssInterop } from "nativewind";
import { Text } from "../ui/Text";
import { useRecentWorkerJobs } from "@/hooks/job/useRecentWorkerJobs";
import { CompletedJobWithUser } from "@/api/jobFunctions";
import { jobTypeText } from "@/utils/enumUtils";
import { formatRawMoney } from "@/utils/numberUtil";
import { calculateEstimatedPayout } from "@/utils/paymentUtil";

const Image = cssInterop(ExpoImage, {
	className: "style",
});

export function ProfileRecentWorks() {
	const { recentJobs, isLoading, error } = useRecentWorkerJobs();

	if (error) {
		return (
			<View className="flex-1 bg-white justify-center items-center py-[120]">
				<Text className="text-red-500">
					Error loading {JSON.stringify(error)}
				</Text>
			</View>
		);
	}

	if (isLoading || recentJobs === undefined) {
		return (
			<View className="flex-1 bg-white justify-center items-center py-[120]">
				<ActivityIndicator size={"large"} color={"gray"} />
			</View>
		);
	}

	function renderItem(item: CompletedJobWithUser) {
		return (
			<TouchableOpacity
				key={item.id}
				className="flex-row items-center gap-[12] my-[5]"
			>
				<View className="relative">
					<Image
						source={{ uri: item.listing.image }}
						className="w-[70] bg-[#d9d9d9] h-[70] rounded-lg"
					/>
					<View
						className="absolute w-[70] h-[70] rounded-lg z-[100]"
						style={{
							backgroundColor: "rgba(0,0,0,0.25)",
						}}
					/>
				</View>
				<View className="flex-col">
					<View>
						<Text>{item.listing.title}</Text>
						<Text className="text-sm mt-[-5] text-muted">
							{jobTypeText(item.listing.type)}
						</Text>
					</View>
					<View className="flex-row gap-[10] items-center">
						<View className="flex-row items-center gap-[6]">
							<FontAwesome6
								name="sack-dollar"
								size={14}
								color={Colors.light.muted}
							/>
							<Text className="mt-[2] text-muted">
								{formatRawMoney(
									calculateEstimatedPayout(
										item.listing.salary,
										item.listing.duration
									)
								)}{" "}
								SEK
							</Text>
						</View>
						<View className="w-[6] h-[6] rounded-full bg-muted" />
						<View className="flex-row items-center gap-[6]">
							<FontAwesome6 name="clock" size={14} color={Colors.light.muted} />
							<Text className="mt-[2] text-muted">
								{item.listing.duration} mins
							</Text>
						</View>
					</View>
				</View>
			</TouchableOpacity>
		);
	}

	return (
		<View className="m-[20] flex-col gap-[10]">
			<View className="flex-row justify-between items-center gap-[5]">
				<Text className="text-[25px] font-zain-bold">Recent works</Text>
				<TouchableOpacity
					className="flex-row items-center justify-between gap-[5]"
					onPress={() => router.navigate("/(worker)/(tabs)/past-jobs")}
				>
					<Text className="font-zain-bold text-2xl text-theme">See all</Text>
					<Ionicons
						name="chevron-forward"
						size={24}
						color={Colors.light.themeColor}
					/>
				</TouchableOpacity>
			</View>
			{recentJobs.map(renderItem)}
		</View>
	);
}
