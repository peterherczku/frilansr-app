import { Text, TouchableOpacity, View } from "react-native";
import { SettingsSection, SettingsSectionItemCard } from "../SettingsSection";
import {
	FontAwesome,
	Fontisto,
	MaterialCommunityIcons,
} from "@expo/vector-icons";
import { Colors } from "@/constants/Colors";
import { router } from "expo-router";

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
				<View
					style={{
						flexDirection: "row",
						justifyContent: "space-between",
						alignItems: "center",
					}}
				>
					<View style={{ flexDirection: "row", alignItems: "center", gap: 12 }}>
						<View
							style={{
								backgroundColor: "#D9D9D9",
								padding: 5,
								borderRadius: 8,
							}}
						>
							<MaterialCommunityIcons
								name="bank"
								size={24}
								color={Colors.light.text}
							/>
						</View>
						<View>
							<View style={{ flexDirection: "row", gap: 10 }}>
								<FontAwesome
									name="cc-mastercard"
									size={21}
									color={Colors.light.text}
								/>
								<Text
									style={[
										styles.text,
										{ fontFamily: "Zain-Bold", fontSize: 16 },
									]}
								>
									MASTER CARD
								</Text>
							</View>
							<Text
								style={[
									styles.text,
									{
										fontFamily: "Zain-Bold",
										color: Colors.light.muted,
										fontSize: 13,
									},
								]}
							>
								{cardNumber}
							</Text>
						</View>
					</View>
					{isDefault && (
						<View
							style={{
								backgroundColor: "#D9D9D9",
								paddingVertical: 4,
								paddingHorizontal: 10,
								borderRadius: 6,
							}}
						>
							<Text
								style={[
									styles.text,
									{
										fontFamily: "Zain-ExtraBold",
									},
								]}
							>
								Default
							</Text>
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
				style={{
					backgroundColor: Colors.light.themeColor,
					marginHorizontal: 20,
					marginTop: 10,
					marginBottom: 20,
					padding: 7,
					flexDirection: "row",
					justifyContent: "center",
					borderRadius: 8,
				}}
				onPress={() => router.push("/(settings)/(payment)/attach-new-card")}
			>
				<Text
					style={[styles.text, { color: "white", fontFamily: "Zain-Bold" }]}
				>
					Attach new card
				</Text>
			</TouchableOpacity>
		</SettingsSection>
	);
}
const styles = {
	text: {
		color: Colors.light.text,
		fontSize: 16,
		fontFamily: "Zain",
	},
};
