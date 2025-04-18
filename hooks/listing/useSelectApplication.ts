import { JobWithUser } from "@/api/jobFunctions";
import { selectApplication } from "@/api/listingFunctions";
import { useMutation, useQueryClient } from "@tanstack/react-query";

type SelectApplicationVariables = {
	listingId: string;
	applicationId: string;
};

export function useSelectApplication() {
	const queryClient = useQueryClient();
	return useMutation<JobWithUser, Error, SelectApplicationVariables>({
		mutationFn: ({ listingId, applicationId }) =>
			selectApplication(listingId, applicationId),
		onSuccess: (result, vars) => {
			queryClient.invalidateQueries({ queryKey: ["active-jobs"] });
			queryClient.invalidateQueries({ queryKey: ["pending-listings"] });
			queryClient.invalidateQueries({
				queryKey: ["listing-applications", vars.listingId],
			});
			queryClient.invalidateQueries({
				queryKey: ["listing", vars.listingId],
			});
		},
	});
}
