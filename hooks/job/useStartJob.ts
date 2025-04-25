import { startJob as apiStartJob, JobWithUser } from "@/api/jobFunctions";
import {
	QueryClient,
	useMutation,
	useQueryClient,
} from "@tanstack/react-query";

export function updateOngoingJobCache(
	queryClient: QueryClient,
	jobId: string,
	result: JobWithUser
) {
	if (queryClient.getQueryData(["active-worker-jobs"])) {
		queryClient.setQueryData(
			["active-worker-jobs"],
			(oldData: JobWithUser[]) => {
				return oldData.map((job) => {
					if (job.id !== jobId) return job;
					return result;
				});
			}
		);
	}
	if (queryClient.getQueryData(["jobs"])) {
		queryClient.setQueryData(["jobs", result.id], result);
	}
	queryClient.invalidateQueries({
		queryKey: ["ongoingJob"],
	});
}

export function useStartJob() {
	const queryClient = useQueryClient();
	const { mutateAsync, isPending, error } = useMutation({
		mutationFn: async (jobId: string) => await apiStartJob(jobId),
		onSuccess: (result, jobId) => {
			updateOngoingJobCache(queryClient, jobId, result);
		},
	});

	return { startJob: mutateAsync, isPending, error };
}
