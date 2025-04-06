import { Colors } from "@/constants/Colors";
import { FontAwesome6 } from "@expo/vector-icons";
import { Image as ExpoImage } from "expo-image";
import { router } from "expo-router";
import { cssInterop, remapProps } from "nativewind";
import { FlatList, TouchableOpacity, View } from "react-native";
import { Text } from "../ui/Text";

const urgentWorkData = [
	{
		id: 0,
		title: "Walk with Max",
		category: "Dog walking",
		duration: "40 min",
		salary: "120 kr",
		location: "Östermalm",
		image:
			"https://www.evolution-design.info/var/site/storage/images/evolution-design/all-projects/commercial/google-dublin/13285-1-eng-GB/google-dublin_i1920.jpg",
	},
	{
		id: 1,
		title: "Accounting",
		category: "Offices",
		duration: "1 hour",
		salary: "1200 kr",
		location: "Norrmalm",
		image:
			"https://media.istockphoto.com/id/1386939001/photo/young-man-and-his-dog-walking-on-a-rainy-day.jpg?s=612x612&w=0&k=20&c=hBBYAnrNcu2h16UwaO4k9ePC7u0mUYfoIZgdc_BJ-Ws=",
	},
];

const Image = cssInterop(ExpoImage, {
	className: "style",
});

export function SearchUrgentWorks() {
	function renderItem({
		item,
	}: {
		item: {
			id: number;
			title: string;
			category: string;
			duration: string;
			salary: string;
			location: string;
			image: string;
		};
	}) {
		return (
			<TouchableOpacity
				className="bg-white shadow-custom mb-[20] mx-[2] rounded-lg"
				onPress={() => router.push(`/(listing)/${item.id}`)}
			>
				<View className="relative">
					<Image
						source={{ uri: item.image }}
						className="flex-1 w-full h-[200] rounded-t-lg"
					/>
					<View
						className="absolute top-0 left-0 w-full h-[200] rounded-t-lg z-[10]"
						style={{
							backgroundColor: "rgba(0,0,0,0.4)",
						}}
					/>
					<View
						className="absolute z-[15] bottom-[10] left-[10] py-[5] px-[15] rounded-md"
						style={{
							backgroundColor: "rgba(255, 255, 255, 0.7)",
						}}
					>
						<Text className="zain-bold text-lg">Urgent work</Text>
					</View>
				</View>
				<View className="p-[8]">
					<Text className="zain-bold text-xl">{item.title}</Text>
					<Text className="mt-[-8] text-muted">{item.category}</Text>
					<View className="flex-row items-center gap-[5]">
						<View className="flex-row items-center gap-[5]">
							<FontAwesome6
								name="sack-dollar"
								size={12}
								color={Colors.light.muted}
							/>

							<Text className="text-muted">{item.salary}</Text>
						</View>
						<View className="w-[4] h-[4] rounded-full bg-muted" />
						<View className="flex-row items-center gap-[5]">
							<FontAwesome6 name="clock" size={12} color={Colors.light.muted} />
							<Text className="text-muted">{item.duration}</Text>
						</View>
						<View className="w-[4] h-[4] rounded-full bg-muted" />
						<View className="flex-row items-center gap-[5]">
							<FontAwesome6
								name="map-location-dot"
								size={12}
								color={Colors.light.muted}
							/>
							<Text className="text-muted">{item.location}</Text>
						</View>
					</View>
				</View>
			</TouchableOpacity>
		);
	}

	return (
		<View style={{ flex: 1 }}>
			<FlatList
				showsVerticalScrollIndicator={false}
				data={urgentWorkData}
				renderItem={renderItem}
				keyExtractor={(item) => item.id.toString()}
				scrollEnabled={true}
				ListFooterComponent={<View style={{ marginBottom: 50 }} />}
			/>
		</View>
	);
}
