import { useEffect, useState } from "react";
import * as Location from "expo-location";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchNearbyListings } from "@/api/listingFunctions";

export function useNearbyListings() {
	const queryClient = useQueryClient();
	const [location, setLocation] = useState<{ lat: number; lon: number } | null>(
		null
	);
	const [locationError, setLocationError] = useState<string | null>(null);

	useEffect(() => {
		(async () => {
			const { status } = await Location.requestForegroundPermissionsAsync();
			if (status !== "granted") {
				setLocationError("Permission to access location was denied");
				return;
			}

			const loc = await Location.getCurrentPositionAsync({});
			setLocation({ lat: loc.coords.latitude, lon: loc.coords.longitude });
		})();
	}, []);

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
