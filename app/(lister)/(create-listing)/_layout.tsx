import { Redirect, Stack } from "expo-router";
import { useAuth } from "@clerk/clerk-expo";

export default function ListingRoutesLayout() {
	const { isSignedIn } = useAuth();

	if (!isSignedIn) {
		return <Redirect href={"/"} />;
	}

	return (
		<Stack>
			<Stack.Screen name={"index"} options={{ headerShown: false }} />
			<Stack.Screen name={"description"} options={{ headerShown: false }} />
		</Stack>
	);
}
