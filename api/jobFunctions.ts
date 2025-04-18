import { BACKEND_API_BASE_URL, fetchWithAuth } from "./apiClient";
import { Listing } from "./listingFunctions";

export interface Job {
	id: string;
	listing: Listing;
	status: "PENDING" | "ACCEPTED" | "ONGOING" | "COMPLETED";
	applications?: {
		id: string;
		imageUrl: string;
		name: string;
	}[];
	worker?: {
		id: string;
		imageUrl: string;
		name: string;
	};
}

export interface JobWithUser {
	id: string;
	status: "WAITING_FOR_WORKER" | "IN_PROGRESS" | "COMPLETED";
	createdAt: string;
	updatedAt: string;
	worker: {
		id: string;
		name: string;
		imageUrl: string;
	};
	listing: Listing;
}

export async function fetchActiveJobs() {
	const res = await fetchWithAuth(`${BACKEND_API_BASE_URL}/jobs/active`);
	return res as JobWithUser[];
}
