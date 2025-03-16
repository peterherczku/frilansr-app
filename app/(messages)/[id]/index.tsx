import { MessagesList } from "@/components/ui/messages/MessagesList";
import { Colors } from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const messageData = {
	id: 0,
	name: "Péter Herczku",
	profilePicture:
		"https://img.clerk.com/eyJ0eXBlIjoicHJveHkiLCJzcmMiOiJodHRwczovL2ltYWdlcy5jbGVyay5kZXYvdXBsb2FkZWQvaW1nXzJ1QnVBc2FqMHh3QjRXRWJjOW5VRWNtR2Y0NyJ9",
	lastMessage: {
		text: "Hello! Thank you for taking good care of Max :)",
		date: 1742163849000,
	},
};
export default function MessagesPage() {
	return (
		<SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
			<Text>Message</Text>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	text: {
		fontFamily: "Zain",
		fontSize: 18,
		color: Colors.light.text,
	},
});
