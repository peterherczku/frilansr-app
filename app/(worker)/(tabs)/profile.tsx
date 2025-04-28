import { ScrollView, View } from "react-native";
import { router, useNavigation } from "expo-router";
import { Header } from "@/components/ui/Header";
import { ProfileHeader } from "@/components/profile/ProfileHeader";
import {
	ProfilePaymentBox,
	ProfilePaymentBoxItem,
} from "@/components/profile/ProfilePaymentBox";
import { ProfileAffiliateProgram } from "@/components/profile/ProfileAffiliateProgram";
import { ProfileRecentWorks } from "@/components/profile/ProfileRecentWorks";
import {
	ProfileSettingsBox,
	ProfileSettingsBoxItem,
} from "@/components/profile/ProfileSettingsBox";
import { Footer } from "@/components/ui/Footer";
import { SafeAreaView } from "react-native-safe-area-context";
import { useUserRoleUpdate } from "@/hooks/user/useUserRoleUpdate";
import { CommonActions } from "@react-navigation/native";
import {
	BottomSheetProvider,
	useBottomSheet,
} from "@/components/ui/BottomSheet";
import { AreYouSureModal } from "@/components/ui/AreYouSureModal";
import { FloatingActiveOrder } from "@/components/home/FloatingActiveOrder";
import { usePaymentHistory } from "@/hooks/stripe/usePaymentHistory";

export default function ProfileScreen() {
	const { updateRole } = useUserRoleUpdate();
	const navigation = useNavigation();
	const { open, close } = useBottomSheet();
	const { paymentHistory } = usePaymentHistory();

	async function handleModalConfirm() {
		try {
			await updateRole("LISTER");
			router.replace("/(lister)/(tabs)/");
			navigation.dispatch(
				CommonActions.reset({
					index: 0,
					routes: [{ name: "(lister)", params: { screen: "(tabs)" } }],
				})
			);
		} catch (err) {
			console.error("Failed to update role:", err);
		}
	}

	return (
		<BottomSheetProvider>
			<SafeAreaView className="flex-1 bg-white">
				<Header />
				<ScrollView>
					<ProfileHeader />
					<ProfilePaymentBox>
						<ProfilePaymentBoxItem
							title={"Payment history"}
							subtitle={`${paymentHistory?.length ?? "0"} payments`}
							onPress={() =>
								router.push("/(worker)/(settings)/(payment)/history")
							}
						/>
						<View className="h-[2] bg-[#ECECEC] rounded-lg" />
						<ProfilePaymentBoxItem
							title={"Go to Payment settings"}
							onPress={() =>
								router.push("/(worker)/(settings)/(payment)/payment")
							}
						/>
					</ProfilePaymentBox>
					<ProfileAffiliateProgram />
					<ProfileRecentWorks />
					<ProfileSettingsBox>
						<ProfileSettingsBoxItem
							onPress={() => router.push("/(worker)/(settings)/account")}
							title={"Account"}
						/>
						<View className="h-[2] bg-[#ECECEC] rounded-lg" />
						<ProfileSettingsBoxItem
							onPress={() => router.push("/(worker)/(settings)/payment")}
							title={"Payment"}
						/>
						<View className="h-[2] bg-[#ECECEC] rounded-lg" />
						<ProfileSettingsBoxItem
							onPress={() => {
								open(
									<AreYouSureModal
										close={close}
										handleConfirm={handleModalConfirm}
										message="Are you sure you want to change to job lister mode? This means that all your current and upcoming jobs will be revoked. Are you sure you want to proceed?"
									/>
								);
							}}
							title={"Change to Job Lister mode"}
						/>
						<View className="h-[2] bg-[#ECECEC] rounded-lg" />
						<ProfileSettingsBoxItem
							title={"Delete account"}
							destructive={true}
						/>
					</ProfileSettingsBox>
					<Footer />
				</ScrollView>
				<FloatingActiveOrder />
			</SafeAreaView>
		</BottomSheetProvider>
	);
}
