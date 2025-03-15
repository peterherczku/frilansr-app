import { Footer } from "@/components/Footer";
import { Colors } from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useState } from "react";
import {
	FlatList,
	Pressable,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
	TextInput,
	Platform,
	Keyboard,
} from "react-native";

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
			<View style={styles.row}>
				<View
					style={[
						styles.iconContainer,
						{
							backgroundColor: "#dbf2d3",
							shadowColor: Colors.light.themeColor,
						},
					]}
				>
					<Ionicons
						name="checkmark"
						size={24}
						color={Colors.light.themeColor}
					/>
				</View>
				<Text
					style={[
						styles.text,
						{
							fontSize: 20,
							fontFamily: "Zain-Bold",
							color: Colors.light.themeColor,
						},
					]}
				>
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
			<View style={{ position: "relative" }}>
				<View style={styles.row}>
					<View style={styles.iconContainer}>
						<Ionicons
							name="calendar-outline"
							size={24}
							color={Colors.light.text}
						/>
					</View>
					<Text
						style={[styles.text, { fontSize: 18, fontFamily: "Zain-Bold" }]}
					>
						{item.date}
					</Text>
				</View>
				<Pressable onPress={onPressJob} style={styles.card}>
					<View style={[styles.row, { justifyContent: "space-between" }]}>
						<View>
							<Text
								style={[styles.text, { fontSize: 18, fontFamily: "Zain-Bold" }]}
							>
								{item.title}
							</Text>
							<Text
								style={[
									styles.text,
									{ fontSize: 16, color: Colors.light.muted, marginTop: -6 },
								]}
							>
								{item.category}
							</Text>
							<View style={[styles.row]}>
								<View style={styles.row}>
									<Text
										style={[
											styles.text,
											{ color: Colors.light.muted, fontSize: 16 },
										]}
									>
										{item.salary}
									</Text>
								</View>
								<View style={styles.separator} />
								<View style={styles.row}>
									<Text
										style={[
											styles.text,
											{ color: Colors.light.muted, fontSize: 16 },
										]}
									>
										{item.location}
									</Text>
								</View>
							</View>
						</View>
						<Text
							style={[
								styles.text,
								{
									color: Colors.light.themeColor,
									fontFamily: "Zain-Bold",
									marginRight: 10,
								},
							]}
						>
							in 2 days 1 hour
						</Text>
					</View>
				</Pressable>
				<View style={styles.line} />
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
		<View style={styles.container}>
			<View style={styles.inputBox}>
				<TouchableOpacity onPress={back} style={{ padding: 5 }}>
					<Ionicons name="chevron-back" size={20} color={Colors.light.muted} />
				</TouchableOpacity>
				<TextInput
					placeholder={"Search between upcoming jobs"}
					style={styles.input}
					value={searchInput}
					onChangeText={(text) => setSearchInput(text)}
				/>
				{searchInput.trim() != "" && (
					<TouchableOpacity onPress={clearInput} style={{ paddingRight: 15 }}>
						<Ionicons
							name="close-circle"
							size={20}
							color={Colors.light.muted}
						/>
					</TouchableOpacity>
				)}
			</View>
			<Text
				style={[
					styles.text,
					{
						marginLeft: 20,
						fontFamily: "Zain-Bold",
						fontSize: 20,
						marginBottom: 5,
					},
				]}
			>
				Calendar
			</Text>
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

const styles = StyleSheet.create({
	text: {
		color: Colors.light.text,
		fontSize: 18,
		fontFamily: "Zain",
	},
	container: {
		flex: 1,
	},
	line: {
		position: "absolute",
		width: 2,
		height: "100%",
		backgroundColor: "#D9D9D9",
		left: 44,
		zIndex: -2,
		marginVertical: 20,
	},
	inputBox: {
		backgroundColor: "#D9D9D9",
		marginHorizontal: 20,
		borderRadius: 8,
		marginBottom: 10,
		flexDirection: "row",
		alignItems: "center",
		...Platform.select({
			ios: {
				paddingVertical: 12,
			},
		}),
	},
	input: {
		color: Colors.light.muted,
		fontFamily: "Zain",
		fontSize: 17,
		marginTop: 3.5,
		flex: 1,
		...Platform.select({
			ios: {
				marginLeft: 5,
			},
		}),
	},
	iconContainer: {
		width: 50,
		height: 50,
		backgroundColor: "white",
		borderRadius: 50,
		elevation: 2,
		shadowOffset: {
			width: 0,
			height: 0,
		},
		shadowRadius: 2,
		shadowOpacity: 0.25,
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "center",
		marginLeft: 20,
		marginRight: 10,
		marginVertical: 10,
	},
	row: {
		flexDirection: "row",
		alignItems: "center",
		gap: 5,
	},
	card: {
		backgroundColor: "white",
		elevation: 2,
		shadowOffset: {
			width: 0,
			height: 0,
		},
		shadowRadius: 2,
		shadowOpacity: 0.25,
		marginHorizontal: 20,
		marginVertical: 10,
		padding: 10,
		borderRadius: 8,
	},
	separator: {
		width: 4,
		height: 4,
		backgroundColor: "gray",
		borderRadius: 8,
	},
});
