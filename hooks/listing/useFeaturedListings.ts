import { fetchFeaturedListings, fetchListing } from "@/api/listingFunctions";
import { useQuery, useQueryClient } from "@tanstack/react-query";

export function useFeaturedListings() {
	const queryClient = useQueryClient();
	const { data, error, isLoading } = useQuery({
		queryKey: ["featuredListings"],
		queryFn: async () => {
			const listings = await fetchFeaturedListings();
			listings.forEach((listing) => {
				queryClient.setQueryData(["listing", listing.id], listing);
			});
			return listings;
		},
	});

	return { featuredListings: data, error, isLoading };
}
