import { fetchCustomerPaymentMethods } from "@/api/stripeFunctions";
import { useQuery } from "@tanstack/react-query";

export function useCustomerPaymentMethods() {
	const { data, isLoading, error } = useQuery({
		queryKey: ["customerPaymentMethods"],
		queryFn: fetchCustomerPaymentMethods,
	});

	return { paymentMethods: data, isLoading, error };
}
