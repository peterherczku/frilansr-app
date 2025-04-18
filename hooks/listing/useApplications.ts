import {
	fetchApplications,
	ListingWithApplications,
} from "@/api/listingFunctions";
import { useQuery, useQueryClient } from "@tanstack/react-query";

export function useApplications(listingId: string) {
	const queryClient = useQueryClient();
	const { data, isLoading, error } = useQuery({
		queryKey: ["listing-applications", listingId],
		queryFn: async () => {
			const applications = await fetchApplications(listingId);
			queryClient.setQueryData(
				["pending-listings"],
				(oldData: ListingWithApplications[]) => {
					return oldData.map((listing) => {
						if (listing.id !== listingId) return listing;
						return {
							...listing,
							applications,
						};
					});
				}
			);
			return applications;
		},
	});

	return { applications: data, isLoading, error };
}
