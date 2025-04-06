import { Text } from "@/components/ui/Text";
import { useUserRoleUpdate } from "@/hooks/user/useUserRoleUpdate";
import { showConfirmModal } from "@/utils/modalCallbacks";
import { router } from "expo-router";
import { TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ListerIndexPage() {
	const { updateRole } = useUserRoleUpdate();

	return (
		<SafeAreaView>
			<Text>Lister page!</Text>
			<TouchableOpacity
				onPress={() =>
					showConfirmModal({
						message:
							"Are you sure you want to change back your role to worker?",
						onConfirm: async () => {
							try {
								await updateRole("WORKER");
								router.replace("/(worker)/(tabs)/");
							} catch (err) {
								console.error("Failed to update role:", err);
							}
						},
					})
				}
			>
				<Text>Change back to worker</Text>
			</TouchableOpacity>
		</SafeAreaView>
	);
}
