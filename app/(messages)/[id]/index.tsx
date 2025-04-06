import { MessagesView } from "@/components/messages/MessagesView";
import { Text } from "@/components/ui/Text";
import { Colors } from "@/constants/Colors";
import { useKeyboardHeight } from "@/hooks/useKeyboardHeight";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import { Image as ExpoImage } from "expo-image";
import { router } from "expo-router";
import { cssInterop } from "nativewind";
import { TextInput, TouchableOpacity, View, Animated } from "react-native";
import {
	Edge,
	SafeAreaView as RNSafeAreaView,
} from "react-native-safe-area-context";

const Image = cssInterop(ExpoImage, {
	className: "style",
});

const SafeAreaView = cssInterop(RNSafeAreaView, {
	className: "style",
});

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
		<SafeAreaView className="flex-1 bg-white" edges={safeEdges as Edge[]}>
			<View className="mx-[20] flex-row gap-[6] items-center">
				<TouchableOpacity onPress={back}>
					<Ionicons name="chevron-back" size={30} color={Colors.light.text} />
				</TouchableOpacity>
				<View className="flex-row items-center gap-[10]">
					<Image
						source={{ uri: messageData[0].profilePicture }}
						className="w-[50] h-[50] rounded-full bg-[#d9d9d9]"
					/>
					<Text className="text-2xl font-zain-bold">{messageData[0].name}</Text>
				</View>
			</View>
			<MessagesView messages={messageData[0].messages} />
			<Animated.View
				style={{
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
					paddingBottom: footerPadding,
				}}
			>
				<View className="flex-row gap-[15]">
					<AntDesign
						name="pluscircle"
						size={24}
						color={Colors.light.themeColor}
					/>
					<AntDesign name="camera" size={24} color={Colors.light.themeColor} />
				</View>
				<View className="flex-1 bg-[#efefef] rounded-lg justify-center px-[15] py-[8]">
					<TextInput
						placeholder="Aa"
						className="font-zain text-lg text-muted"
					/>
				</View>
			</Animated.View>
		</SafeAreaView>
	);
}
