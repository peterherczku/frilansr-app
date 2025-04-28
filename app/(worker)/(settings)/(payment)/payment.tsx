import { PayoutOptions } from "@/components/settings/payment/PayoutOptions";
import { Text } from "@/components/ui/Text";
import { Colors } from "@/constants/Colors";
import { useHasConnectedAccount } from "@/hooks/stripe/useHasConnectedAccount";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { cssInterop } from "nativewind";
import {
	ActivityIndicator,
	ScrollView,
	TouchableOpacity,
	View,
} from "react-native";
import { SafeAreaView as RNSafeAreaView } from "react-native-safe-area-context";
import { SetupConnectAccount } from "@/components/settings/payment/SetupConnectAccount";

const SafeAreaView = cssInterop(RNSafeAreaView, {
	className: "style",
});

export default function PaymentSettingsPage() {
	const { hasAccount, isLoading, error } = useHasConnectedAccount();

	if (error) {
		return (
			<View className="flex-1 justify-center items-center">
				<Text className="text-lg text-red-500">
					Error loading data {error.message}
				</Text>
			</View>
		);
	}

	if (isLoading || hasAccount === undefined) {
		return (
			<View className="flex-1 justify-center items-center">
				<ActivityIndicator size="large" color="gray" />
			</View>
		);
	}

	return (
		<SafeAreaView className="flex-1 bg-white">
			<View className="mx-[20] flex-row gap-[6] items-center">
				<TouchableOpacity onPress={() => router.back()}>
					<Ionicons name="chevron-back" size={30} color={Colors.light.text} />
				</TouchableOpacity>
				<Text className="text-2xl font-zain-bold">Payment settings</Text>
			</View>
			<ScrollView contentContainerClassName="flex-1">
				{hasAccount && <PayoutOptions />}
				{!hasAccount && <SetupConnectAccount />}
			</ScrollView>
		</SafeAreaView>
	);
}
