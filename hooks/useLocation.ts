import { useEffect, useState } from "react";
import * as Location from "expo-location";

export function useLocation() {
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

	return { location, locationError };
}
