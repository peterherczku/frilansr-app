import { JobType, jobTypes } from "@/api/listingFunctions";
import { Text } from "@/components/ui/Text";
import { jobTypeText } from "@/utils/enumUtils";
import { useState } from "react";
import { FlatList, Pressable, TouchableOpacity, View } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Colors } from "@/constants/Colors";
import { cn } from "@/utils/cn";

export function JobTypeSelectInput({
	selected,
	setSelected,
}: {
	selected: JobType;
	setSelected: (type: JobType) => void;
}) {
	const [open, setOpen] = useState(false);

	function onToggleStatus() {
		setOpen((prev) => !prev);
	}

	function selectOption(type: JobType) {
		setSelected(type);
		setOpen(false);
	}

	function renderOption({ item }: { item: JobType }) {
		return (
			<TouchableOpacity
				className={cn(
					"py-2.5 px-4 flex-row justify-between items-center h-[50]",
					item === selected && "bg-[#e9e9e9] rounded-lg"
				)}
				onPress={() => selectOption(item)}
			>
				<Text className="text-lg">{jobTypeText(item)}</Text>
				{selected === item && (
					<View className="bg-white rounded-full h-[18] w-[18] border-theme border-2 justify-center items-center">
						<View className="bg-theme h-[10] w-[10] rounded-full" />
					</View>
				)}
			</TouchableOpacity>
		);
	}

	return (
		<View className="w-full">
			<Pressable
				className="flex-row items-center justify-between p-4 bg-[#d9d9d9] rounded-[20]"
				onPress={onToggleStatus}
			>
				<Text className="text-lg">{jobTypeText(selected)}</Text>
				{!open && (
					<Ionicons name="chevron-down" size={26} color={Colors.light.muted} />
				)}
				{open && (
					<Ionicons name="chevron-up" size={26} color={Colors.light.muted} />
				)}
			</Pressable>
			{open && (
				<View className="my-4 p-3 border border-[#d9d9d9] rounded-[20] max-h-[173]">
					<FlatList data={jobTypes} renderItem={renderOption} />
				</View>
			)}
		</View>
	);
}
