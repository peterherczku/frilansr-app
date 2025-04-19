import { fetchMessages } from "@/api/messageFunctions";
import { useInfiniteQuery } from "@tanstack/react-query";

export function useChatMessages(conversationId: string) {
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
