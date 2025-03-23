import {
	SettingsSection,
	SettingsSectionItem,
} from "@/components/ui/settings/SettingsSection";
import { Colors } from "@/constants/Colors";
import { useClerk } from "@clerk/clerk-expo";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import {
	ScrollView,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function AccountSettingsPage() {
	const { signOut } = useClerk();

	return (
		<SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
			<View
				style={{
					marginHorizontal: 20,
					flexDirection: "row",
					gap: 6,
					alignItems: "center",
				}}
			>
				<TouchableOpacity onPress={() => router.back()}>
					<Ionicons name="chevron-back" size={30} color={Colors.light.text} />
				</TouchableOpacity>
				<Text style={[styles.text, { fontSize: 22, fontFamily: "Zain-Bold" }]}>
					Account settings
				</Text>
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
					<TouchableOpacity
						style={{
							backgroundColor: Colors.light.themeColor,
							flexDirection: "row",
							alignItems: "center",
							justifyContent: "center",
							padding: 8,
							borderRadius: 8,
							marginVertical: 10,
							marginHorizontal: 20,
						}}
					>
						<Text
							style={[styles.text, { color: "white", fontFamily: "Zain-Bold" }]}
						>
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
					style={{
						backgroundColor: "rgba(248,66,66,0.3)",
						flexDirection: "row",
						alignItems: "center",
						justifyContent: "center",
						padding: 8,
						borderRadius: 8,
						marginTop: 5,
						marginBottom: 20,
						marginHorizontal: 20,
					}}
					onPress={() =>
						signOut({
							redirectUrl: "/",
						})
					}
				>
					<Text
						style={[styles.text, { color: "#F84242", fontFamily: "Zain-Bold" }]}
					>
						Log out
					</Text>
				</TouchableOpacity>
			</ScrollView>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	text: {
		color: Colors.light.text,
		fontFamily: "Zain",
		fontSize: 18,
	},
});
