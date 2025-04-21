import { fetchOutgoingPayments } from "@/api/stripeFunctions";
import { useQuery } from "@tanstack/react-query";

export function useOutgoingPayments() {
	const { data, isLoading, error } = useQuery({
		queryKey: ["outgoingPayments"],
		queryFn: fetchOutgoingPayments,
	});
	return {
		outgoingPayments: data?.outgoingPayments,
		isLoading,
		error,
	};
}
