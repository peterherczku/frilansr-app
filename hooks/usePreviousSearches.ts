import { searchCache } from "@/cache";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export function usePreviousSearches() {
	const { data, isPending } = useQuery({
		queryKey: ["previousSearches"],
		queryFn: searchCache!.getSearches,
	});
	const queryClient = useQueryClient();

	const addSearch = useMutation({
		mutationFn: (newSearch: string) => {
			return searchCache!.saveSearch(newSearch);
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["previousSearches"] });
		},
	});

	const clearSearch = useMutation({
		mutationFn: () => {
			return searchCache!.clear();
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["previousSearches"] });
		},
	});
	return {
		previousSearches: data,
		isPending,
		saveSearch: addSearch.mutate,
		clearSearch: clearSearch.mutate,
	};
}
