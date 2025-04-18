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
