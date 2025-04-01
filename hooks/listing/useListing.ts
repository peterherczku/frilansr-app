import { fetchListing } from "@/api/listingFunctions";
import { useQuery } from "@tanstack/react-query";

export function useListing(listingId: string) {
	const { data, error, isLoading } = useQuery({
		queryKey: ["listing", listingId],
		queryFn: () => fetchListing(listingId),
		enabled: !!listingId,
		staleTime: 1000 * 60,
	});

	return { listing: data, error, isLoading };
}
