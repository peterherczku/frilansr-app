import { fetchPaymentHistory } from "@/api/stripeFunctions";
import { useQuery } from "@tanstack/react-query";

export function usePaymentHistory() {
	const { data, isLoading, error } = useQuery({
		queryKey: ["paymentHistory"],
		queryFn: fetchPaymentHistory,
		refetchOnMount: true,
	});
	return {
		paymentHistory: data?.paymentHistory,
		isLoading,
		error,
	};
}
