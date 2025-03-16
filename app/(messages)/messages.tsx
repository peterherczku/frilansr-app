import { MessagesList } from "@/components/ui/messages/MessagesList";
import { Colors } from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const messagesData = [
	{
		id: 0,
		name: "Péter Herczku",
		profilePicture:
			"https://img.clerk.com/eyJ0eXBlIjoicHJveHkiLCJzcmMiOiJodHRwczovL2ltYWdlcy5jbGVyay5kZXYvdXBsb2FkZWQvaW1nXzJ1QnVBc2FqMHh3QjRXRWJjOW5VRWNtR2Y0NyJ9",
		lastMessage: {
			text: "Hello! Thank you for taking good care of Max :)",
			date: 1742163849000,
		},
	},
];

export default function MessagesPage() {
	function back() {
		router.back();
	}

	return (
		<SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
			<View
				style={{
					marginHorizontal: 20,
					flexDirection: "row",
					gap: 6,
					alignItems: "center",
				}}
			>
				<TouchableOpacity onPress={back}>
					<Ionicons name="chevron-back" size={30} color={Colors.light.text} />
				</TouchableOpacity>
				<Text style={[styles.text, { fontSize: 22, fontFamily: "Zain-Bold" }]}>
					Messages
				</Text>
			</View>
			<View style={styles.mainBox}>
				<TouchableOpacity style={styles.box}>
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
						Active (1)
					</Text>
				</TouchableOpacity>
				<TouchableOpacity style={styles.box}>
					<Text
						style={[
							styles.text,
							{
								fontSize: 20,
								fontFamily: "Zain-Bold",
								color: Colors.light.muted,
							},
						]}
					>
						Recent (10)
					</Text>
				</TouchableOpacity>
				<TouchableOpacity style={styles.box}>
					<Text
						style={[
							styles.text,
							{
								fontSize: 20,
								fontFamily: "Zain-Bold",
								color: Colors.light.muted,
							},
						]}
					>
						Archived
					</Text>
				</TouchableOpacity>
			</View>
			<MessagesList data={messagesData} />
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	text: {
		fontFamily: "Zain",
		fontSize: 18,
		color: Colors.light.text,
	},
	mainBox: {
		margin: 20,
		backgroundColor: "white",
		shadowOffset: {
			width: 0,
			height: 0,
		},
		shadowRadius: 3,
		shadowOpacity: 0.25,
		elevation: 3,
		flexDirection: "row",
		borderRadius: 8,
	},
	box: {
		flex: 1,
		paddingVertical: 10,
		alignItems: "center",
	},
});
