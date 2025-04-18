import { useAuth } from "@clerk/clerk-expo";
import { SignOutOptions } from "@clerk/types";
import { useQueryClient } from "@tanstack/react-query";

export function useSignOut() {
	const { signOut } = useAuth();
	const queryClient = useQueryClient();

	async function handleSignOut(options?: SignOutOptions) {
		await signOut();
		queryClient.clear();
	}

	return { signOut: handleSignOut };
}
