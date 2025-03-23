import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "@/constants/Colors";
import { ReactNode } from "react";

export function ProfileSettingsBoxItem({
	title,
	destructive,
	onPress,
}: {
	title: string;
	subtitle?: string;
	destructive?: boolean;
	onPress?: () => void;
}) {
	return (
		<TouchableOpacity onPress={onPress} style={styles.box}>
			<View>
				<Text style={[styles.text, destructive && { color: "#F84242" }]}>
					{title}
				</Text>
			</View>
			<Ionicons
				name="chevron-forward"
				size={24}
				color={!destructive ? Colors.light.text : "#F84242"}
			/>
		</TouchableOpacity>
	);
}

export function ProfileSettingsBox({ children }: { children: ReactNode }) {
	return (
		<View style={styles.mainContainer}>
			<Text style={[styles.text, styles.titleText]}>Settings</Text>
			<View style={styles.container}>{children}</View>
		</View>
	);
}

const styles = StyleSheet.create({
	mainContainer: {
		marginHorizontal: 20,
	},
	titleText: {
		fontSize: 25,
		fontFamily: "Zain-Bold",
		marginBottom: 10,
	},
	container: {
		backgroundColor: "white",
		elevation: 2,
		shadowOffset: {
			width: 0,
			height: 0,
		},
		shadowRadius: 2,
		shadowOpacity: 0.25,
		borderRadius: 8,
		paddingHorizontal: 12,
	},
	box: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		paddingVertical: 12,
	},
	text: {
		fontFamily: "Zain",
		fontSize: 18,
		color: Colors.light.text,
	},
	subtitle: {
		fontSize: 16,
		color: Colors.light.muted,
		marginTop: -5,
	},
});
