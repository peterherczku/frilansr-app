import { ActivityIndicator, TouchableOpacity, View } from "react-native";
import {
	SettingsSection,
	SettingsSectionItemCard,
} from "../../settings/SettingsSection";
import { FontAwesome, MaterialCommunityIcons } from "@expo/vector-icons";
import { Colors } from "@/constants/Colors";
import { router } from "expo-router";
import { Text } from "../../ui/Text";
import { useCustomerPaymentMethods } from "@/hooks/stripe/useCustomerPaymentMethods";
import { CustomerPaymentMethod } from "@/api/stripeFunctions";

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
	const { paymentMethods, isLoading, error } = useCustomerPaymentMethods();

	function renderCardOption({ id, brand, last4 }: CustomerPaymentMethod) {
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
								{brand === "visa" && (
									<FontAwesome
										name="cc-visa"
										size={21}
										color={Colors.light.text}
									/>
								)}
								{brand === "mastercard" && (
									<FontAwesome
										name="cc-mastercard"
										size={21}
										color={Colors.light.text}
									/>
								)}
								<Text className="font-zain-bold">{brand.toUpperCase()}</Text>
							</View>
							<Text className="text-muted font-zain-bold text-[13px]">
								●●●● ●●●● ●●●● {" " + last4}
							</Text>
						</View>
					</View>
					{/*isDefault && (
						<View className="bg-[#d9d9d9] py-[4] px-[10] rounded-md">
							<Text className="font-zain-extrabold">Default</Text>
						</View>
					)*/}
				</View>
			</SettingsSectionItemCard>
		);
	}

	if (error) {
		return (
			<View className="flex-1 justify-center items-center">
				<Text className="text-lg text-red-500">Error loading data</Text>
			</View>
		);
	}

	if (isLoading || paymentMethods === undefined) {
		return (
			<View className="flex-1 justify-center items-center">
				<ActivityIndicator size="large" color="gray" />
			</View>
		);
	}

	return (
		<SettingsSection title="Attached cards">
			{paymentMethods.map((method) => renderCardOption(method))}
			<TouchableOpacity
				className="bg-theme mx-[20] mt-[10] mb-[20] py-[7] flex-row justify-center rounded-lg"
				onPress={() =>
					router.push("/(lister)/(settings)/(payment)/attach-new-card")
				}
			>
				<Text className="text-white font-zain-bold">Attach new card</Text>
			</TouchableOpacity>
		</SettingsSection>
	);
}
