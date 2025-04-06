import { Redirect, Stack } from "expo-router";
import { useAuth } from "@clerk/clerk-expo";

export default function PaymentSettingsLayout() {
	const { isSignedIn } = useAuth();

	if (!isSignedIn) {
		return <Redirect href={"/"} />;
	}

	return (
		<Stack>
			<Stack.Screen name={"payment"} options={{ headerShown: false }} />
			<Stack.Screen name={"history"} options={{ headerShown: false }} />
			<Stack.Screen
				name={"add-payout-option"}
				options={{ headerShown: false }}
			/>
			<Stack.Screen name={"attach-new-card"} options={{ headerShown: false }} />
		</Stack>
	);
}
