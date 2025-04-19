import { RecentConversation } from "@/api/messageFunctions";

export function sortRecentConversations(conversations: RecentConversation[]) {
	return conversations.sort((a, b) => {
		const dateA = new Date(a.updatedAt);
		const dateB = new Date(b.updatedAt);

		if (dateA < dateB) return 1;
		if (dateA > dateB) return -1;
		return 0;
	});
}
