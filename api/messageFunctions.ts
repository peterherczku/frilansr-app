import { BACKEND_API_BASE_URL, fetchWithAuth } from "./apiClient";

export interface RecentConversation {
	id: string;
	updatedAt: string;
	partner: {
		id: string;
		name: string;
		imageUrl: string;
	};
	lastMessage: Message | null;
}

export interface Message {
	id: string;
	senderId: string;
	content: string;
	sentAt: string;
}

export async function fetchRecentConversations(page: number, limit: number) {
	const res = await fetchWithAuth(
		`${BACKEND_API_BASE_URL}/messages/conversations?page=${page}&limit=${limit}`
	);
	return res.conversations as RecentConversation[];
}
