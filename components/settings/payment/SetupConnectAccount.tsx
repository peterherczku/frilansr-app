import { Text } from "@/components/ui/Text";
import { TouchableOpacity, View } from "react-native";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import { Colors } from "@/constants/Colors";
import { useCreateConnectAccount } from "@/hooks/stripe/useCreateConnectAccount";

export function SetupConnectAccount() {
	const { createConnectAccount, isPending, error } = useCreateConnectAccount();

	async function handleEnablePayouts() {
		await createConnectAccount();
	}

	return (
		<View className="flex-1 p-4 items-center justify-center my-[40] mx-[20] rounded-lg gap-[10]">
			<FontAwesome5
				name="money-check"
				size={50}
				color={Colors.light.themeColor}
			/>
			<View className="items-center justify-center">
				<Text className="text-xl font-zain-bold">Enable payouts</Text>
				<Text className="text-muted text-sm leading-2 text-center">
					Add your bank account to enable payouts and seamlessly receive money
					for your jobs. Securely attach your payment method to get started.
				</Text>
			</View>
			<TouchableOpacity
				onPress={handleEnablePayouts}
				disabled={isPending}
				className="bg-theme w-full justify-center items-center p-3 rounded-lg disabled:opacity-50"
			>
				<Text className="text-lg font-zain-bold text-white">
					Enable payouts
				</Text>
			</TouchableOpacity>
			{error?.message && <Text className="text-red-500">{error?.message}</Text>}
		</View>
	);
}
