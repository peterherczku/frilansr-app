import {
	SettingsSection,
	SettingsSectionItem,
} from "@/components/settings/SettingsSection";
import { Text } from "@/components/ui/Text";
import { Colors } from "@/constants/Colors";
import { useSignOut } from "@/hooks/auth/useSignOut";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { cssInterop } from "nativewind";
import { ScrollView, TouchableOpacity, View } from "react-native";
import { SafeAreaView as RNSafeAreaView } from "react-native-safe-area-context";

const SafeAreaView = cssInterop(RNSafeAreaView, {
	className: "style",
});

export default function AccountSettingsPage() {
	const { signOut } = useSignOut();

	return (
		<SafeAreaView className="flex-1 bg-white">
			<View className="mx-[20] flex-row gap-[6] items-center">
				<TouchableOpacity onPress={() => router.back()}>
					<Ionicons name="chevron-back" size={30} color={Colors.light.text} />
				</TouchableOpacity>
				<Text className="text-2xl font-zain-bold">Account settings</Text>
			</View>
			<ScrollView>
				<SettingsSection title="Preferences">
					<SettingsSectionItem name="Language" value="English" />
					<SettingsSectionItem name="Currency" value="kr" />
					<SettingsSectionItem name="Notifications" />
				</SettingsSection>
				<SettingsSection title="Security & Privacy">
					<SettingsSectionItem name="Change password" />
				</SettingsSection>
				<SettingsSection title="Personal Information">
					<SettingsSectionItem name="Name" value="Péter Herczku" />
					<SettingsSectionItem name="Date of Birth" value="2004/09/15" />
					<TouchableOpacity className="bg-theme flex-row items-center justify-center p-[8] my-[10] mx-[20] rounded-lg">
						<Text className="text-white font-zain-bold text-lg">
							Verify with Mobile BankID
						</Text>
					</TouchableOpacity>
				</SettingsSection>
				<SettingsSection title="Marketing Messages">
					<SettingsSectionItem name="Email" />
					<SettingsSectionItem name="Notifications" />
				</SettingsSection>
				<SettingsSection title="Your Data">
					<SettingsSectionItem name="Data Policy" />
					<SettingsSectionItem name="Tracking" />
				</SettingsSection>
				<TouchableOpacity
					className="flex-row items-center justify-center p-[8] rounded-[5] mt-[5] mb-[20] mx-[20]"
					style={{
						backgroundColor: "rgba(248,66,66,0.3)",
					}}
					onPress={() =>
						signOut({
							redirectUrl: "/",
						})
					}
				>
					<Text className="text-lg text-[#F84242] font-zain-bold">Log out</Text>
				</TouchableOpacity>
			</ScrollView>
		</SafeAreaView>
	);
}
