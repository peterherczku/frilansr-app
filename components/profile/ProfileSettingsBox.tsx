import { TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "@/constants/Colors";
import { ReactNode } from "react";
import { Text } from "../ui/Text";
import { cn } from "@/utils/cn";

export function ProfileSettingsBoxItem({
	title,
	destructive,
	onPress,
}: {
	title: string;
	subtitle?: string;
	destructive?: boolean;
	onPress?: () => void;
}) {
	return (
		<TouchableOpacity
			onPress={onPress}
			className="flex-row justify-between items-center py-[12]"
		>
			<View>
				<Text className={cn("text-lg", destructive && "text-[#F84242]")}>
					{title}
				</Text>
			</View>
			<Ionicons
				name="chevron-forward"
				size={24}
				color={!destructive ? Colors.light.text : "#F84242"}
			/>
		</TouchableOpacity>
	);
}

export function ProfileSettingsBox({ children }: { children: ReactNode }) {
	return (
		<View className="mx-[20]">
			<Text className="font-zain-bold text-[25px] mb-[10]">Settings</Text>
			<View className="bg-white shadow-custom rounded-lg px-[12]">
				{children}
			</View>
		</View>
	);
}
