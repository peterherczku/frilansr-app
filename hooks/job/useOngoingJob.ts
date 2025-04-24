import { fetchOngoingWorkerJob } from "@/api/jobFunctions";
import { useQuery } from "@tanstack/react-query";

export function useOngoingJob() {
	const { data, isLoading, error } = useQuery({
		queryKey: ["ongoingJob"],
		queryFn: fetchOngoingWorkerJob,
	});
	const ongoingJob = (data ?? [])[0];
	return { ongoingJob, isLoading, error };
}
