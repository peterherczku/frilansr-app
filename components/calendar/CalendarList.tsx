import { Footer } from "@/components/ui/Footer";
import { Colors } from "@/constants/Colors";
import { cn } from "@/utils/cn";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useState } from "react";
import {
	FlatList,
	Pressable,
	TouchableOpacity,
	View,
	TextInput,
	Platform,
	Keyboard,
} from "react-native";
import { Text } from "../ui/Text";

const data = [
	{
		id: 0,
		title: "Walk with Max",
		category: "Dog walking",
		salary: "120 kr",
		location: "Central Stockholm",
		date: "Monday, 17th March at 13:00",
	},
	{
		id: 1,
		title: "Walk with Max",
		category: "Dog walking",
		salary: "120 kr",
		location: "Central Stockholm",
		date: "Tuesday, 18th March at 13:00",
	},
	{
		id: 2,
		title: "Walk with Max",
		category: "Dog walking",
		salary: "120 kr",
		location: "Central Stockholm",
		date: "Wednesday, 19th March at 13:00",
	},
	{
		id: 3,
		title: "Walk with Max",
		category: "Dog walking",
		salary: "120 kr",
		location: "Central Stockholm",
		date: "Thursday, 20th March at 13:00",
	},
];

function CalendarFooter() {
	return (
		<View style={{ position: "relative" }}>
			<View className="flex-row items-center gap-[5]">
				<View className="w-[50] h-[50] rounded-full shadow-custom flex-row justify-center shadow-theme items-center ml-[20] mr-[10] my-[10] bg-[#dbf2d3]">
					<Ionicons
						name="checkmark"
						size={24}
						color={Colors.light.themeColor}
					/>
				</View>
				<Text className="text-theme font-zain-bold text-[20px]">
					You are done!
				</Text>
			</View>
			<Footer />
		</View>
	);
}

export function CalendarList() {
	const [searchInput, setSearchInput] = useState("");

	function renderItem({
		item,
	}: {
		item: {
			id: number;
			title: string;
			category: string;
			salary: string;
			location: string;
			date: string;
		};
	}) {
		function onPressJob() {}

		return (
			<View className="relative">
				<View className="flex-row items-center gap-[5]">
					<View className="w-[50] h-[50] rounded-full shadow-custom flex-row justify-center  items-center ml-[20] mr-[10] my-[10] bg-white">
						<Ionicons
							name="calendar-outline"
							size={24}
							color={Colors.light.text}
						/>
					</View>
					<Text className="text-lg font-zain-bold">{item.date}</Text>
				</View>
				<Pressable
					onPress={onPressJob}
					className="bg-white shadow-custom mx-[20] my-[10] p-[10] rounded-lg"
				>
					<View className="flex-row items-center gap-[5] justify-between">
						<View>
							<Text className="text-lg font-zain-bold">{item.title}</Text>
							<Text className="text-muted mt-[-6]">{item.category}</Text>
							<View className="flex-row items-center gap-[5]">
								<View className="flex-row items-center gap-[5]">
									<Text className="text-muted">{item.salary}</Text>
								</View>
								<View className="w-[4] h-[4] rounded-full bg-[gray]" />
								<View className="flex-row items-center gap-[5]">
									<Text className="text-muted">{item.location}</Text>
								</View>
							</View>
						</View>
						<Text className="text-theme font-zain-bold mr-[10] text-[18px]">
							in 2 days 1 hour
						</Text>
					</View>
				</Pressable>
				<View className="absolute w-[2] h-full bg-[#D9D9D9] left-[44] z-[-2] my-[20]" />
			</View>
		);
	}

	function back() {
		Keyboard.dismiss();
		router.back();
	}

	function clearInput() {
		setSearchInput("");
	}

	return (
		<View className="flex-1">
			<View
				className={cn(
					"bg-[#D9D9D9] mx-[20] rounded-lg mb-[10] flex-row items-center",
					Platform.OS === "ios" && "py-[12]"
				)}
			>
				<TouchableOpacity onPress={back} className="p-[5]">
					<Ionicons name="chevron-back" size={20} color={Colors.light.muted} />
				</TouchableOpacity>
				<TextInput
					placeholder={"Search between upcoming jobs"}
					className={cn(
						"text-muted font-zain text-[17px] mt-[3.5] flex-1",
						Platform.OS === "ios" && "ml-[5]"
					)}
					value={searchInput}
					onChangeText={(text) => setSearchInput(text)}
				/>
				{searchInput.trim() != "" && (
					<TouchableOpacity onPress={clearInput} className="pr-[15]">
						<Ionicons
							name="close-circle"
							size={20}
							color={Colors.light.muted}
						/>
					</TouchableOpacity>
				)}
			</View>
			<Text className="font-zain-bold text-xl my-[5] ml-[20]">Calendar</Text>
			<FlatList
				data={data}
				renderItem={renderItem}
				keyExtractor={(item) => item.id.toString()}
				scrollEnabled={true}
				showsVerticalScrollIndicator={false}
				ListFooterComponent={<CalendarFooter />}
			/>
		</View>
	);
}
