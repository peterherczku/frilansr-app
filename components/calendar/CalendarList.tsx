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
import { JobWithUser } from "@/api/jobFunctions";
import { jobStatusText, jobTypeText } from "@/utils/enumUtils";
import { calculateEstimatedPayout } from "@/utils/paymentUtil";
import { formatRawMoney } from "@/utils/numberUtil";
import { useDistance } from "@/hooks/useDistance";
import { formatTimeDifference } from "@/utils/dateUtil";
import { sortUpcomingJobs } from "@/utils/jobUtil";

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

export function CalendarList({ activeJobs }: { activeJobs: JobWithUser[] }) {
	const [searchInput, setSearchInput] = useState("");

	function CalendarListItem({ item }: { item: JobWithUser }) {
		const distance = useDistance(item.listing.location);
		function onPressJob() {
			router.push(`/(worker)/(active-job)/${item.id}`);
		}

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
					<Text className="text-lg font-zain-bold">
						{jobStatusText(item.status)}
					</Text>
				</View>
				<Pressable
					onPress={onPressJob}
					className="bg-white shadow-custom mx-[20] my-[10] p-[10] rounded-lg"
				>
					<View className="flex-row items-center gap-[5] justify-between">
						<View>
							<Text className="text-lg font-zain-bold">
								{item.listing.title}
							</Text>
							<Text className="text-muted mt-[-6]">
								{jobTypeText(item.listing.type)}
							</Text>
							<View className="flex-row items-center gap-[5]">
								<View className="flex-row items-center gap-[5]">
									<Text className="text-muted">
										{formatRawMoney(
											calculateEstimatedPayout(
												item.listing.salary,
												item.listing.duration
											)
										)}
										{" kr"}
									</Text>
								</View>
								<View className="w-[4] h-[4] rounded-full bg-[gray]" />
								<View className="flex-row items-center gap-[5]">
									<Text className="text-muted">{distance} away</Text>
								</View>
							</View>
						</View>
						<Text className="text-theme font-zain-bold mr-[10] text-[18px]">
							{formatTimeDifference(item.listing.date)}
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
				data={sortUpcomingJobs(activeJobs)}
				renderItem={({ item }) => <CalendarListItem item={item} />}
				keyExtractor={(item) => item.id.toString()}
				scrollEnabled={true}
				showsVerticalScrollIndicator={false}
				ListFooterComponent={<CalendarFooter />}
			/>
		</View>
	);
}
