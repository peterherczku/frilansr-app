import { fetchActiveJobs } from "@/api/jobFunctions";
import { useQuery, useQueryClient } from "@tanstack/react-query";

export function useActiveJobs() {
	const queryClient = useQueryClient();
	const { data, isLoading, error } = useQuery({
		queryKey: ["active-jobs"],
		queryFn: async () => {
			const activeJobs = await fetchActiveJobs();
			activeJobs.filter((activeJob) => {
				queryClient.setQueryData(["jobs", activeJob.id], activeJob);
			});
			return activeJobs;
		},
	});

	return { activeJobs: data, isLoading, error };
}
