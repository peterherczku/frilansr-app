import { applyForListing as apiApplyForListing } from "@/api/listingFunctions";
import { useMutation } from "@tanstack/react-query";

type ApplyVariables = {
	listingId: string;
	message?: string;
};

type ApplyResult = { success: boolean };

export function useApplyForListing() {
	const { mutateAsync, isPending, error } = useMutation<
		ApplyResult,
		Error,
		ApplyVariables
	>({
		mutationFn: async ({ listingId, message }) => {
			return apiApplyForListing(listingId, message);
		},
	});

	return {
		applyForListing: mutateAsync,
		isPending,
		error,
	};
}
