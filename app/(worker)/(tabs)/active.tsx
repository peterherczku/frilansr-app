import { ActiveJobWidget } from "@/components/active-order/ActiveJobWidget";
import { Header } from "@/components/ui/Header";
import { Text } from "@/components/ui/Text";
import { useActiveWorkerJobs } from "@/hooks/job/useActiveWorkerJobs";
import { selectClosestJob } from "@/utils/jobUtil";
import { ActivityIndicator, FlatList, View } from "react-native";
import {
	SafeAreaView,
	useSafeAreaInsets,
} from "react-native-safe-area-context";

export default function ActiveJobsScreen() {
	const { activeJobs, isLoading, error } = useActiveWorkerJobs();
	const insets = useSafeAreaInsets();

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
			<FlatList
				data={activeJobs}
				renderItem={() => <></>}
				contentContainerStyle={{ paddingBottom: insets.bottom + 25 }}
				ListHeaderComponent={
					<View className="gap-[15]">
						<View className="mx-[20]">
							<Text className="text-3xl font-zain-bold">Next job</Text>
							<Text className="text-muted mt-[-6]">
								Your next job is shown here
							</Text>
						</View>
						{firstJob && <ActiveJobWidget job={firstJob} />}
						<View className="mx-[20]">
							<Text className="text-3xl font-zain-bold">Later jobs</Text>
							<Text className="text-muted mt-[-6]">
								These are your upcoming jobs that you cannot start yet
							</Text>
						</View>
					</View>
				}
			/>
		</SafeAreaView>
	);
}
