import {
	FlatList,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from "react-native";
import { useMemo, useState } from "react";
import { FontAwesome6, Ionicons } from "@expo/vector-icons";
import { Colors } from "@/constants/Colors";

export function SearchSuggestions({
	searchInput,
	onSearch,
}: {
	searchInput: string;
	onSearch: (item: string) => void;
}) {
	function renderItem({ item }: { item: string }) {
		return (
			<TouchableOpacity onPress={() => onSearch(item)} style={[styles.box]}>
				<Ionicons name="search" size={24} color={Colors.light.text} />
				<Text style={styles.text}>{item}</Text>
			</TouchableOpacity>
		);
	}

	const suggestions = useMemo(() => {
		return [searchInput];
	}, [searchInput]);

	return (
		<View style={styles.mainContainer}>
			<View style={styles.row}>
				<Text style={[styles.text]}>Suggestions ({suggestions.length})</Text>
			</View>
			<View style={styles.container}>
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
