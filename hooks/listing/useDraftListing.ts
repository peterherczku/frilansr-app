import { createFetchDraft } from "@/api/listingFunctions";
import { useQuery } from "@tanstack/react-query";

export function useDraftListing() {
	const { data, isLoading, isError, isFetching } = useQuery({
		queryKey: ["draft-listing"],
		queryFn: createFetchDraft,
		staleTime: 1000 * 60,
	});

	return {
		draft: data,
		isLoading,
		isError,
		isFetching,
	};
}
