import { cn } from "@/utils/cn";
import { cssInterop } from "nativewind";
import { ReactNode } from "react";
import { View } from "react-native";
import { Details, Region, default as RNMapView } from "react-native-maps";
import { Text } from "../ui/Text";

const MapView = cssInterop(RNMapView, {
	className: "style",
});

export function LocationMapView({
	initialRegion,
	className,
	disabled,
	onRegionChangeComplete,
	onRegionChange,
	children,
}: {
	initialRegion?: Region;
	className?: string;
	disabled?: boolean;
	children?: ReactNode;
	onRegionChange?: (region: Region, details: Details) => void;
	onRegionChangeComplete?: (region: Region, details: Details) => void;
}) {
	return (
		<MapView
			onRegionChangeComplete={onRegionChangeComplete}
			onRegionChange={onRegionChange}
			initialRegion={
				initialRegion ?? {
					latitude: 59.3293,
					longitude: 18.0686,
					latitudeDelta: 0.0522,
					longitudeDelta: 0.0221,
				}
			}
			className={cn("w-full h-[200px] rounded-lg", className)}
			zoomEnabled={!disabled}
			scrollEnabled={!disabled}
		>
			{children}
		</MapView>
	);
}

export function LocationBox({ children }: { children: ReactNode }) {
	return (
		<View className="my-[20]">
			<Text className="font-zain-bold text-2xl">Location</Text>
			<Text className="mt-[-6] text-muted">
				You will see the exact location after taking the job
			</Text>
			{children}
		</View>
	);
}
