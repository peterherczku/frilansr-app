import { BACKEND_API_BASE_URL, fetchWithAuth } from "./apiClient";

export type JobType = "DOG_WALKING" | "DOG_SITTING" | "DOG_TRAINING";

export const jobTypes = ["DOG_WALKING", "DOG_SITTING", "DOG_TRAINING"] as const;

export interface Listing {
	id: string;
	title: string;
	description: string;
	image: string;
	salary: number;
	location: {
		longitude: number;
		latitude: number;
	};
	createdAt: string;
	type: string;
	date: string;
	duration: number;
	user: {
		id: string;
		imageUrl: string;
		name: string;
	};
}

export interface ListingWithApplications {
	id: string;
	title: string;
	description: string;
	image: string;
	salary: number;
	location: {
		longitude: number;
		latitude: number;
	};
	createdAt: string;
	type: string;
	date: string;
	duration: number;
	user: {
		id: string;
		imageUrl: string;
		name: string;
	};
	applications: {
		id: string;
		user: {
			id: string;
			imageUrl: string;
			name: string;
		};
		message: string;
	}[];
}

export interface Application {
	id: string;
	user: {
		id: string;
		imageUrl: string;
		name: string;
	};
	message: string;
}

export interface ListingDraft {
	id: string;
	title?: string;
	description?: string;
	image?: string;
	salary?: number;
	location?: {
		longitude: number;
		latitude: number;
	};
	createdAt?: string;
	type?: string;
	date?: string;
	duration?: number;
	user: {
		id: string;
		imageUrl: string;
		name: string;
	};
}

export async function fetchListing(listingId: string) {
	const res = await fetchWithAuth(
		`${BACKEND_API_BASE_URL}/listings/${listingId}`
	);
	return res.listing as Listing;
}

export async function fetchNearbyListings(lat: number, lon: number) {
	const res = await fetchWithAuth(
		`${BACKEND_API_BASE_URL}/listings/nearby?latitude=${lat}&longitude=${lon}`
	);
	return res as Listing[];
}

export async function fetchFeaturedListings() {
	const res = await fetchWithAuth(`${BACKEND_API_BASE_URL}/listings/featured`);
	return res as Listing[];
}

export async function createFetchDraft() {
	const res = await fetchWithAuth(`${BACKEND_API_BASE_URL}/listings/create`, {
		method: "POST",
	});
	return {
		created: res.created as boolean,
		draft: res.draft as ListingDraft,
	};
}

export async function updateDraft(draftId: string, data: any) {
	const res = await fetchWithAuth(
		`${BACKEND_API_BASE_URL}/listings/${draftId}/update`,
		{
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(data),
		}
	);
	return res.draft as ListingDraft;
}

export async function publishDraft(draftId: string) {
	const res = await fetchWithAuth(
		`${BACKEND_API_BASE_URL}/listings/${draftId}/publish`,
		{
			method: "POST",
		}
	);
	return res.draft as Listing;
}

export async function fetchPendingListings() {
	const res = await fetchWithAuth(`${BACKEND_API_BASE_URL}/listings/pending`);
	return res as ListingWithApplications[];
}

export async function fetchApplications(listingId: string) {
	const res = await fetchWithAuth(
		`${BACKEND_API_BASE_URL}/listings/${listingId}/applications`
	);
	return res.applications as Application[];
}
