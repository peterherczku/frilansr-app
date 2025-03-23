import { CardOptions } from "@/components/ui/settings/payment/CardOptions";
import { PayoutOptions } from "@/components/ui/settings/payment/PayoutOptions";
import {
	SettingsSection,
	SettingsSectionItem,
	SettingsSectionItemCard,
} from "@/components/ui/settings/SettingsSection";
import { Colors } from "@/constants/Colors";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import {
	ScrollView,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function AddPayoutOptionPage() {
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
					Add new payout option
				</Text>
			</View>
			<ScrollView></ScrollView>
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
