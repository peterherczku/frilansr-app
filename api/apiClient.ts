import { getClerkInstance } from "@clerk/clerk-expo";

export const BACKEND_API_BASE_URL =
	"https://frilansr-backend-production.up.railway.app/api";

export async function fetchWithAuth(url: string, options: RequestInit = {}) {
	const clerkInstance = getClerkInstance();
	const token = await clerkInstance.session?.getToken();
	const headers: HeadersInit = {
		"Content-Type": "application/json",
		...(options.headers || {}),
		...(token ? { Authorization: `Bearer ${token}` } : {}),
	};

	const res = await fetch(url, { ...options, headers });

	if (!res.ok) {
		throw new Error(`Request failed: ${res.status} ${res.statusText}`);
	}
	return res.json();
}
