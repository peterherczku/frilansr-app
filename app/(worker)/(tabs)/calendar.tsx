import { Header } from "@/components/ui/Header";
import { CalendarList } from "@/components/calendar/CalendarList";
import { SafeAreaView } from "react-native-safe-area-context";
import { useActiveWorkerJobs } from "@/hooks/job/useActiveWorkerJobs";
import { ActivityIndicator, View } from "react-native";
import { Text } from "@/components/ui/Text";
import { FloatingActiveOrder } from "@/components/home/FloatingActiveOrder";

export default function CalendarScreen() {
	const { activeJobs, isLoading, error } = useActiveWorkerJobs();

	if (error) {
		return (
			<View className="flex-1 bg-white justify-center items-center">
				<Text className="text-red-500">Error: {error.message}</Text>
			</View>
		);
	}

	if (isLoading || activeJobs === undefined) {
		return (
			<View className="flex-1 bg-white justify-center items-center">
				<ActivityIndicator size={"large"} color={"gray"} />
			</View>
		);
	}

	return (
		<SafeAreaView className="flex-1 bg-white">
			<Header />
			<CalendarList activeJobs={activeJobs} />
			<FloatingActiveOrder />
		</SafeAreaView>
	);
}
