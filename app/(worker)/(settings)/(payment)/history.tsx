import { PaymentHistoryList } from "@/components/settings/payment/PaymentHistoryList";
import { Text } from "@/components/ui/Text";
import { Colors } from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { cssInterop } from "nativewind";
import { TouchableOpacity, View } from "react-native";
import { SafeAreaView as RNSafeAreaView } from "react-native-safe-area-context";

const SafeAreaView = cssInterop(RNSafeAreaView, {
	className: "style",
});

export default function PaymentHistoryPage() {
	return (
		<SafeAreaView className="flex-1 bg-white">
			<View className="mx-[20] flex-row gap-[6] items-center">
				<TouchableOpacity onPress={() => router.back()}>
					<Ionicons name="chevron-back" size={30} color={Colors.light.text} />
				</TouchableOpacity>
				<Text className="text-2xl font-zain-bold">Payment history</Text>
			</View>
			<PaymentHistoryList />
		</SafeAreaView>
	);
}
