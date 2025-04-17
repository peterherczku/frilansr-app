import { MessagesList } from "@/components/messages/MessagesList";
import { Text } from "@/components/ui/Text";
import { Colors } from "@/constants/Colors";
import { useRecentConversations } from "@/hooks/messages/useRecentConversations";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { cssInterop } from "nativewind";
import { ActivityIndicator, TouchableOpacity, View } from "react-native";
import { SafeAreaView as RNSafeAreaView } from "react-native-safe-area-context";

const SafeAreaView = cssInterop(RNSafeAreaView, {
	className: "style",
});

export default function MessagesPage() {
	const { recentConversations, isLoading, error } = useRecentConversations();

	function back() {
		router.back();
	}

	if (isLoading) {
		return (
			<SafeAreaView className="flex-1 bg-white justify-center items-center">
				<ActivityIndicator size="large" color="gray" />
			</SafeAreaView>
		);
	}

	if (error) {
		return (
			<SafeAreaView className="flex-1 bg-white justify-center items-center">
				<Text className="text-xl font-zain-bold">{JSON.stringify(error)}</Text>
			</SafeAreaView>
		);
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
					<Text className="font-zain-bold text-xl text-theme">
						Active ({recentConversations?.length})
					</Text>
				</TouchableOpacity>
				<TouchableOpacity className="flex-1 py-[10] items-center">
					<Text className="font-zain-bold text-xl text-muted">Recent (0)</Text>
				</TouchableOpacity>
				<TouchableOpacity className="flex-1 py-[10] items-center">
					<Text className="text-xl font-zain-bold text-muted">Archived</Text>
				</TouchableOpacity>
			</View>
			<MessagesList data={recentConversations} />
		</SafeAreaView>
	);
}
