import { Text, TouchableOpacity, View } from "react-native";
import { SettingsSection, SettingsSectionItemCard } from "../SettingsSection";
import { Fontisto, MaterialCommunityIcons } from "@expo/vector-icons";
import { Colors } from "@/constants/Colors";
import { router } from "expo-router";

const payoutOptions = [
	{
		id: 0,
		accountNumber: "OTP BANK PLC. (HU) ●●●●  4999",
		active: true,
	},
	{
		id: 1,
		accountNumber: "SWEDBANK LTD. (SE) ●●●●  1111",
		active: false,
	},
];

export function PayoutOptions() {
	function renderPayoutOption({
		id,
		accountNumber,
		active,
	}: {
		id: number;
		accountNumber: string;
		active: boolean;
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
							<Text
								style={[styles.text, { fontFamily: "Zain-Bold", fontSize: 16 }]}
							>
								BANK ACCOUNT
							</Text>
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
								{accountNumber}
							</Text>
						</View>
					</View>
					{active && (
						<View
							style={{
								backgroundColor: "rgba(85, 147, 62, 0.3)",
								paddingVertical: 4,
								paddingHorizontal: 10,
								borderRadius: 6,
							}}
						>
							<Text
								style={[
									styles.text,
									{
										color: Colors.light.themeColor,
										fontFamily: "Zain-ExtraBold",
									},
								]}
							>
								Active
							</Text>
						</View>
					)}
				</View>
			</SettingsSectionItemCard>
		);
	}

	return (
		<SettingsSection title="Payout options">
			{payoutOptions.map((option) => renderPayoutOption(option))}
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
				onPress={() => router.push("/(settings)/(payment)/add-payout-option")}
			>
				<Text
					style={[styles.text, { color: "white", fontFamily: "Zain-Bold" }]}
				>
					Add payout option
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
