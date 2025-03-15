import { Header } from "@/components/Header";
import { MySafeAreaView as SafeAreaView } from "@/components/SafeAreaView";
import { CalendarList } from "@/components/ui/calendar/CalendarList";
import { Colors } from "@/constants/Colors";
import { StyleSheet, Text } from "react-native";

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
