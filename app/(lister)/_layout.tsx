import { Redirect, Stack } from "expo-router";
import { useAuth } from "@clerk/clerk-expo";

export default function ListerRoutesLayout() {
	const { isSignedIn } = useAuth();

	if (!isSignedIn) {
		return <Redirect href={"/"} />;
	}

	return (
		<Stack>
			<Stack.Screen
				name="(tabs)"
				options={{ gestureEnabled: false, headerShown: false }}
			/>
			<Stack.Screen name="(create-listing)" options={{ headerShown: false }} />
		</Stack>
	);
}
