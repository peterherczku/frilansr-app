import { updateDefaultPaymentMethod } from "@/api/stripeFunctions";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useUpdateDefaultPaymentMethod() {
	const queryClient = useQueryClient();
	const { mutateAsync, isPending, error } = useMutation({
		mutationFn: async (paymentMethodId: string) =>
			await updateDefaultPaymentMethod(paymentMethodId),
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: ["customerPaymentMethods"],
			});
		},
	});

	return { updateDefaultPaymentMethod: mutateAsync, isPending, error };
}
