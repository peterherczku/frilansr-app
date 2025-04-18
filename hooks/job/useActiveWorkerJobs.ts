import { fetchActiveWorkerJobs } from "@/api/jobFunctions";
import { useQuery } from "@tanstack/react-query";

export function useActiveWorkerJobs() {
	const { data, isLoading, error } = useQuery({
		queryKey: ["active-worker-jobs"],
		queryFn: fetchActiveWorkerJobs,
	});

	return { activeJobs: data, isLoading, error };
}
