import { Colors } from "@/constants/Colors";
import { useKeyboardHeight } from "@/hooks/useKeyboardHeight";
import { AntDesign } from "@expo/vector-icons";
import { useState } from "react";
import {
	TextInput,
	TouchableOpacity,
	View,
	Animated,
	Keyboard,
} from "react-native";

export function MessagesForm({
	sendMessage,
}: {
	sendMessage: (content: string) => Promise<void>;
}) {
	const [text, setText] = useState("");
	const [isMessageSending, setIsMessageSending] = useState(false);

	const { keyboardHeight, isKeyboardOpen } = useKeyboardHeight();
	const footerPadding = Animated.add(keyboardHeight, 10);

	async function publishMessage() {
		setIsMessageSending(true);
		await sendMessage(text);
		setText("");
		Keyboard.dismiss();
		setIsMessageSending(false);
	}

	return (
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
	);
}
