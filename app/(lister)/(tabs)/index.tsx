import {
	ActiveListings,
	ActiveListingsHeader,
} from "@/components/lister/activeListings/ActiveListings";
import { Header } from "@/components/ui/Header";
import { Text } from "@/components/ui/Text";
import { useActiveJobs } from "@/hooks/job/useActiveJobs";
import { ActivityIndicator, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ListerIndexPage() {
	const { activeJobs, isLoading, error } = useActiveJobs();

	if (isLoading || activeJobs === undefined || activeJobs === null) {
		return (
			<View className="flex-1 bg-white items-center justify-center">
				<ActivityIndicator size="large" color="gray" />
			</View>
		);
	}

	if (error) {
		return (
			<View className="flex-1 bg-white items-center justify-center">
				<Text className="text-red-500">Error: {error.message}</Text>
			</View>
		);
	}

	return (
		<SafeAreaView className="flex-1 bg-white">
			<Header />
			<ActiveListingsHeader />
			<ActiveListings jobs={activeJobs} />
		</SafeAreaView>
	);
}
