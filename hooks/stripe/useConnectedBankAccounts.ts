import { fetchConnectedBankAccounts } from "@/api/stripeFunctions";
import { useQuery } from "@tanstack/react-query";

export function useConnectedBankAccounts() {
	const { data, isFetching, error } = useQuery({
		queryKey: ["connectedBankAccounts"],
		queryFn: fetchConnectedBankAccounts,
	});
	return {
		connectedBankAccounts: data?.bankAccounts,
		isLoading: isFetching,
		error,
	};
}
