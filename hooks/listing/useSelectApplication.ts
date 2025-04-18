import { JobWithUser } from "@/api/jobFunctions";
import { selectApplication } from "@/api/listingFunctions";
import { useMutation } from "@tanstack/react-query";

type SelectApplicationVariables = {
	listingId: string;
	applicationId: string;
};

export function useSelectApplication() {
	return useMutation<JobWithUser, Error, SelectApplicationVariables>({
		mutationFn: ({ listingId, applicationId }) =>
			selectApplication(listingId, applicationId),
	});
}
