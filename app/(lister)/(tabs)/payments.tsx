import {
	ActivePayments,
	ActivePaymentsHeader,
	ActivePaymentsSubtitle,
	ActivePaymentsTitle,
} from "@/components/lister/payments/ActivePayments";
import { Header } from "@/components/ui/Header";
import { Text } from "@/components/ui/Text";
import { useHasConnectedAccount } from "@/hooks/stripe/useHasConnectedAccount";
import { useOutgoingPayments } from "@/hooks/stripe/useOutgoingPayments";
import { Redirect } from "expo-router";
import { ActivityIndicator, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function OutgoingPaymentsPage() {
	const {
		hasAccount,
		isLoading: isHasAccountLoading,
		error: hasAccountError,
	} = useHasConnectedAccount();
	const { outgoingPayments, isLoading, error } = useOutgoingPayments();

	if (hasAccountError || error) {
		return (
			<View className="flex-1 justify-center items-center">
				<Text className="text-lg text-red-500">Error loading data</Text>
			</View>
		);
	}

	if (
		isLoading ||
		isHasAccountLoading ||
		hasAccount === undefined ||
		outgoingPayments === undefined
	) {
		return (
			<View className="flex-1 justify-center items-center">
				<ActivityIndicator size="large" color="gray" />
			</View>
		);
	}

	if (!hasAccount) {
		return <Redirect href={"/(lister)/settings/payment"} />;
	}

	return (
		<SafeAreaView className="flex-1 bg-white">
			<Header />
			<ActivePaymentsHeader>
				<ActivePaymentsTitle>Outgoing payments</ActivePaymentsTitle>
				<ActivePaymentsSubtitle>
					{`${outgoingPayments.length} payments`}
				</ActivePaymentsSubtitle>
			</ActivePaymentsHeader>
			<ActivePayments payments={outgoingPayments} />
		</SafeAreaView>
	);
}
