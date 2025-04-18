import {
	DarkTheme,
	DefaultTheme,
	ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import "react-native-reanimated";
import "../global.css";

import { useColorScheme } from "@/hooks/useColorScheme";
import { ClerkLoaded, ClerkProvider } from "@clerk/clerk-expo";
import { tokenCache } from "@/cache";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useReactQueryFocusSync } from "@/hooks/useReactQueryFocusSync";

SplashScreen.preventAutoHideAsync();

const queryClient = new QueryClient();
queryClient.setQueryDefaults(["listing-applications"], {
	staleTime: 1000 * 60 * 3,
});

export default function RootLayout() {
	const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY!;

	if (!publishableKey) {
		throw new Error(
			"Missing Publishable Key. Please set EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY in your .env"
		);
	}
	const colorScheme = useColorScheme();
	const [loaded] = useFonts({
		Zain: require("../assets/fonts/Zain-Regular.ttf"),
		"Zain-Light": require("../assets/fonts/Zain-Light.ttf"),
		"Zain-Bold": require("../assets/fonts/Zain-Bold.ttf"),
		"Zain-ExtraBold": require("../assets/fonts/Zain-ExtraBold.ttf"),
	});
	useReactQueryFocusSync();

	useEffect(() => {
		if (loaded) {
			SplashScreen.hideAsync();
		}
	}, [loaded]);

	if (!loaded) {
		return null;
	}

	return (
		<QueryClientProvider client={queryClient}>
			<ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
				<ClerkProvider tokenCache={tokenCache} publishableKey={publishableKey}>
					<ClerkLoaded>
						<Stack>
							<Stack.Screen name="index" options={{ headerShown: false }} />
							<Stack.Screen name="(worker)" options={{ headerShown: false }} />
							<Stack.Screen name="(lister)" options={{ headerShown: false }} />
							<Stack.Screen
								name="(messages)"
								options={{ headerShown: false }}
							/>
							<Stack.Screen
								name={"(auth)"}
								options={{ presentation: "modal", headerShown: false }}
							/>
							<Stack.Screen name="+not-found" />
						</Stack>
						<StatusBar style="auto" />
					</ClerkLoaded>
				</ClerkProvider>
			</ThemeProvider>
		</QueryClientProvider>
	);
}
