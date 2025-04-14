import { createFetchDraft } from "@/api/listingFunctions";
import { useQuery } from "@tanstack/react-query";

export function useDraftListing({ enabled }: { enabled?: boolean } = {}) {
	const { data, isLoading, isError, isFetching, refetch } = useQuery({
		queryKey: ["draft-listing"],
		queryFn: createFetchDraft,
		staleTime: 1000 * 60,
		enabled: enabled ?? true,
	});

	return {
		draft: data,
		isLoading,
		isError,
		isFetching,
		refetch,
	};
}
