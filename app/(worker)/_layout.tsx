import { BottomSheetProvider } from "@/components/ui/BottomSheet";
import { useHandleNewConversations } from "@/hooks/messages/useHandleNewConversations";
import { useHandleChatMessages } from "@/hooks/messages/useHandleChatMessages";
import { Stack } from "expo-router";

export default function WorkerRoutesLayout() {
	useHandleNewConversations();
	useHandleChatMessages();

	return (
		<BottomSheetProvider>
			<Stack>
				<Stack.Screen name="(listing)" options={{ headerShown: false }} />
				<Stack.Screen name="(active-job)" options={{ headerShown: false }} />
				<Stack.Screen name="(tabs)" options={{ headerShown: false }} />
				<Stack.Screen name="(settings)" options={{ headerShown: false }} />
				<Stack.Screen name="+not-found" />
			</Stack>
		</BottomSheetProvider>
	);
}
