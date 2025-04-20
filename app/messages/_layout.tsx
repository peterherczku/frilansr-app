import { Redirect, Stack } from "expo-router";
import { useAuth } from "@clerk/clerk-expo";

export default function MessagesRoutesLayout() {
	const { isSignedIn } = useAuth();

	if (!isSignedIn) {
		return <Redirect href={"/"} />;
	}

	return (
		<Stack>
			<Stack.Screen name={"recent-messages"} options={{ headerShown: false }} />
			<Stack.Screen name={"[id]"} options={{ headerShown: false }} />
		</Stack>
	);
}
