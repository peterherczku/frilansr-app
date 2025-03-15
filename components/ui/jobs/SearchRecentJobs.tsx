import { Colors } from "@/constants/Colors";
import { FontAwesome, MaterialCommunityIcons } from "@expo/vector-icons";
import { ReactNode } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { SearchUrgentWorks } from "./SearchUrgentWorks";
import { Footer } from "@/components/Footer";

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
				style={[
					styles.card,
					index === categoriesData.length - 1 && { marginRight: 0 },
				]}
			>
				<View style={styles.iconContainer}>{item.icon}</View>
				<View style={styles.textContainer}>
					<Text
						style={[
							styles.text,
							{
								fontSize: 16,
							},
						]}
					>
						{item.title}
					</Text>
					<Text
						style={[
							styles.text,
							{
								color: Colors.light.muted,
								marginTop: -8,
							},
						]}
					>
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
		<View style={styles.container}>
			<Text
				style={[
					styles.text,
					{ fontFamily: "Zain-Bold", fontSize: 22, marginVertical: 8 },
				]}
			>
				Categories
			</Text>
			<CategorySlider />
			<Text
				style={[
					styles.text,
					{ fontFamily: "Zain-Bold", fontSize: 22, marginBottom: 8 },
				]}
			>
				Urgent works
			</Text>
			<SearchUrgentWorks />
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		marginHorizontal: 20,
		flex: 1,
	},
	text: {
		fontFamily: "Zain",
		fontSize: 14,
		color: Colors.light.text,
	},
	card: {
		backgroundColor: "white",
		elevation: 2,
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowRadius: 2,
		shadowOpacity: 0.15,
		borderRadius: 8,
		width: 120,
		marginBottom: 15,
		marginRight: 10,
	},
	iconContainer: {
		backgroundColor: "#D9D9D9",
		borderTopLeftRadius: 8,
		borderTopRightRadius: 8,
		width: 120,
		height: 120,
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
	},
	textContainer: {
		padding: 10,
	},
});
