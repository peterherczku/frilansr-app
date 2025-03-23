import { Colors } from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { ReactNode } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export function SettingsSectionItemCard({ children }: { children: ReactNode }) {
	return <TouchableOpacity style={styles.card}>{children}</TouchableOpacity>;
}

export function SettingsSectionItem({
	name,
	value,
}: {
	name: string;
	value?: string;
}) {
	return (
		<TouchableOpacity style={styles.itemContainer}>
			<Text style={[styles.text]}>{name}</Text>
			<View style={styles.iconContainer}>
				{value && (
					<Text style={[styles.text, { color: Colors.light.muted }]}>
						{value}
					</Text>
				)}
				<Ionicons
					name="chevron-forward"
					style={{ marginTop: 0.5 }}
					size={22}
					color={Colors.light.muted}
				/>
			</View>
		</TouchableOpacity>
	);
}

export function SettingsSection({
	title,
	children,
}: {
	title: string;
	children: ReactNode;
}) {
	return (
		<View style={styles.container}>
			<View style={styles.header}>
				<Text style={[styles.text, { fontFamily: "Zain-Bold", fontSize: 20 }]}>
					{title}
				</Text>
			</View>
			{children}
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		marginVertical: 15,
		flexDirection: "column",
	},
	header: {
		flexDirection: "row",
		marginHorizontal: 20,
		paddingVertical: 5,
	},
	text: {
		color: Colors.light.text,
		fontFamily: "Zain",
		fontSize: 18,
	},
	itemContainer: {
		marginHorizontal: 20,
		flexDirection: "row",
		paddingVertical: 5,
		alignItems: "center",
		justifyContent: "space-between",
	},
	iconContainer: {
		flexDirection: "row",
		gap: 5,
	},
	card: {
		marginHorizontal: 20,
		marginVertical: 5,
		padding: 12,
		borderRadius: 8,
		shadowOffset: {
			width: 0,
			height: 0,
		},
		shadowRadius: 2,
		shadowOpacity: 0.2,
		elevation: 2,
		backgroundColor: "white",
	},
});
