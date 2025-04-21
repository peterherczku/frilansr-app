import {
	updateUserRole as apiUpdateUserRole,
	UserRole,
} from "@/api/userFunctions";
import { useUser } from "@clerk/clerk-expo";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useUserRoleUpdate() {
	const queryClient = useQueryClient();
	const { user } = useUser();

	const { mutateAsync, isError, error, isPending } = useMutation({
		mutationFn: async (role: UserRole) => {
			return await apiUpdateUserRole(role);
		},
		onSuccess: async (data) => {
			if (!data.success || !user) return;
			await user.reload();
			queryClient.clear();
		},
	});

	return {
		updateRole: mutateAsync,
		isPending,
		isError,
		error,
	};
}
