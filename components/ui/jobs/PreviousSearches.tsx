import {
	FlatList,
	Pressable,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from "react-native";
import { Image } from "expo-image";
import { Colors } from "@/constants/Colors";
import { FontAwesome6 } from "@expo/vector-icons";
import { useState } from "react";
import { usePreviousSearches } from "@/hooks/usePreviousSearches";

const data = [
	{
		id: 0,
		text: "dog walking",
	},
	{
		id: 1,
		text: "software",
	},
	{
		id: 2,
		text: "accounting",
	},
];

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
				style={[styles.box]}
			>
				<FontAwesome6 name="clock" size={14} color={Colors.light.text} />
				<Text style={styles.text}>{item}</Text>
			</TouchableOpacity>
		);
	}

	return (
		<View style={styles.mainContainer}>
			<View style={styles.row}>
				<Text style={[styles.text]}>Previous searches</Text>
				<TouchableOpacity onPress={() => clearSearch()}>
					<Text style={[styles.text, { color: Colors.light.themeColor }]}>
						Clear
					</Text>
				</TouchableOpacity>
			</View>
			<View style={styles.container}>
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

const styles = StyleSheet.create({
	mainContainer: {
		flex: 1,
	},
	container: {
		flex: 1,
		borderTopWidth: 1,
		borderColor: "rgba(0,0,0,0.15)",
	},
	row: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		marginHorizontal: 20,
		paddingBottom: 10,
		paddingHorizontal: 5,
	},
	box: {
		marginHorizontal: 20,
		paddingHorizontal: 5,
		paddingVertical: 10,
		flexDirection: "row",
		gap: 12,
		alignItems: "center",
		borderBottomWidth: 1,
		borderStyle: "solid",
		borderColor: "rgba(0,0,0,0.15)",
	},
	text: {
		fontFamily: "Zain-Bold",
		fontSize: 18,
		color: Colors.light.text,
	},
});
