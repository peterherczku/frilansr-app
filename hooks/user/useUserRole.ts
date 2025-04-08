import { useUser } from "@clerk/clerk-expo";

export function useUserRole() {
	const { user } = useUser();
	if (!user) return null;
	return user.publicMetadata.role as "LISTER" | "WORKER" | undefined | null;
}
