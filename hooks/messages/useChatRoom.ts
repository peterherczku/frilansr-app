import { useAuth } from "@clerk/clerk-expo";
import { useEffect, useState } from "react";
import { Realtime } from "ably";
import {
	InfiniteData,
	useInfiniteQuery,
	useMutation,
	useQueryClient,
} from "@tanstack/react-query";
import { BACKEND_API_BASE_URL } from "@/api/apiClient";
import { fetchMessages, Message, sendMessageReq } from "@/api/messageFunctions";

function useChatMessages(conversationId: string) {
	const { data, isLoading, error } = useInfiniteQuery({
		queryKey: ["chatMessages", conversationId],
		queryFn: async ({ pageParam }) => {
			return fetchMessages(conversationId, 10, new Date(pageParam));
		},
		initialPageParam: new Date().toISOString(),
		getNextPageParam: (lastPage) => {
			return lastPage.hasMore ? lastPage.nextCursor : undefined;
		},
		enabled: !!conversationId,
	});

	const messages = data?.pages.flatMap((page) => page.messages) || [];
	return { messages, isLoading, error };
}

export function useChatRoom(conversationId: string) {
	const queryClient = useQueryClient();
	const { userId, getToken } = useAuth();
	const [ablyRealtime, setAblyRealtime] = useState<Realtime | null>(null);
	const { messages } = useChatMessages(conversationId);

	useEffect(() => {
		let ablyClient: Realtime;
		(async () => {
			const jwt = await getToken({ template: "ably-token" });
			ablyClient = new Realtime({
				authUrl: `${BACKEND_API_BASE_URL}/ably/auth?conversationId=${encodeURIComponent(
					conversationId
				)}`,
				authHeaders: { Authorization: `Bearer ${jwt}` },
			});

			const channel = ablyClient.channels.get(conversationId);
			channel.subscribe("message", (msg) => {
				const data = msg.data;
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
						};
					}
				);
			});

			setAblyRealtime(ablyClient);
		})();

		return () => {
			if (ablyClient) ablyClient.close();
		};
	}, [conversationId, queryClient]);

	const { mutateAsync } = useMutation({
		mutationFn: async (content: string) => {
			await sendMessageReq(conversationId, content);
		},
		onError: (err, newMessage, context) => {
			// Optionally handle errors and revert optimistic update if needed
		},
	});

	async function sendMessage(content: string) {
		await mutateAsync(content);
	}

	return { messages, sendMessage };
}
