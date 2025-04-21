import { Alert, Platform } from "react-native";
import { Text } from "@/components/ui/Text";
import {
	CardActionError,
	CardForm,
	useStripe,
} from "@stripe/stripe-react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
	KeyboardAvoidingView,
	ScrollView,
	TouchableOpacity,
	View,
} from "react-native";
import { useState } from "react";
import { Details } from "@stripe/stripe-react-native/lib/typescript/src/types/components/CardFormView";
import { createSetupIntent } from "@/api/stripeFunctions";
import { useQueryClient } from "@tanstack/react-query";
import { router } from "expo-router";

export default function AddCardOptionPage() {
	const queryClient = useQueryClient();
	const keyboardVerticalOffset = Platform.select({ ios: 80, android: 0 });

	const { confirmSetupIntent } = useStripe();
	const [cardDetails, setCardDetails] = useState<Details>();

	async function onSaveCard() {
		if (!cardDetails?.complete) {
			Alert.alert("Please fill in all the card details.");
			return;
		}
		const { clientSecret } = await createSetupIntent();
		if (!clientSecret) {
			Alert.alert("Failed to create setup intent. Please try again.");
			return;
		}
		const { setupIntent, error } = await confirmSetupIntent(clientSecret, {
			paymentMethodType: "Card", // REQUIRED
		});

		if (error) {
			Alert.alert(error.message);
			return;
		}
		if (setupIntent && setupIntent.status === "Succeeded") {
			Alert.alert("✅ Card saved", "We’ll use this card for future payments.");
			queryClient.invalidateQueries({
				queryKey: ["customerPaymentMethods"],
			});
			router.back();
		} else {
			Alert.alert(
				"Setup incomplete",
				`Current status: ${setupIntent?.status ?? "unknown"}`
			);
		}
	}

	return (
		<SafeAreaView className="flex-1 bg-white p-[20]">
			<KeyboardAvoidingView
				style={{ flex: 1 }}
				behavior={Platform.OS === "ios" ? "padding" : "height"}
				keyboardVerticalOffset={keyboardVerticalOffset}
			>
				<View className="flex-1 justify-between">
					<View>
						<Text className="text-2xl font-zain-bold">Attach new Card</Text>
						<Text className="text-muted mt-[-6]">
							Your card information is securely stored by Stripe.
						</Text>
						<CardForm
							style={{
								width: "100%",
								height: 200,
								marginVertical: 20,
							}}
							placeholders={{
								number: "4242 4242 4242 4242",
								expiration: "MM/YY",
								cvc: "CVC",
								postalCode: "12345",
							}}
							onFormComplete={(cardDetails) => setCardDetails(cardDetails)}
							dangerouslyGetFullCardDetails={false}
						/>
					</View>

					<TouchableOpacity
						onPress={onSaveCard}
						className="bg-theme p-4 rounded-lg mb-[10] flex-row items-center justify-center"
					>
						<Text className="text-lg font-zain-bold text-white">Add card</Text>
					</TouchableOpacity>
				</View>
			</KeyboardAvoidingView>
		</SafeAreaView>
	);
}
