import { fetchOnboardingLink } from "@/api/stripeFunctions";
import { useQuery } from "@tanstack/react-query";

export function useConnectOnboardingLink() {
	const { data, isFetching, error } = useQuery({
		queryKey: ["stripeAccountLink"],
		queryFn: fetchOnboardingLink,
		staleTime: 1000 * 60 * 60 * 24,
		refetchOnWindowFocus: false,
		refetchOnReconnect: false,
		refetchOnMount: false,
	});
	return { onboardingLink: data?.url, isLoading: isFetching, error };
}
