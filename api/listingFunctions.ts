import { BACKEND_API_BASE_URL, fetchWithAuth } from "./apiClient";

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
