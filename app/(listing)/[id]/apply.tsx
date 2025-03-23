import {
	LocationBox,
	LocationMapView,
} from "@/components/ui/listing/LocationBox";
import { Colors } from "@/constants/Colors";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { router } from "expo-router";
import {
	ScrollView,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ApplyForJobPage() {
	return (
		<SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
			<View
				style={{
					marginHorizontal: 20,
					flexDirection: "row",
					gap: 6,
					alignItems: "center",
				}}
			>
				<TouchableOpacity onPress={() => router.back()}>
					<Ionicons name="chevron-back" size={30} color={Colors.light.text} />
				</TouchableOpacity>
				<Text style={[styles.text, { fontSize: 22, fontFamily: "Zain-Bold" }]}>
					Apply for the job
				</Text>
			</View>
			<ScrollView style={{ marginVertical: 20, flex: 1 }}>
				<View style={{ marginHorizontal: 20, marginVertical: 10 }}>
					<View style={styles.summaryRow}>
						<Text
							style={[styles.text, { fontSize: 22, fontFamily: "Zain-Bold" }]}
						>
							Take a walk with Max
						</Text>
					</View>
					<View style={styles.summaryRow}>
						<Text style={[styles.text]}>Salary</Text>
						<Text style={[styles.text, { fontFamily: "Zain-Bold" }]}>
							180,00 kr
						</Text>
					</View>
					<View style={styles.summaryRow}>
						<Text style={[styles.text]}>Date</Text>
						<Text style={[styles.text, { fontFamily: "Zain-Bold" }]}>
							Monday at 13:00 - 13:40
						</Text>
					</View>
					<View style={styles.summaryRow}>
						<Text style={[styles.text]}>Duration</Text>
						<Text style={[styles.text, { fontFamily: "Zain-Bold" }]}>
							30 - 40 minutes
						</Text>
					</View>
					<View style={styles.summaryRow}>
						<Text style={[styles.text]}>Location</Text>
						<Text style={[styles.text, { fontFamily: "Zain-Bold" }]}>
							Gamla stan, 5 km away
						</Text>
					</View>
				</View>
				<View style={{ marginVertical: 10, gap: 10 }}>
					<Text
						style={[
							styles.text,
							{ fontSize: 22, fontFamily: "Zain-Bold", marginHorizontal: 20 },
						]}
					>
						Payout
					</Text>
					<TouchableOpacity
						onPress={() => router.push("/(settings)/(payment)/payment")}
						style={{
							marginHorizontal: 20,
							paddingHorizontal: 16,
							paddingVertical: 12,
							borderRadius: 8,
							elevation: 2,
							shadowOffset: {
								width: 0,
								height: 0,
							},
							shadowRadius: 2,
							shadowOpacity: 0.2,
							backgroundColor: "white",
							flexDirection: "row",
							alignItems: "center",
							justifyContent: "space-between",
						}}
					>
						<View
							style={{ flexDirection: "row", alignItems: "center", gap: 15 }}
						>
							<MaterialCommunityIcons
								name="bank-check"
								size={30}
								color={Colors.light.text}
							/>
							<View>
								<Text
									style={[
										styles.text,
										{ fontFamily: "Zain-Bold", fontSize: 19 },
									]}
								>
									BANK ACCOUNT **** 1111
								</Text>
								<Text
									style={[
										styles.text,
										{ color: Colors.light.muted, marginTop: -5, fontSize: 16 },
									]}
								>
									Estimated payout 166,15 kr
								</Text>
							</View>
						</View>
						<View>
							<Ionicons
								name="chevron-forward"
								size={24}
								color={Colors.light.muted}
							/>
						</View>
					</TouchableOpacity>
				</View>
				<View style={{ marginVertical: 10, gap: 10 }}>
					<View style={{ marginHorizontal: 20 }}>
						<Text
							style={[styles.text, { fontSize: 22, fontFamily: "Zain-Bold" }]}
						>
							Location
						</Text>
						<Text
							style={[
								styles.text,
								{ color: Colors.light.muted, marginTop: -5 },
							]}
						>
							The exact location will be revealed upon job confirmation.
						</Text>
					</View>
					<View style={{ marginHorizontal: 20, position: "relative" }}>
						<LocationMapView disabled={true} />
						<View
							style={{
								position: "absolute",
								backgroundColor: "rgba(0,0,0,0.25)",
								width: "100%",
								height: "100%",
								borderRadius: 8,
							}}
						/>
					</View>
				</View>
				<View style={{ marginTop: 10, marginBottom: 60 }}>
					<Text
						style={[
							styles.text,
							{ fontSize: 22, fontFamily: "Zain-Bold", marginHorizontal: 20 },
						]}
					>
						Summary
					</Text>
					<View>
						<View style={[styles.summaryRow, { marginHorizontal: 20 }]}>
							<Text style={[styles.text]}>Salary</Text>
							<Text style={[styles.text, { fontFamily: "Zain-Bold" }]}>
								180,00 kr
							</Text>
						</View>
						<View style={[styles.summaryRow, { marginHorizontal: 20 }]}>
							<Text style={[styles.text]}>Transaction fee</Text>
							<Text style={[styles.text, { fontFamily: "Zain-Bold" }]}>
								-5,85 kr
							</Text>
						</View>
						<View style={[styles.summaryRow, { marginHorizontal: 20 }]}>
							<Text style={[styles.text]}>Application fee</Text>
							<Text style={[styles.text, { fontFamily: "Zain-Bold" }]}>
								- 8 kr
							</Text>
						</View>
						<View style={[styles.summaryRow, { marginHorizontal: 20 }]}>
							<Text style={[styles.text]}>Final salary</Text>
							<Text style={[styles.text, { fontFamily: "Zain-Bold" }]}>
								166,15 kr
							</Text>
						</View>
					</View>
				</View>
			</ScrollView>
			<View style={{ position: "absolute", bottom: 50, width: "100%" }}>
				<TouchableOpacity
					style={{
						backgroundColor: Colors.light.themeColor,
						marginHorizontal: 20,
						padding: 12,
						flexDirection: "row",
						justifyContent: "center",
						borderRadius: 8,
						shadowOffset: {
							width: 0,
							height: 0,
						},
						elevation: 3,
						shadowRadius: 4,
						shadowOpacity: 0.35,
					}}
				>
					<Text style={[styles.text, { color: "white", fontSize: 20 }]}>
						Swipe to accept job offer
					</Text>
				</TouchableOpacity>
			</View>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	text: {
		fontFamily: "Zain",
		fontSize: 18,
		color: Colors.light.text,
	},
	summaryRow: {
		paddingVertical: 5,
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
	},
});
