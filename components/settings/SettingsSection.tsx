import { Colors } from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { ReactNode } from "react";
import { TouchableOpacity, View } from "react-native";
import { Text } from "../ui/Text";

export function SettingsSectionItemCard({ children }: { children: ReactNode }) {
	return (
		<TouchableOpacity className="mx-[20] my-[5] p-[12] rounded-lg shadow-custom bg-white">
			{children}
		</TouchableOpacity>
	);
}

export function SettingsSectionItem({
	name,
	value,
}: {
	name: string;
	value?: string;
}) {
	return (
		<TouchableOpacity className="mx-[20] flex-row py-[5] items-center justify-between">
			<Text className="text-lg">{name}</Text>
			<View className="flex-row gap-[5]">
				{value && <Text className="text-lg text-muted">{value}</Text>}
				<Ionicons
					name="chevron-forward"
					className="mt-[0.5]"
					size={22}
					color={Colors.light.muted}
				/>
			</View>
		</TouchableOpacity>
	);
}

export function SettingsSection({
	title,
	children,
}: {
	title: string;
	children: ReactNode;
}) {
	return (
		<View className="my-[15] flex-col">
			<View className="flex-row mx-[20] py-[5]">
				<Text className="text-xl font-zain-bold">{title}</Text>
			</View>
			{children}
		</View>
	);
}
