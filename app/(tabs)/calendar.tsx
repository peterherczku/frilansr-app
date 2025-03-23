import { Header } from "@/components/Header";
import { CalendarList } from "@/components/ui/calendar/CalendarList";
import { Colors } from "@/constants/Colors";
import { StyleSheet, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function CalendarScreen() {
	return (
		<SafeAreaView style={styles.safeContainer}>
			<Header />
			<CalendarList />
		</SafeAreaView>
	);
}
const styles = StyleSheet.create({
	safeContainer: {
		flex: 1,
		backgroundColor: "#fff",
	},
	text: {
		fontFamily: "Zain-Bold",
		fontSize: 24,
		color: Colors.light.text,
		marginHorizontal: 20,
		marginBottom: 5,
	},
});
