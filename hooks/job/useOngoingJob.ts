import { fetchOngoingWorkerJob } from "@/api/jobFunctions";
import { useQuery } from "@tanstack/react-query";

export function useOngoingJob() {
	const { data, isLoading, error } = useQuery({
		queryKey: ["ongoingJob"],
		queryFn: async () => {
			const res = await fetchOngoingWorkerJob();
			return res;
		},
		refetchInterval: 1000 * 60,
	});
	const ongoingJob = (data ?? [])[0];
	return { ongoingJob, isLoading, error };
}
