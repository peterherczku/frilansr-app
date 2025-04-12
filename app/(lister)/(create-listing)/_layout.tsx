import { Redirect, Stack, useSegments } from "expo-router";
import { useAuth } from "@clerk/clerk-expo";
import { useDraftListing } from "@/hooks/listing/useDraftListing";
import { ActivityIndicator, View } from "react-native";
import { getPage } from "@/utils/createListingUtil";

export default function ListingRoutesLayout() {
	const { isSignedIn } = useAuth();
	const { draft, isLoading, isFetching } = useDraftListing();

	if (!isSignedIn) {
		return <Redirect href={"/"} />;
	}

	if (isLoading || isFetching || !draft?.draft) {
		return (
			<View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
				<ActivityIndicator size="large" />
			</View>
		);
	}

	return (
		<Stack initialRouteName="title">
			<Stack.Screen name={"title"} options={{ headerShown: false }} />
			<Stack.Screen name={"description"} options={{ headerShown: false }} />
		</Stack>
	);
}
