import { publishDraft, updateDraft } from "@/api/listingFunctions";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useDraftListing } from "./useDraftListing";

export function usePublishDraftListing() {
	const { draft } = useDraftListing();
	const queryClient = useQueryClient();

	const { mutateAsync, isPending, error } = useMutation({
		mutationFn: async () => {
			if (!draft?.draft) throw Error("Draft not found");
			return await publishDraft(draft.draft.id);
		},
	});

	async function publishDraftFunction() {
		const res = await mutateAsync();
		queryClient.setQueryData(["draft-listing"], null);
	}

	return { publishDraft: publishDraftFunction, isPending, error };
}
