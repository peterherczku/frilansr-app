import { useLocation } from "@/hooks/useLocation";
import { useEffect, useState } from "react";
import { LatLng } from "react-native-maps";

const DEFAULT_REGION = {
	latitude: 59.3293,
	longitude: 18.0686,
	latitudeDelta: 0.0522,
	longitudeDelta: 0.0221,
};

export function useDraggableMarker() {
	const { location } = useLocation();
	const [isMapMoving, setMapMoving] = useState(false);
	const [region, setRegion] = useState(DEFAULT_REGION);
	const [markerPosition, setMarkerPosition] = useState<LatLng | null>(null);

	useEffect(() => {
		if (!markerPosition && location) {
			setMarkerPosition({ latitude: location.lat, longitude: location.lon });
		}
	}, [location, markerPosition]);

	function handleRegionChange() {
		if (!isMapMoving) {
			setMapMoving(true);
		}
	}

	function handleRegionChangeComplete(newRegion: typeof DEFAULT_REGION) {
		setMapMoving(false);
		setRegion(newRegion);
		setMarkerPosition({
			latitude: newRegion.latitude,
			longitude: newRegion.longitude,
		});
	}

	return {
		region,
		markerPosition,
		handleRegionChangeComplete,
		handleRegionChange,
		isMapMoving,
	};
}
