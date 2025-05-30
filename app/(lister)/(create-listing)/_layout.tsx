import { Redirect, Stack } from "expo-router";
import { useAuth } from "@clerk/clerk-expo";

export default function ListingRoutesLayout() {
	const { isSignedIn } = useAuth();

	if (!isSignedIn) {
		return <Redirect href={"/"} />;
	}

	return (
		<Stack initialRouteName="title">
			<Stack.Screen name={"title"} options={{ headerShown: false }} />
			<Stack.Screen name={"description"} options={{ headerShown: false }} />
			<Stack.Screen name={"image"} options={{ headerShown: false }} />
			<Stack.Screen name={"salary"} options={{ headerShown: false }} />
			<Stack.Screen name={"location"} options={{ headerShown: false }} />
			<Stack.Screen name={"type"} options={{ headerShown: false }} />
			<Stack.Screen name={"date"} options={{ headerShown: false }} />
			<Stack.Screen name={"publish"} options={{ headerShown: false }} />
		</Stack>
	);
}
