import { fetchActiveJobs } from "@/api/jobFunctions";
import { useQuery } from "@tanstack/react-query";
import { act } from "react";

export function useActiveJobs() {
	const { data, isLoading, error } = useQuery({
		queryKey: ["active-jobs"],
		queryFn: fetchActiveJobs,
	});

	return { activeJobs: data, isLoading, error };
}
