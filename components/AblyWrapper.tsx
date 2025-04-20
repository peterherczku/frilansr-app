import { useHandleChatMessages } from "@/hooks/messages/useHandleChatMessages";
import { useHandleChatSeens } from "@/hooks/messages/useHandleChatSeens";
import { useHandleNewConversations } from "@/hooks/messages/useHandleNewConversations";

export function AblyWrapper({ children }: { children: React.ReactNode }) {
	useHandleNewConversations();
	useHandleChatMessages();
	useHandleChatSeens();
	return children;
}
