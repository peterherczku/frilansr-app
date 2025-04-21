import { ActivityIndicator, TouchableOpacity, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Colors } from "@/constants/Colors";
import { router } from "expo-router";
import { Text } from "../../ui/Text";
import { SettingsSection, SettingsSectionItemCard } from "../SettingsSection";
import { useConnectedBankAccounts } from "@/hooks/stripe/useConnectedBankAccounts";
import { ConnectedBankAccount } from "@/api/stripeFunctions";

/*const payoutOptions = [
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
];*/

export function PayoutOptions() {
	const { connectedBankAccounts, isLoading, error } =
		useConnectedBankAccounts();

	if (error) {
		return (
			<View className="flex-1 justify-center items-center">
				<Text className="text-lg text-red-500">
					Error loading data {error.message}
				</Text>
			</View>
		);
	}

	if (isLoading || connectedBankAccounts === undefined) {
		return (
			<View className="flex-1 justify-center items-center">
				<ActivityIndicator size="large" color="gray" />
			</View>
		);
	}

	function renderPayoutOption({
		id,
		bank,
		last4,
		default_for_currency,
		currency,
	}: ConnectedBankAccount) {
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
							<Text className="font-zain-bold">BANK ACCOUNT</Text>
							<Text className="text-muted font-zain-bold text-[13px]">
								{bank} ({currency.toUpperCase()}) ●●●● {last4}
							</Text>
						</View>
					</View>
					{default_for_currency && (
						<View
							className="py-[4] px-[10] rounded-md"
							style={{
								backgroundColor: "rgba(85, 147, 62, 0.3)",
							}}
						>
							<Text className="text-theme font-zain-extrabold">Active</Text>
						</View>
					)}
				</View>
			</SettingsSectionItemCard>
		);
	}

	return (
		<SettingsSection title="Payout options">
			{connectedBankAccounts.map((bankAccount) =>
				renderPayoutOption(bankAccount)
			)}
			<TouchableOpacity
				className="mx-[20] mt-[10] mb-[20] p-[7] flex-row justify-center rounded-lg bg-theme"
				onPress={() =>
					router.push("/(worker)/(settings)/(payment)/add-payout-option")
				}
			>
				<Text className="text-white font-zain-bold">
					{connectedBankAccounts.length === 0
						? "Add payout option"
						: "Edit payout options"}
				</Text>
			</TouchableOpacity>
		</SettingsSection>
	);
}
