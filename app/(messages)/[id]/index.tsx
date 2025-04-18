import { MessagesView } from "@/components/messages/MessagesView";
import { Text } from "@/components/ui/Text";
import { Colors } from "@/constants/Colors";
import { useChatRoom } from "@/hooks/messages/useChatRoom";
import { useConversation } from "@/hooks/messages/useConversation";
import { useKeyboardHeight } from "@/hooks/useKeyboardHeight";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import { Image as ExpoImage } from "expo-image";
import { router } from "expo-router";
import { useLocalSearchParams, useSearchParams } from "expo-router/build/hooks";
import { cssInterop } from "nativewind";
import { useState } from "react";
import {
	TextInput,
	TouchableOpacity,
	View,
	Animated,
	ActivityIndicator,
	Keyboard,
} from "react-native";
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
	const { messages, sendMessage } = useChatRoom(id as string);
	const { keyboardHeight, isKeyboardOpen } = useKeyboardHeight();
	const safeEdges = isKeyboardOpen
		? ["top", "left", "right"]
		: ["top", "left", "right", "bottom"];
	const footerPadding = Animated.add(keyboardHeight, 10);

	const [isMessageSending, setIsMessageSending] = useState(false);
	const [text, setText] = useState("");

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

	async function publishMessage() {
		setIsMessageSending(true);
		await sendMessage(text);
		setText("");
		Keyboard.dismiss();
		setIsMessageSending(false);
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
						value={text}
						onChangeText={setText}
						placeholder="Aa"
						className="font-zain text-lg text-muted"
					/>
				</View>
				<TouchableOpacity
					className="disabled:opacity-50"
					disabled={isMessageSending}
					onPress={publishMessage}
				>
					<AntDesign name="arrowup" size={24} color={Colors.light.themeColor} />
				</TouchableOpacity>
			</Animated.View>
		</SafeAreaView>
	);
}
