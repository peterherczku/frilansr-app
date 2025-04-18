import { Listing, ListingWithApplications } from "@/api/listingFunctions";

export function dropApplications(
	listingWithApplication: ListingWithApplications
): Listing {
	const { applications, ...listing } = listingWithApplication;
	return listing;
}
