import { Colors } from "@/constants/Colors";
import { ReactNode } from "react";
import { StyleProp, StyleSheet, Text, View, ViewStyle } from "react-native";
import MapView from "react-native-maps";

export function LocationMapView({
	style,
	disabled,
}: {
	style?: StyleProp<ViewStyle>;
	disabled?: boolean;
}) {
	return (
		<MapView
			initialRegion={{
				latitude: 59.3293,
				longitude: 18.0686,
				latitudeDelta: 0.0522,
				longitudeDelta: 0.0221,
			}}
			style={[{ width: "100%", height: 200, borderRadius: 8 }, style]}
			zoomEnabled={!disabled}
			scrollEnabled={!disabled}
		/>
	);
}

export function LocationBox({ children }: { children: ReactNode }) {
	return (
		<View style={{ marginVertical: 20 }}>
			<Text style={[styles.text, { fontFamily: "Zain-Bold", fontSize: 22 }]}>
				Location
			</Text>
			<Text style={[styles.text, { marginTop: -6, color: Colors.light.muted }]}>
				You will see the exact location after taking the job
			</Text>
			{children}
		</View>
	);
}

const styles = StyleSheet.create({
	text: {
		fontFamily: "Zain",
		color: Colors.light.text,
		fontSize: 16,
	},
});
