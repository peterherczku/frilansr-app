import { TouchableOpacity, View } from "react-native";
import { Colors } from "@/constants/Colors";
import { FontAwesome6, Ionicons } from "@expo/vector-icons";
import { Image as ExpoImage } from "expo-image";
import { router } from "expo-router";
import { cssInterop } from "nativewind";
import { Text } from "../ui/Text";

const Image = cssInterop(ExpoImage, {
	className: "style",
});

export function ProfileRecentWorks({
	data,
}: {
	data: {
		id: number;
		image: string;
		title: string;
		workType: string;
		earnedMoney: string;
		duration: string;
	}[];
}) {
	function renderItem(item: {
		image: string;
		title: string;
		workType: string;
		id: number;
		earnedMoney: string;
		duration: string;
	}) {
		return (
			<TouchableOpacity
				key={item.id}
				className="flex-row items-center gap-[12] my-[5]"
			>
				<View className="relative">
					<Image
						source={{ uri: item.image }}
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
						<Text>{item.title}</Text>
						<Text className="text-sm mt-[-5] text-muted">{item.workType}</Text>
					</View>
					<View className="flex-row gap-[10] items-center">
						<View className="flex-row items-center gap-[6]">
							<FontAwesome6
								name="sack-dollar"
								size={14}
								color={Colors.light.muted}
							/>
							<Text className="mt-[2] text-muted">{item.earnedMoney}</Text>
						</View>
						<View className="w-[6] h-[6] rounded-full bg-muted" />
						<View className="flex-row items-center gap-[6]">
							<FontAwesome6 name="clock" size={14} color={Colors.light.muted} />
							<Text className="mt-[2] text-muted">{item.duration}</Text>
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
					onPress={() => router.navigate("/(tabs)/past-jobs")}
				>
					<Text className="font-zain-bold text-2xl text-theme">See all</Text>
					<Ionicons
						name="chevron-forward"
						size={24}
						color={Colors.light.themeColor}
					/>
				</TouchableOpacity>
			</View>
			{data.map(renderItem)}
		</View>
	);
}
