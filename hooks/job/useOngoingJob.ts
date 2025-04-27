import { fetchOngoingWorkerJob } from "@/api/jobFunctions";
import { useQuery, useQueryClient } from "@tanstack/react-query";

export function useOngoingJob() {
	const queryClient = useQueryClient();
	const { data, isLoading, error } = useQuery({
		queryKey: ["ongoingJob"],
		queryFn: async () => {
			const res = await fetchOngoingWorkerJob();
			if (res[0]) {
				queryClient.setQueryData(["jobs", res[0].id], res[0]);
			}
			return res;
		},
		refetchInterval: 1000 * 60,
	});
	const ongoingJob = (data ?? [])[0];
	return { ongoingJob, isLoading, error };
}
