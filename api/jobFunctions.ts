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
