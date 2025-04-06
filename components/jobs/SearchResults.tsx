import { FlatList, Pressable, View } from "react-native";
import { Image as ExpoImage } from "expo-image";
import { Colors } from "@/constants/Colors";
import { FontAwesome6 } from "@expo/vector-icons";
import { router } from "expo-router";
import { remapProps } from "nativewind";
import { Text } from "../ui/Text";

const Image = remapProps(ExpoImage, {
	className: "style",
});

export function SearchResults({
	results,
}: {
	results: {
		id: number;
		title: string;
		category: string;
		location: string;
		salary: string;
		duration: string;
		image: string;
	}[];
}) {
	function renderItem({
		item,
	}: {
		item: {
			id: number;
			title: string;
			category: string;
			location: string;
			salary: string;
			duration: string;
			image: string;
		};
	}) {
		return (
			<Pressable
				className="px-[20] py-[8] flex-row gap-[12] items-cente"
				onPress={() => router.push(`/(listing)/${item.id}`)}
			>
				<View className="relative">
					<Image
						source={{ uri: item.image }}
						className="w-[70] h-[70] rounded-lg"
					/>
					<View
						className="absolute top-0 left-0 w-[70] h-[70] rounded-lg"
						style={{
							backgroundColor: "rgba(0, 0, 0, 0.4)",
						}}
					/>
				</View>
				<View>
					<Text className="font-zain-bold">{item.title}</Text>
					<Text className="text-muted text-sm mt-[-8]">{item.category}</Text>
					<View className="flex-row gap-[10] items-center">
						<View className="flex-row gap-[10] items-center">
							<FontAwesome6
								name="sack-dollar"
								size={12}
								color={Colors.light.muted}
							/>
							<Text className="text-muted text-sm mt-[2] ml-[-2]">
								{item.salary}
							</Text>
						</View>
						<View className="w-[5] h-[5] rounded-full bg-muted" />
						<View className="flex-row gap-[10] items-center">
							<FontAwesome6
								name="map-location-dot"
								size={12}
								color={Colors.light.muted}
							/>
							<Text className="text-muted text-sm mt-[2] ml-[-2]">
								{item.location}
							</Text>
						</View>
						<View className="w-[5] h-[5] rounded-full bg-muted" />
						<View className="flex-row gap-[10] items-center">
							<FontAwesome6 name="clock" size={12} color={Colors.light.muted} />
							<Text className="text-muted text-sm mt-[2] ml-[-2]">
								{item.duration}
							</Text>
						</View>
					</View>
				</View>
			</Pressable>
		);
	}

	return (
		<View className="flex-1">
			<FlatList
				style={{ flex: 1 }}
				data={results}
				renderItem={renderItem}
				keyExtractor={(item) => item.id.toString()}
			/>
		</View>
	);
}
