import { Redirect, Stack } from "expo-router";
import { useAuth } from "@clerk/clerk-expo";
import { View } from "react-native";

export default function MessagesRoutesLayout() {
	const { isSignedIn } = useAuth();

	if (!isSignedIn) {
		return <Redirect href={"/"} />;
	}

	return (
		<Stack>
			<Stack.Screen name={"messages"} options={{ headerShown: false }} />
			<Stack.Screen name={"[id]"} options={{ headerShown: false }} />
		</Stack>
	);
}
