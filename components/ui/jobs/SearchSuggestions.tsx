import { FlatList, TouchableOpacity, View } from "react-native";
import { useMemo } from "react";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "@/constants/Colors";
import { Text } from "../Text";

export function SearchSuggestions({
	searchInput,
	onSearch,
}: {
	searchInput: string;
	onSearch: (item: string) => void;
}) {
	function renderItem({ item }: { item: string }) {
		return (
			<TouchableOpacity
				onPress={() => onSearch(item)}
				className="mx-[20] px-[5] py-[10] flex-row gap-[12] items-center border-b-[1] border-solid"
				style={{
					borderColor: "rgba(0,0,0,0.15)",
				}}
			>
				<Ionicons name="search" size={24} color={Colors.light.text} />
				<Text className="font-zain-bold text-lg">{item}</Text>
			</TouchableOpacity>
		);
	}

	const suggestions = useMemo(() => {
		return [searchInput];
	}, [searchInput]);

	return (
		<View className="flex-1">
			<View className="flex-row items-center justify-between mx-[20] pb-[10] px-[5]">
				<Text className="font-zain-bold text-lg">
					Suggestions ({suggestions.length})
				</Text>
			</View>
			<View
				className="flex-1 border-t-[1]"
				style={{
					borderColor: "rgba(0,0,0,0.15)",
				}}
			>
				<FlatList
					keyboardShouldPersistTaps={"handled"}
					data={suggestions}
					renderItem={renderItem}
					keyExtractor={(item, index) => index.toString()}
				/>
			</View>
		</View>
	);
}
