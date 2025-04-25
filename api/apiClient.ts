import { getClerkInstance } from "@clerk/clerk-expo";

export const BACKEND_API_BASE_URL =
	"https://frilansr-backend-production.up.railway.app/api";
async function fetchWithTimeout(
	input: RequestInfo,
	init: RequestInit = {},
	timeout = 10_000
) {
	const controller = new AbortController();
	const id = setTimeout(() => controller.abort(), timeout);
	try {
		const res = await fetch(input, { ...init, signal: controller.signal });
		return res;
	} finally {
		clearTimeout(id);
	}
}

export async function fetchWithAuth(url: string, options: RequestInit = {}) {
	const clerkInstance = getClerkInstance();
	const token = await clerkInstance.session?.getToken();
	const headers: HeadersInit = {
		"Content-Type": "application/json",
		...(options.headers || {}),
		...(token ? { Authorization: `Bearer ${token}` } : {}),
	};

	const res = await fetchWithTimeout(url, { ...options, headers }, 15_000);

	if (!res.ok) {
		try {
			const error = await res.json();
			if (error?.message) {
				console.log("Error message:", error.message);
				throw new Error(error.message);
			}
			console.log(JSON.stringify(error));
			throw new Error(`Request failed: ${res.status} ${res.statusText}`);
		} catch (e) {
			console.log(e);
		}
	}
	return res.json();
}
