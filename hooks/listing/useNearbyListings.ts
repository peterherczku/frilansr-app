import { useEffect, useState } from "react";
import * as Location from "expo-location";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchNearbyListings } from "@/api/listingFunctions";
import { useLocation } from "../useLocation";

export function useNearbyListings() {
	const queryClient = useQueryClient();
	const { location, locationError } = useLocation();

	const { data, error, isLoading } = useQuery({
		queryKey: ["nearbyListings", location],
		queryFn: async () => {
			if (!location) throw new Error("Location not available");
			const listings = await fetchNearbyListings(location.lat, location.lon);
			listings.forEach((listing) => {
				queryClient.setQueryData(["listing", listing.id], listing);
			});
			return listings;
		},
		enabled: !!location,
	});
	return { nearbyListings: data, error, isLoading, locationError };
}
