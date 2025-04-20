import { createCustomerAccount } from "@/api/stripeFunctions";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useCreateCustomerAccount() {
	const queryClient = useQueryClient();
	const { mutateAsync, isPending, error } = useMutation({
		mutationFn: createCustomerAccount,
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: ["hasAccountConnected"],
			});
		},
	});

	return { createCustomerAccount: mutateAsync, isPending, error };
}
