import { Colors } from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function PaymentHistoryPage() {
	return (
		<SafeAreaView>
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
					Payment history
				</Text>
			</View>
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
