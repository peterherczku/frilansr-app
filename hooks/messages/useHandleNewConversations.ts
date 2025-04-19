import { useEffect } from "react";
import { useAblyClient } from "./context/AblyClientContext";
import { useAuth } from "@clerk/clerk-expo";
import {
	InfiniteData,
	QueryClient,
	useQueryClient,
} from "@tanstack/react-query";
import {
	Conversation,
	Message,
	RecentConversation,
} from "@/api/messageFunctions";

function addNewConversation(
	queryClient: QueryClient,
	newConversation: Conversation,
	lastMessage: Message
) {
	const existing = queryClient.getQueryData(["conversations"]);
	if (!existing) return;

	queryClient.setQueryData(
		["conversations"],
		(old: InfiniteData<RecentConversation[], unknown>) => {
			const firstPage = old.pages[0] || [];
			const exists = firstPage.some(
				(conversation) => conversation.id === newConversation.id
			);
			if (exists) return old;

			const newRecentConvo = {
				id: newConversation.id,
				updatedAt: new Date().toISOString(),
				partner: newConversation.partner,
				lastMessage: lastMessage,
			} as RecentConversation;

			return {
				...old,
				pages: [[newRecentConvo, ...firstPage], ...old.pages.slice(1)],
			};
		}
	);
}

export function useHandleNewConversations() {
	const queryClient = useQueryClient();
	const { ablyClient } = useAblyClient();
	const { userId } = useAuth();

	useEffect(() => {
		if (!ablyClient || !userId) return;

		const channel = ablyClient.channels.get(`user:${userId}`);
		channel.subscribe("new-conversation", async (message) => {
			const data = message.data;
			addNewConversation(queryClient, data.conversation, data.message);
		});
		return () => {
			channel.unsubscribe("new-conversation");
		};
	}, [ablyClient, userId]);
}
