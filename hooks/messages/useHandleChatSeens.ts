import { Conversation } from "@/api/messageFunctions";
import { useAuth } from "@clerk/clerk-expo";
import { QueryClient, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { useAblyClient } from "./context/AblyClientContext";

function updateLastSeen(
	queryClient: QueryClient,
	conversationId: string,
	lastSeen: string
) {
	const existing = queryClient.getQueryData(["conversation", conversationId]);
	if (!existing) {
		queryClient.refetchQueries({
			queryKey: ["conversation", conversationId],
		});
		return;
	}
	queryClient.setQueryData(
		["conversation", conversationId],
		(oldData: Conversation) =>
			({
				...oldData,
				partner: {
					...oldData.partner,
					lastSeen: lastSeen,
				},
			} as Conversation)
	);
}

export function useHandleChatSeens() {
	const queryClient = useQueryClient();
	const { userId } = useAuth();
	const { ablyClient } = useAblyClient();

	useEffect(() => {
		if (!ablyClient || !userId) return;
		(async () => {
			const channel = ablyClient.channels.get(`user:${userId}`);
			channel.subscribe("seen", (msg) => {
				const data = msg.data;
				const seenAt = data.seenAt as string;
				const partnerUserId = data.userId as string;
				const conversationId = data.conversationId as string;
				if (partnerUserId === userId) return;

				updateLastSeen(queryClient, conversationId, seenAt);
			});
		})();

		return () => {
			if (!ablyClient) return;
			const channel = ablyClient.channels.get(`user:${userId}`);
			channel.unsubscribe("seen");
		};
	}, [ablyClient, userId]);
}
