import { MessagesList } from "@/components/ui/messages/MessagesList";
import { MessagesView } from "@/components/ui/messages/MessagesView";
import { Colors } from "@/constants/Colors";
import { useKeyboardHeight } from "@/hooks/useKeyboardHeight";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { router } from "expo-router";
import {
	StyleSheet,
	Text,
	TextInput,
	TouchableOpacity,
	View,
	Animated,
} from "react-native";
import { Edge, SafeAreaView } from "react-native-safe-area-context";

const messageData = [
	{
		id: 0,
		name: "Péter Herczku",
		profilePicture:
			"https://img.clerk.com/eyJ0eXBlIjoicHJveHkiLCJzcmMiOiJodHRwczovL2ltYWdlcy5jbGVyay5kZXYvdXBsb2FkZWQvaW1nXzJ1QnVBc2FqMHh3QjRXRWJjOW5VRWNtR2Y0NyJ9",
		lastMessage: {
			text: "Hello! Thank you for taking good care of Max :)",
			date: 1742163849000,
		},
		messages: [
			{
				text: "Hello! Thank you for taking good care of Max :)",
				user: {
					id: "userID",
					name: "Test name",
					imageUrl: "yippie",
				},
				date: 1742163849000,
			},
			{
				text: "No worries! :)",
				user: {
					id: "user_2uBrjWWLjAV055Q20Fqet6l9Hty",
					name: "me",
					imageUrl:
						"https://img.clerk.com/eyJ0eXBlIjoicHJveHkiLCJzcmMiOiJodHRwczovL2ltYWdlcy5jbGVyay5kZXYvdXBsb2FkZWQvaW1nXzJ1QnVBc2FqMHh3QjRXRWJjOW5VRWNtR2Y0NyJ9",
				},
				date: 1742163849000,
			},
		],
	},
];
export default function MessagesPage() {
	const { keyboardHeight, isKeyboardOpen } = useKeyboardHeight();
	const safeEdges = isKeyboardOpen
		? ["top", "left", "right"]
		: ["top", "left", "right", "bottom"];
	const footerPadding = Animated.add(keyboardHeight, 10);

	function back() {
		router.back();
	}

	return (
		<SafeAreaView
			style={{
				flex: 1,
				backgroundColor: "white",
			}}
			edges={safeEdges as Edge[]}
		>
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
				<View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
					<Image
						source={{ uri: messageData[0].profilePicture }}
						style={{
							width: 50,
							height: 50,
							borderRadius: 50,
							backgroundColor: "#D9D9D9",
						}}
					/>
					<Text
						style={[styles.text, { fontSize: 22, fontFamily: "Zain-Bold" }]}
					>
						{messageData[0].name}
					</Text>
				</View>
			</View>
			<MessagesView messages={messageData[0].messages} />
			<Animated.View style={[styles.footer, { paddingBottom: footerPadding }]}>
				<View style={{ flexDirection: "row", gap: 15 }}>
					<AntDesign
						name="pluscircle"
						size={24}
						color={Colors.light.themeColor}
					/>
					<AntDesign name="camera" size={24} color={Colors.light.themeColor} />
				</View>
				<View style={styles.inputContainer}>
					<TextInput
						placeholder="Aa"
						style={[styles.text, { color: Colors.light.muted }]}
					/>
				</View>
			</Animated.View>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	text: {
		fontFamily: "Zain",
		fontSize: 18,
		color: Colors.light.text,
	},
	footer: {
		backgroundColor: "white",
		flexDirection: "row",
		paddingVertical: 12,
		paddingHorizontal: 20,
		shadowOffset: {
			width: 0,
			height: -2,
		},
		shadowOpacity: 0.6,
		shadowColor: "#D9D9D9",
		shadowRadius: 2,
		gap: 15,
		alignItems: "center",
	},
	inputContainer: {
		flex: 1,
		backgroundColor: "#EFEFEF",
		borderRadius: 8,
		justifyContent: "center",
		paddingHorizontal: 15,
		paddingVertical: 8,
	},
});
