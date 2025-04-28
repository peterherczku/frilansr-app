import { ActivityIndicator, FlatList, View } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import { Colors } from "@/constants/Colors";
import { Text } from "../../ui/Text";
import { SettingsSection, SettingsSectionItemCard } from "../SettingsSection";
import { PaymentHistoryItem } from "@/api/stripeFunctions";
import { usePaymentHistory } from "@/hooks/stripe/usePaymentHistory";
import { formatRawMoney } from "@/utils/numberUtil";
import { formatDate } from "@/utils/dateUtil";
import { transactionStatusText } from "@/utils/enumUtils";
import { cn } from "@/utils/cn";

export function PaymentHistoryList() {
	const { paymentHistory, isLoading, error } = usePaymentHistory();

	if (error) {
		return (
			<View className="flex-1 justify-center items-center">
				<Text className="text-lg text-red-500">
					Error loading data {error.message}
				</Text>
			</View>
		);
	}

	if (isLoading || paymentHistory === undefined) {
		return (
			<View className="flex-1 justify-center items-center">
				<ActivityIndicator size="large" color="gray" />
			</View>
		);
	}

	function renderPaymentHistoryItem({
		id,
		status,
		amount,
		createdAt,
	}: PaymentHistoryItem) {
		return (
			<SettingsSectionItemCard key={id.toString()}>
				<View className="flex-row justify-between items-center">
					<View className="flex-row items-center gap-[12]">
						<View className="bg-[#d9d9d9] rounded-lg p-[5]">
							<FontAwesome5
								name="money-bill"
								size={24}
								color={Colors.light.text}
							/>
						</View>
						<View>
							<Text className="font-zain-bold">
								{formatRawMoney(amount)} SEK
							</Text>
							<Text className="text-muted font-zain-bold text-[13px]">
								{formatDate(createdAt)}
							</Text>
						</View>
					</View>

					<View
						className="py-[4] px-[10] rounded-md"
						style={[
							status === "ARRIVED_AT_DESTINATION" && {
								backgroundColor: "rgba(85, 147, 62, 0.3)",
							},
							status !== "ARRIVED_AT_DESTINATION" && {
								backgroundColor: "rgba(0, 0, 0, 0.3)",
							},
						]}
					>
						<Text
							className={cn(
								`text-theme font-zain-extrabold`,
								status !== "ARRIVED_AT_DESTINATION" &&
									"text-text font-zain-bold"
							)}
						>
							{transactionStatusText(status)}
						</Text>
					</View>
				</View>
			</SettingsSectionItemCard>
		);
	}

	return (
		<SettingsSection title="Payout options">
			<FlatList
				contentContainerClassName="flex-1"
				data={paymentHistory.sort(
					(a, b) =>
						new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
				)}
				renderItem={({ item }) => renderPaymentHistoryItem(item)}
			/>
		</SettingsSection>
	);
}
