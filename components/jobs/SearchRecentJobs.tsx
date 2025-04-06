import { Colors } from "@/constants/Colors";
import { FontAwesome, MaterialCommunityIcons } from "@expo/vector-icons";
import { ReactNode } from "react";
import { FlatList, View } from "react-native";
import { SearchUrgentWorks } from "./SearchUrgentWorks";
import { Text } from "../ui/Text";
import { cn } from "@/utils/cn";

const categoriesData = [
	{
		id: 0,
		title: "Restaurants",
		activeJobs: 220,
		icon: (
			<MaterialCommunityIcons
				name="hamburger"
				size={55}
				color={Colors.light.text}
			/>
		),
	},
	{
		id: 1,
		title: "Offices",
		activeJobs: 54,
		icon: (
			<MaterialCommunityIcons
				name="office-building"
				size={55}
				color={Colors.light.text}
			/>
		),
	},
	{
		id: 2,
		title: "Education",
		activeJobs: 143,
		icon: (
			<FontAwesome name="graduation-cap" size={55} color={Colors.light.text} />
		),
	},
];

export function CategorySlider() {
	function renderItem({
		item,
		index,
	}: {
		item: {
			id: number;
			title: string;
			activeJobs: number;
			icon: ReactNode;
		};
		index: number;
	}) {
		return (
			<View
				className={cn(
					"bg-white shadow-custom rounded-lg w-[120] mb-[15] mr-[10]",
					index === categoriesData.length - 1 && "mr-0"
				)}
			>
				<View className="bg-[#D9D9D9] rounded-t-lg w-[120] h-[120] flex-row items-center justify-center">
					{item.icon}
				</View>
				<View className="p-[10]">
					<Text>{item.title}</Text>
					<Text className="text-muted mt-[-8]">
						{item.activeJobs} active jobs
					</Text>
				</View>
			</View>
		);
	}

	return (
		<View>
			<FlatList
				data={categoriesData}
				renderItem={renderItem}
				showsHorizontalScrollIndicator={false}
				keyExtractor={(item) => item.id.toString()}
				horizontal={true}
			/>
		</View>
	);
}

export function SearchRecentJobs() {
	return (
		<View className="mx-[20] flex-1">
			<Text className="text-2xl my-[8] font-zain-bold">Categories</Text>
			<CategorySlider />
			<Text className="text-2xl font-zain-bold mb-[8]">Urgent works</Text>
			<SearchUrgentWorks />
		</View>
	);
}
