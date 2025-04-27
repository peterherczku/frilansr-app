import { fetchActiveWorkerJobs } from "@/api/jobFunctions";
import { useQuery, useQueryClient } from "@tanstack/react-query";

export function useActiveWorkerJobs() {
	const queryClient = useQueryClient();
	const { data, isLoading, error } = useQuery({
		queryKey: ["active-worker-jobs"],
		queryFn: async () => {
			const activeWorkerJobs = await fetchActiveWorkerJobs();
			activeWorkerJobs.filter((activeJob) => {
				queryClient.setQueryData(["jobs", activeJob.id], activeJob);
			});
			return activeWorkerJobs;
		},
	});

	return { activeJobs: data, isLoading, error };
}
