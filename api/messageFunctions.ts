import { BACKEND_API_BASE_URL, fetchWithAuth } from "./apiClient";

export interface Conversation {
	id: string;
	partner: {
		id: string;
		name: string;
		imageUrl: string;
		lastSeen: string | undefined;
	};
}

export interface RecentConversation {
	id: string;
	updatedAt: string;
	partner: {
		id: string;
		name: string;
		imageUrl: string;
		lastSeen: string | undefined;
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
		`${BACKEND_API_BASE_URL}/messages/recent-conversations?page=${page}&limit=${limit}`
	);
	return res.conversations as RecentConversation[];
}

export async function fetchConversation(conversationId: string) {
	const res = await fetchWithAuth(
		`${BACKEND_API_BASE_URL}/messages/conversation?id=${conversationId}`
	);
	return res.conversation as Conversation;
}

export async function fetchMessages(
	conversationId: string,
	limit: number,
	before: Date
) {
	const res = await fetchWithAuth(
		`${BACKEND_API_BASE_URL}/messages?conversationId=${conversationId}&limit=${limit}&before=${before.toISOString()}`
	);
	return {
		messages: res.messages as Message[],
		nextCursor: res.nextCursor as string,
		hasMore: res.hasMore as boolean,
	};
}

export async function sendMessageReq(conversationId: string, content: string) {
	await fetchWithAuth(`${BACKEND_API_BASE_URL}/messages`, {
		method: "POST",
		headers: {
			"Content-type": "application/json",
		},
		body: JSON.stringify({
			conversationId,
			content,
		}),
	});
}

export async function sendSeen(conversationId: string) {
	await fetchWithAuth(`${BACKEND_API_BASE_URL}/messages/seen`, {
		method: "POST",
		headers: {
			"Content-type": "application/json",
		},
		body: JSON.stringify({
			conversationId,
		}),
	});
}

export async function fetchUnseenMessagesCount() {
	const res = await fetchWithAuth(
		`${BACKEND_API_BASE_URL}/messages/unseen-count`
	);
	return res.count as number;
}
