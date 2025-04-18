import { useMemo } from "react";
import { useLocation } from "./useLocation";

export function useDistance(targetLocation?: {
	longitude: number;
	latitude: number;
}): string {
	const { location } = useLocation();

	const distance = useMemo(() => {
		if (!location || !targetLocation) {
			return "Unavailable";
		}

		const dLat = location.lat - targetLocation.latitude;
		const dLon = location.lon - targetLocation.longitude;
		const km = Math.hypot(dLat, dLon) * 111;
		return `${km.toFixed(2)} km`;
	}, [location, targetLocation]);

	return distance;
}
