import { Header } from "@/components/ui/Header";
import { CalendarList } from "@/components/calendar/CalendarList";
import { SafeAreaView } from "react-native-safe-area-context";

export default function CalendarScreen() {
	return (
		<SafeAreaView className="flex-1 bg-white">
			<Header />
			<CalendarList />
		</SafeAreaView>
	);
}
