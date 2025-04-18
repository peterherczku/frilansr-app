import { ApplicationsList } from "@/components/lister/applications/ApplicationsList";
import { Text } from "@/components/ui/Text";
import { useApplications } from "@/hooks/listing/useApplications";
import { useLocalSearchParams } from "expo-router";
import { ActivityIndicator, View } from "react-native";

export default function ListingApplications() {
	const { id } = useLocalSearchParams();
	const { applications, isLoading, error } = useApplications(id as string);

	if (isLoading || applications === null || applications === undefined) {
		return (
			<View className="flex-1 items-center justify-center bg-white">
				<ActivityIndicator size={"large"} color={"gray"} />
			</View>
		);
	}

	return (
		<ApplicationsList listingId={id as string} applications={applications} />
	);
}
