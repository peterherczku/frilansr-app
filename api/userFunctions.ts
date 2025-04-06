import { BACKEND_API_BASE_URL, fetchWithAuth } from "./apiClient";

export type UserRole = "LISTER" | "WORKER";

export async function updateUserRole(userRole: UserRole) {
	const res = await fetchWithAuth(`${BACKEND_API_BASE_URL}/users/updateRole`, {
		headers: {
			"Content-Type": "application/json",
		},
		method: "POST",
		body: JSON.stringify({ role: userRole }),
	});
	return res as { success: boolean };
}
