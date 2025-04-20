import { hasAccountConnected } from "@/api/stripeFunctions";
import { useQuery } from "@tanstack/react-query";

export function useHasConnectedAccount() {
	const { data, isFetching, error } = useQuery({
		queryKey: ["hasAccountConnected"],
		queryFn: hasAccountConnected,
	});

	return { hasAccount: data?.hasAccount, isLoading: isFetching, error };
}
