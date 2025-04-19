import { Message, sendSeen } from "@/api/messageFunctions";
import { useMutation } from "@tanstack/react-query";
import { useEffect } from "react";

export function useSendSeen(conversationId: string, messages: Message[]) {
	const { mutateAsync } = useMutation({
		mutationFn: async () => {
			return await sendSeen(conversationId);
		},
	});

	useEffect(() => {
		if (!conversationId) return;

		mutateAsync();
	}, [conversationId, sendSeen]);
}
