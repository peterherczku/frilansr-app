import { useNearbyListings } from "@/hooks/listing/useNearbyListings";
import {
	ListingPresenterElements,
	ListingPresenterSkeleton,
} from "./ListPresenter";
import { Text } from "react-native";

export function NearbyListings() {
	const { nearbyListings, error, isLoading, locationError } =
		useNearbyListings();
	if (locationError) {
		return <Text>{locationError}</Text>;
	}
	if (isLoading) {
		return <ListingPresenterSkeleton />;
	}
	if (error || !nearbyListings) {
		return <Text>Error {error?.message}</Text>;
	}

	return <ListingPresenterElements data={nearbyListings} />;
}
