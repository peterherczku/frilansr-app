import { fetchConversation } from "@/api/messageFunctions";
import { useQuery, useQueryClient } from "@tanstack/react-query";

export function useConversation(conversationId: string) {
	const queryClient = useQueryClient();
	const { data, error, isLoading } = useQuery({
		queryKey: ["conversation", conversationId],
		queryFn: async () => {
			const data = await fetchConversation(conversationId);
			queryClient.invalidateQueries({
				queryKey: ["unseen-messages-count"],
			});
			return data;
		},
		enabled: !!conversationId,
	});

	return { conversation: data, isLoading, error };
}
