import { useEffect } from "react";
import { useAblyClient } from "./context/AblyClientContext";
import { useAuth } from "@clerk/clerk-expo";

export function useGlobalChatUpdates() {
	const { ablyClient, refreshToken } = useAblyClient();
	const { userId } = useAuth();

	useEffect(() => {
		if (!ablyClient || !userId) return;

		const channel = ablyClient.channels.get(`user:${userId}`);
		channel.subscribe("new-conversation", async (message) => {
			const data = message.data;
			await refreshToken();
			console.log(data);
		});
		console.log("subscribed");
		return () => {
			channel.unsubscribe("new-conversation");
		};
	}, [ablyClient, userId]);
}
