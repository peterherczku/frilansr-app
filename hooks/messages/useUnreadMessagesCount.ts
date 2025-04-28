import { fetchUnseenMessagesCount } from "@/api/messageFunctions";
import { useQuery } from "@tanstack/react-query";

export function useUnreadMessagesCount() {
	const { data, isLoading, error } = useQuery({
		queryKey: ["unseen-messages-count"],
		queryFn: fetchUnseenMessagesCount,
		staleTime: 5 * 1000,
	});

	return { unreadMessages: data, isLoading, error };
}
