import { startJob as apiStartJob } from "@/api/jobFunctions";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useStartJob() {
	const queryClient = useQueryClient();
	const { mutateAsync, isPending, error } = useMutation({
		mutationFn: async (jobId: string) => await apiStartJob(jobId),
		onSuccess: (result) => {
			queryClient.setQueryData(["jobs", result.id], result);
		},
	});

	return { startJob: mutateAsync, isPending, error };
}
