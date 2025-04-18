import { Redirect, Stack } from "expo-router";
import { useAuth } from "@clerk/clerk-expo";
import { BottomSheetProvider } from "@/components/ui/BottomSheet";

export default function ListingApplicationRoutes() {
	const { isSignedIn } = useAuth();

	if (!isSignedIn) {
		return <Redirect href={"/"} />;
	}

	return (
		<Stack>
			<Stack.Screen
				name="listing-applications"
				options={{ headerShown: false, presentation: "modal" }}
			/>
		</Stack>
	);
}
