import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function WorkerRoutesLayout() {
	return (
		<Stack>
			<Stack.Screen name="(listing)" options={{ headerShown: false }} />
			<Stack.Screen name="(tabs)" options={{ headerShown: false }} />
			<Stack.Screen name="(settings)" options={{ headerShown: false }} />
			<Stack.Screen name="+not-found" />
		</Stack>
	);
}
