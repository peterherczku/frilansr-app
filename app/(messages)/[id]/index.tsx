import { MessagesForm } from "@/components/messages/MessagesForm";
import { MessagesView } from "@/components/messages/MessagesView";
import { Text } from "@/components/ui/Text";
import { Colors } from "@/constants/Colors";
import { useChatMessages } from "@/hooks/messages/useChatMessages";
import { useConversation } from "@/hooks/messages/useConversation";
import { useSendMessage } from "@/hooks/messages/useSendMessage";
import { useKeyboardHeight } from "@/hooks/useKeyboardHeight";
import { Ionicons } from "@expo/vector-icons";
import { Image as ExpoImage } from "expo-image";
import { router } from "expo-router";
import { useLocalSearchParams, useSearchParams } from "expo-router/build/hooks";
import { cssInterop } from "nativewind";
import { TouchableOpacity, View, ActivityIndicator } from "react-native";
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

export default function MessagesPage() {
	const { id } = useLocalSearchParams();

	const { conversation, isLoading: loadingConversation } = useConversation(
		id as string
	);
	const { messages } = useChatMessages(id as string);
	const { sendMessage } = useSendMessage(id as string);
	const { keyboardHeight, isKeyboardOpen } = useKeyboardHeight();
	const safeEdges = isKeyboardOpen
		? ["top", "left", "right"]
		: ["top", "left", "right", "bottom"];

	function back() {
		router.back();
	}

	if (loadingConversation || !conversation) {
		return (
			<SafeAreaView className="flex-1 bg-white justify-center items-center">
				<ActivityIndicator size="large" color="gray" />
			</SafeAreaView>
		);
	}

	return (
		<SafeAreaView className="flex-1 bg-white" edges={safeEdges as Edge[]}>
			<View className="mx-[20] flex-row gap-[6] items-center">
				<TouchableOpacity onPress={back}>
					<Ionicons name="chevron-back" size={30} color={Colors.light.text} />
				</TouchableOpacity>
				<View className="flex-row items-center gap-[10]">
					<Image
						source={{ uri: conversation.partner.imageUrl }}
						className="w-[50] h-[50] rounded-full bg-[#d9d9d9]"
					/>
					<Text className="text-2xl font-zain-bold">
						{conversation.partner.name}
					</Text>
				</View>
			</View>
			<MessagesView conversation={conversation} messages={messages} />
			<MessagesForm sendMessage={sendMessage} />
		</SafeAreaView>
	);
}
