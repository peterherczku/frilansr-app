import { Message, sendSeen } from "@/api/messageFunctions";
import { useMutation } from "@tanstack/react-query";
import { useEffect } from "react";

export function useSendSeen(conversationId: string, messages: Message[]) {
	const { mutateAsync } = useMutation({
		mutationFn: () => sendSeen(conversationId),
	});

	useEffect(() => {
		if (!conversationId) return;
		mutateAsync();
	}, [conversationId, sendSeen, messages]);
}
