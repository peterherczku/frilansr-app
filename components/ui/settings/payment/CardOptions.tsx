import { TouchableOpacity, View } from "react-native";
import { SettingsSection, SettingsSectionItemCard } from "../SettingsSection";
import { FontAwesome, MaterialCommunityIcons } from "@expo/vector-icons";
import { Colors } from "@/constants/Colors";
import { router } from "expo-router";
import { Text } from "../../Text";

const cardOptions = [
	{
		id: 0,
		cardNumber: "●●●● ●●●● ●●●●  4999",
		isDefault: true,
	},
	{
		id: 1,
		cardNumber: "●●●● ●●●● ●●●● 1111",
		isDefault: false,
	},
];

export function CardOptions() {
	function renderCardOption({
		id,
		cardNumber,
		isDefault,
	}: {
		id: number;
		cardNumber: string;
		isDefault: boolean;
	}) {
		return (
			<SettingsSectionItemCard key={id.toString()}>
				<View className="flex-row justify-between items-center">
					<View className="flex-row items-center gap-[12]">
						<View className="bg-[#d9d9d9] rounded-lg p-[5]">
							<MaterialCommunityIcons
								name="bank"
								size={24}
								color={Colors.light.text}
							/>
						</View>
						<View>
							<View className="flex-row gap-[10]">
								<FontAwesome
									name="cc-mastercard"
									size={21}
									color={Colors.light.text}
								/>
								<Text className="font-zain-bold">MASTER CARD</Text>
							</View>
							<Text className="text-muted font-zain-bold text-[13]">
								{cardNumber}
							</Text>
						</View>
					</View>
					{isDefault && (
						<View className="bg-[#d9d9d9] py-[4] px-[10] rounded-md">
							<Text className="font-zain-extrabold">Default</Text>
						</View>
					)}
				</View>
			</SettingsSectionItemCard>
		);
	}

	return (
		<SettingsSection title="Attached cards">
			{cardOptions.map((option) => renderCardOption(option))}
			<TouchableOpacity
				className="bg-theme mx-[20] mt-[10] mb-[20] py-[7] flex-row justify-center rounded-lg"
				onPress={() => router.push("/(settings)/(payment)/attach-new-card")}
			>
				<Text className="text-white font-zain-bold">Attach new card</Text>
			</TouchableOpacity>
		</SettingsSection>
	);
}
