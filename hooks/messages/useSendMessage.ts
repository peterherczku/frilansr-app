import { sendMessageReq } from "@/api/messageFunctions";
import { useMutation } from "@tanstack/react-query";

export function useSendMessage(conversationId: string) {
	const { mutateAsync } = useMutation({
		mutationFn: async (content: string) =>
			await sendMessageReq(conversationId, content),
		onError: (err, newMessage, context) => {
			// Optionally handle errors and revert optimistic update if needed
		},
	});

	async function sendMessage(content: string) {
		await mutateAsync(content);
	}

	return { sendMessage };
}
