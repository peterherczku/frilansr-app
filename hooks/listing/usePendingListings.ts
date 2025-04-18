import { fetchPendingListings } from "@/api/listingFunctions";
import { dropApplications } from "@/utils/listingUtil";
import { useQuery, useQueryClient } from "@tanstack/react-query";

export function usePendingListings() {
	const queryClient = useQueryClient();
	const { data, isLoading, error } = useQuery({
		queryKey: ["pending-listings"],
		queryFn: async () => {
			const listings = await fetchPendingListings();
			listings.forEach((listing) => {
				queryClient.setQueryData(
					["listing", listing.id],
					dropApplications(listing)
				);
			});
			listings.forEach((listing) => {
				queryClient.setQueryData(
					["listing-applications", listing.id],
					listing.applications
				);
			});
			return listings;
		},
		staleTime: 1000 * 60 * 3,
	});

	return { pendingListings: data, isLoading, error };
}
