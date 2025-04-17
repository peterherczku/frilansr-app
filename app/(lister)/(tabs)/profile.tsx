import { AreYouSureModal } from "@/components/ui/AreYouSureModal";
import { useBottomSheet } from "@/components/ui/BottomSheet";
import { Header } from "@/components/ui/Header";
import { Text } from "@/components/ui/Text";
import { useUserRoleUpdate } from "@/hooks/user/useUserRoleUpdate";
import { CommonActions } from "@react-navigation/native";
import { router, useNavigation } from "expo-router";
import { TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ListerProfilePage() {
	const { updateRole } = useUserRoleUpdate();
	const navigation = useNavigation();
	const { open, close } = useBottomSheet();

	async function handleModalConfirm() {
		try {
			await updateRole("WORKER");
			router.replace("/(worker)/(tabs)/");
			navigation.dispatch(
				CommonActions.reset({
					index: 0,
					routes: [{ name: "(worker)", params: { screen: "(tabs)" } }],
				})
			);
		} catch (err) {
			console.error("Failed to update role:", err);
		}
	}

	return (
		<SafeAreaView>
			<Header />
			<TouchableOpacity
				className="bg-theme p-[12] rounded-lg mx-[20]"
				onPress={() => {
					open(
						<AreYouSureModal
							close={close}
							handleConfirm={handleModalConfirm}
							message="Are you sure you want to change to job lister mode? This means that all your current and upcoming jobs will be revoked. Are you sure you want to proceed?"
						/>
					);
				}}
			>
				<Text className="text-white text-center font-zain-bold text-lg">
					Change account
				</Text>
			</TouchableOpacity>
		</SafeAreaView>
	);
}
