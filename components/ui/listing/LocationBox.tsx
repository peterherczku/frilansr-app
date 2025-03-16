import { Colors } from "@/constants/Colors";
import { StyleSheet, Text, View } from "react-native";
import MapView from "react-native-maps";

export function LocationBox() {
	return (
		<View style={{ marginVertical: 20 }}>
			<Text style={[styles.text, { fontFamily: "Zain-Bold", fontSize: 22 }]}>
				Location
			</Text>
			<Text style={[styles.text, { marginTop: -6, color: Colors.light.muted }]}>
				You will see the exact location after taking the job
			</Text>
			<MapView
				initialRegion={{
					latitude: 59.3293,
					longitude: 18.0686,
					latitudeDelta: 0.0522,
					longitudeDelta: 0.0221,
				}}
				style={{
					width: "100%",
					height: 200,
					borderRadius: 8,
					marginVertical: 10,
				}}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	text: {
		fontFamily: "Zain",
		color: Colors.light.text,
		fontSize: 18,
	},
});
