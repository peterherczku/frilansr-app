import { Redirect, Stack } from "expo-router";
import { useAuth } from "@clerk/clerk-expo";
import { BottomSheetProvider } from "@/components/ui/BottomSheet";

export default function ListerRoutesLayout() {
	const { isSignedIn } = useAuth();

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
			</Stack>
		</BottomSheetProvider>
	);
}
