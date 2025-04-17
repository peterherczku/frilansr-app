import { fetchRecentConversations } from "@/api/messageFunctions";
import { useInfiniteQuery } from "@tanstack/react-query";

export function useRecentConversations() {
	const { data, error, isLoading } = useInfiniteQuery({
		queryKey: ["projects"],
		queryFn: async ({ pageParam }) =>
			await fetchRecentConversations(pageParam, 10),
		initialPageParam: 1,
		getNextPageParam: (lastPage, pages) => pages.length,
	});

	const recentConversations = data?.pages.flatMap((page) => page) || [];
	return { recentConversations, isLoading, error };
}
