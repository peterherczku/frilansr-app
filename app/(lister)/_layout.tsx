import { Redirect, Stack } from "expo-router";
import { useAuth } from "@clerk/clerk-expo";
import { BottomSheetProvider } from "@/components/ui/BottomSheet";
import { useGlobalChatUpdates } from "@/hooks/messages/useGlobalChatUpdates";

export default function ListerRoutesLayout() {
	const { isSignedIn } = useAuth();
	useGlobalChatUpdates();

	if (!isSignedIn) {
		return <Redirect href={"/"} />;
	}

	return (
		<BottomSheetProvider>
			<Stack>
				<Stack.Screen
					name="(tabs)"
					options={{ gestureEnabled: false, headerShown: false }}
				/>
				<Stack.Screen
					name="(create-listing)"
					options={{ headerShown: false }}
				/>
				<Stack.Screen
					name="(listing-applications)"
					options={{ headerShown: false, presentation: "modal" }}
				/>
			</Stack>
		</BottomSheetProvider>
	);
}
