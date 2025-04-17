import { BACKEND_API_BASE_URL } from "@/api/apiClient";
import { fetchConversation } from "@/api/messageFunctions";
import { useQuery } from "@tanstack/react-query";

export function useConversation(conversationId: string) {
	const { data, error, isLoading } = useQuery({
		queryKey: ["conversation", conversationId],
		queryFn: async () => await fetchConversation(conversationId),
		enabled: !!conversationId,
	});

	return { conversation: data, isLoading, error };
}
