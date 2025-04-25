import { ActiveJobWidget } from "@/components/active-order/ActiveJobWidget";
import { Header } from "@/components/ui/Header";
import { Text } from "@/components/ui/Text";
import { useActiveWorkerJobs } from "@/hooks/job/useActiveWorkerJobs";
import { selectClosestJob } from "@/utils/jobUtil";
import { ActivityIndicator, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ActiveJobsScreen() {
	const { activeJobs, isLoading, error } = useActiveWorkerJobs();

	if (error) {
		return (
			<View className="flex-1 justify-center items-center">
				<Text className="text-red-500">{error.message}</Text>
			</View>
		);
	}

	if (isLoading || activeJobs === undefined) {
		return (
			<View className="flex-1 justify-center items-center">
				<ActivityIndicator size={"large"} color={"gray"} />
			</View>
		);
	}

	const firstJob = selectClosestJob(activeJobs);

	return (
		<SafeAreaView className="flex-1 bg-white">
			<Header />
			<View className="gap-[15]">
				{firstJob && <ActiveJobWidget job={firstJob} />}
				<View className="mx-[20]">
					<Text className="text-3xl font-zain-bold">Later jobs</Text>
					<Text className="text-muted mt-[-5] text-lg">
						These are your upcoming jobs that you cannot start yet
					</Text>
				</View>
			</View>
		</SafeAreaView>
	);
}
