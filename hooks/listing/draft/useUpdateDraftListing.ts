import { updateDraft } from "@/api/listingFunctions";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useDraftListing } from "./useDraftListing";

export function useUpdateDraftListing() {
	const { draft } = useDraftListing();
	const queryClient = useQueryClient();

	const { mutateAsync, isPending, error } = useMutation({
		mutationFn: async (data: any) => {
			if (!draft?.draft) throw Error("Draft not found");
			return await updateDraft(draft.draft.id, data);
		},
	});

	async function updateDraftFunction(data: any) {
		const res = await mutateAsync(data);
		queryClient.setQueryData(["draft-listing"], {
			created: false,
			draft: res,
		});
	}

	return { updateDraft: updateDraftFunction, isPending, error };
}
