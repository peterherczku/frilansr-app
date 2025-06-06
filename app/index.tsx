import { Colors } from "@/constants/Colors";
import { useUser } from "@clerk/clerk-expo";
import { useRootNavigationState, useRouter } from "expo-router";
import { useEffect } from "react";
import { ActivityIndicator, View } from "react-native";

export default function IndexPage() {
	const { user, isLoaded } = useUser();
	const router = useRouter();

	useEffect(() => {
		if (!isLoaded) return;

		const role = user?.publicMetadata?.role;

		if (role === "LISTER") {
			router.replace("/(lister)/(tabs)/");
		} else {
			router.replace("/(worker)/(tabs)/");
		}
	}, [isLoaded]);

	return (
		<View className="flex-1 justify-center items-center">
			<ActivityIndicator size="large" color={Colors.light.text} />
		</View>
	);
}
