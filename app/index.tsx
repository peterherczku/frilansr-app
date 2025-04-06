import { Text } from "@/components/ui/Text";
import { useUser } from "@clerk/clerk-expo";
import { useRootNavigationState, useRouter } from "expo-router";
import { useEffect } from "react";

export default function IndexPage() {
	const { user, isLoaded } = useUser();
	const rootNavigationState = useRootNavigationState();
	const router = useRouter();

	useEffect(() => {
		if (!rootNavigationState?.key || !isLoaded) return;

		const role = user?.publicMetadata?.role;

		if (role === "LISTER") {
			router.replace("/(lister)/(tabs)/");
		} else {
			router.replace("/(worker)/(tabs)/");
		}
	}, [rootNavigationState?.key, isLoaded]);

	return <Text>Loading...</Text>;
}
