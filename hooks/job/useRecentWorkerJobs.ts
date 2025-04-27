import { fetchRecentWorkerJobs } from "@/api/jobFunctions";
import { useQuery, useQueryClient } from "@tanstack/react-query";

export function useRecentWorkerJobs() {
	const queryClient = useQueryClient();
	const { data, isLoading, error } = useQuery({
		queryKey: ["recent-worker-jobs"],
		queryFn: async () => {
			const recentJobs = await fetchRecentWorkerJobs();
			recentJobs.filter((recentJob) => {
				queryClient.setQueryData(["jobs", recentJob.id], recentJob);
			});
			return recentJobs;
		},
	});

	return { recentJobs: data, isLoading, error };
}
