import { FlatList, TouchableOpacity, View } from "react-native";
import { Colors } from "@/constants/Colors";
import { FontAwesome6 } from "@expo/vector-icons";
import { usePreviousSearches } from "@/hooks/usePreviousSearches";
import { Text } from "../ui/Text";

export function PreviousSearches({
	onSelectPreviousSearch,
}: {
	onSelectPreviousSearch: (text: string) => void;
}) {
	const { previousSearches, clearSearch } = usePreviousSearches();

	function renderItem({ item }: { item: string }) {
		return (
			<TouchableOpacity
				onPress={(e) => {
					onSelectPreviousSearch(item);
				}}
				className="mx-[20] px-[5] py-[10] flex-row gap-[12] items-center border-b-[1] border-solid"
				style={{ borderColor: "rgba(0,0,0,0.15)" }} // Fix for border color
			>
				<FontAwesome6 name="clock" size={14} color={Colors.light.text} />
				<Text className="text-lg font-zain-bold">{item}</Text>
			</TouchableOpacity>
		);
	}

	return (
		<View className="flex-1">
			<View className="flex-row items-center justify-between mx-[20] pb-[10] px-[5]">
				<Text className="text-lg font-zain-bold">Previous searches</Text>
				<TouchableOpacity onPress={() => clearSearch()}>
					<Text className="text-lg font-zain-bold text-theme">Clear</Text>
				</TouchableOpacity>
			</View>
			<View
				className="flex-1 border-t-[1]"
				style={{ borderColor: "rgba(0,0,0,0.15)" }}
			>
				<FlatList
					keyboardShouldPersistTaps={"handled"}
					style={{ flex: 1 }}
					data={previousSearches}
					renderItem={renderItem}
					keyExtractor={(item, index) => index.toString()}
				/>
			</View>
		</View>
	);
}
