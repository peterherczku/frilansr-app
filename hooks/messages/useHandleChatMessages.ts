import { useAuth } from "@clerk/clerk-expo";
import { useEffect } from "react";
import {
	InfiniteData,
	QueryClient,
	useQueryClient,
} from "@tanstack/react-query";
import { Message, RecentConversation } from "@/api/messageFunctions";
import { useAblyClient } from "./context/AblyClientContext";

function updateChatMessages(
	queryClient: QueryClient,
	conversationId: string,
	data: Message
) {
	queryClient.setQueryData(
		["chatMessages", conversationId],
		(old: InfiniteData<{ messages: Message[] }> | undefined) => {
			if (!old) return old; // cache not ready yet

			const firstPage = old.pages[0] ?? { messages: [], hasMore: false };

			return {
				...old,
				pages: [
					{
						...firstPage,
						messages: [
							...firstPage.messages,
							{
								id: data.id,
								senderId: data.senderId,
								content: data.content,
								sentAt: new Date().toISOString(),
							},
						],
					},
					...old.pages.slice(1),
				],
				pageParams: new Date(),
			};
		}
	);
}

function updateLastMessage(
	queryClient: QueryClient,
	conversationId: string,
	data: Message
) {
	queryClient.setQueryData(
		["conversations"],
		(old: InfiniteData<RecentConversation[], unknown>) => {
			if (!old) return old; // cache not ready yet

			return {
				...old,
				pages: old.pages.map((page) =>
					page.map((conversation) => {
						if (conversation.id !== conversationId) return conversation;
						return {
							...conversation,
							lastMessage: {
								id: data.id,
								senderId: data.senderId,
								content: data.content,
								sentAt: new Date().toISOString(),
							},
							updatedAt: new Date().toISOString(),
						};
					})
				),
			};
		}
	);
}

export function useHandleChatMessages() {
	const queryClient = useQueryClient();
	const { userId } = useAuth();
	const { ablyClient } = useAblyClient();

	useEffect(() => {
		if (!ablyClient || !userId) return;
		(async () => {
			const channel = ablyClient.channels.get(`user:${userId}`);
			channel.subscribe("message", (msg) => {
				const data = msg.data;
				const message = data.message as Message;
				const conversationId = data.conversationId as string;
				updateChatMessages(queryClient, conversationId, message);
				updateLastMessage(queryClient, conversationId, message);
			});
		})();

		return () => {
			if (!ablyClient) return;
			const channel = ablyClient.channels.get(`user:${userId}`);
			channel.unsubscribe("message");
		};
	}, [ablyClient, userId]);
}
