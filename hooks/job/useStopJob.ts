import { stopJob as apiStopJob } from "@/api/jobFunctions";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateOngoingJobCache } from "./useStartJob";

export function useStopJob() {
	const queryClient = useQueryClient();
	const { mutateAsync, isPending, error } = useMutation({
		mutationFn: async (jobId: string) => await apiStopJob(jobId),
		onSuccess: (result, jobId) => {
			updateOngoingJobCache(queryClient, jobId, result);
		},
	});

	return { stopJob: mutateAsync, isPending, error };
}
