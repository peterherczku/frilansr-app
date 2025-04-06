import { MessagesList } from "@/components/messages/MessagesList";
import { Text } from "@/components/ui/Text";
import { Colors } from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { cssInterop } from "nativewind";
import { TouchableOpacity, View } from "react-native";
import { SafeAreaView as RNSafeAreaView } from "react-native-safe-area-context";

const SafeAreaView = cssInterop(RNSafeAreaView, {
	className: "style",
});

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
		<SafeAreaView className="flex-1 bg-white">
			<View className="mx-[20] flex-row gap-[6] items-center">
				<TouchableOpacity onPress={back}>
					<Ionicons name="chevron-back" size={30} color={Colors.light.text} />
				</TouchableOpacity>
				<Text className="text-2xl font-zain-bold">Messages</Text>
			</View>
			<View className="m-[20] bg-white shadow-custom flex-row rounded-lg">
				<TouchableOpacity className="flex-1 py-[10] items-center">
					<Text className="font-zain-bold text-xl text-theme">Active (1)</Text>
				</TouchableOpacity>
				<TouchableOpacity className="flex-1 py-[10] items-center">
					<Text className="font-zain-bold text-xl text-muted">Recent (10)</Text>
				</TouchableOpacity>
				<TouchableOpacity className="flex-1 py-[10] items-center">
					<Text className="text-xl font-zain-bold text-muted">Archived</Text>
				</TouchableOpacity>
			</View>
			<MessagesList data={messagesData} />
		</SafeAreaView>
	);
}
