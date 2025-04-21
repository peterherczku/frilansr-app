import { createConnectAccount } from "@/api/stripeFunctions";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useCreateConnectAccount() {
	const queryClient = useQueryClient();
	const { mutateAsync, isPending, error } = useMutation({
		mutationFn: createConnectAccount,
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: ["hasAccountConnected"],
			});
		},
	});

	return { createConnectAccount: mutateAsync, isPending, error };
}
