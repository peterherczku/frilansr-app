import {
	Applications,
	ApplicationsHeader,
} from "@/components/lister/applications/Applications";
import { Header } from "@/components/ui/Header";
import { Text } from "@/components/ui/Text";
import { usePendingListings } from "@/hooks/listing/usePendingListings";
import { ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ApplicationsPage() {
	const { pendingListings, isLoading, error } = usePendingListings();

	if (pendingListings === null || pendingListings === undefined || isLoading) {
		return (
			<SafeAreaView className="flex-1 items-center justify-center">
				<ActivityIndicator size={"large"} color={"gray"} />
			</SafeAreaView>
		);
	}

	if (error) {
		return (
			<SafeAreaView className="flex-1 items-center justify-center">
				<Text className="text-red-500">Error: {error.message}</Text>
			</SafeAreaView>
		);
	}

	return (
		<SafeAreaView className="flex-1 bg-white">
			<Header />
			<ApplicationsHeader listings={pendingListings} />
			<Applications listings={pendingListings} />
		</SafeAreaView>
	);
}
