import { TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "@/constants/Colors";
import { ReactNode } from "react";
import { Text } from "../Text";

export function ProfilePaymentBoxItem({
	title,
	subtitle,
	onPress,
}: {
	title: string;
	subtitle?: string;
	onPress?: () => void;
}) {
	return (
		<TouchableOpacity
			onPress={onPress}
			className="flex-row justify-between items-center py-[12]"
		>
			<View>
				<Text className="text-lg">{title}</Text>
				{subtitle && <Text className="text-muted mt-[-5]">{subtitle}</Text>}
			</View>
			<Ionicons name="chevron-forward" size={24} color={Colors.light.text} />
		</TouchableOpacity>
	);
}

export function ProfilePaymentBox({ children }: { children: ReactNode }) {
	return (
		<View className="m-[20] bg-white shadow-md px-[12] rounded-lg">
			{children}
		</View>
	);
}
