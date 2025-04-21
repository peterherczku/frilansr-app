import { Text } from "@/components/ui/Text";
import { useConnectOnboardingLink } from "@/hooks/stripe/useConnectOnboardingLink";
import { useQueryClient } from "@tanstack/react-query";
import { WebView, WebViewNavigation } from "react-native-webview";
import { useRef } from "react";
import { ActivityIndicator, View } from "react-native";
import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

const REFRESH_URL = "https://yourapp.com/stripe-refresh";
const RETURN_URL = "https://yourapp.com/stripe-return";

export default function AddPayoutOptionPage() {
	const { onboardingLink, isLoading, error } = useConnectOnboardingLink();
	const queryClient = useQueryClient();
	const webviewRef = useRef<WebView>(null);

	if (isLoading) {
		return <ActivityIndicator />;
	}
	if (error || !onboardingLink) {
		return (
			<View>
				<Text>Error loading onboarding: {error?.message}</Text>
			</View>
		);
	}

	function onNavStateChange(nav: WebViewNavigation) {
		const url = nav.url;

		if (url.startsWith(REFRESH_URL)) {
			queryClient.invalidateQueries({ queryKey: ["stripeAccountLink"] });
			return;
		}

		if (url.startsWith(RETURN_URL)) {
			queryClient.invalidateQueries({ queryKey: ["connectedBankAccounts"] });
			router.back();
		}
	}

	return (
		<SafeAreaView className="flex-1">
			<WebView
				ref={webviewRef}
				source={{ uri: onboardingLink }}
				onNavigationStateChange={onNavStateChange}
				startInLoadingState
			/>
		</SafeAreaView>
	);
}
