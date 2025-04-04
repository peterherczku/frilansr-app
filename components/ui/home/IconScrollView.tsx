import { FlatList, TouchableOpacity, View } from "react-native";
import {
	FontAwesome5,
	Foundation,
	MaterialCommunityIcons,
} from "@expo/vector-icons";
import { ReactNode } from "react";
import { Text } from "../Text";

const categories = [
	{
		id: 0,
		name: "Restaurants",
		icon: <MaterialCommunityIcons name="hamburger" size={40} color="black" />,
	},
	{
		id: 1,
		name: "Offices",
		icon: (
			<MaterialCommunityIcons name="office-building" size={40} color="black" />
		),
	},
	{
		id: 2,
		name: "Education",
		icon: <FontAwesome5 name="graduation-cap" size={40} color="black" />,
	},
	{
		id: 3,
		name: "Pets",
		icon: <Foundation name="guide-dog" size={40} color="black" />,
	},
	{
		id: 4,
		name: "From home",
		icon: <FontAwesome5 name="laptop-house" size={35} color="black" />,
	},
];

export function IconScrollView({}) {
	function renderItem({
		item,
		index,
	}: {
		item: {
			id: number;
			name: string;
			icon: ReactNode;
		};
		index: number;
	}) {
		return (
			<TouchableOpacity
				className={`flex-col items-center mx-[5] ${index === 0 && "ml-[20"} ${
					index === categories.length - 1 && "mr-[20]"
				}`}
			>
				<View className="w-[80] h-[80] rounded-lg bg-[#D9D9D9] flex-row items-center justify-center">
					{item.icon}
				</View>
				<Text>{item.name}</Text>
			</TouchableOpacity>
		);
	}

	return (
		<View>
			<FlatList
				showsHorizontalScrollIndicator={false}
				keyExtractor={(item) => item.id.toString()}
				horizontal={true}
				data={categories}
				renderItem={renderItem}
			/>
		</View>
	);
}
