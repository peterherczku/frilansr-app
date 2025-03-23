import { StatusBar } from "react-native";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { Feather, FontAwesome6, Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { router, useLocalSearchParams } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Colors } from "@/constants/Colors";
import { ListingHeader } from "@/components/ui/listing/ListingHeader";
import { useUser } from "@clerk/clerk-expo";
import {
	LocationBox,
	LocationMapView,
} from "@/components/ui/listing/LocationBox";
import { ListingJobLister } from "@/components/ui/listing/ListingJobLister";
import { Dimensions } from "react-native";

export default function ListingIndexPage() {
	const { id } = useLocalSearchParams();
	const { user } = useUser();

	return (
		<>
			<ListingHeader>
				<View style={{ margin: 20, zIndex: 0 }}>
					<View
						style={{
							flexDirection: "row",
							alignItems: "center",
							justifyContent: "space-between",
						}}
					>
						<View>
							<Text
								style={[styles.text, { fontFamily: "Zain-Bold", fontSize: 22 }]}
							>
								Take a walk with Max
							</Text>
							<Text
								style={[
									styles.text,
									{ fontSize: 17, color: Colors.light.muted, marginTop: -8 },
								]}
							>
								Dog walking
							</Text>
						</View>
						<View
							style={{
								flexDirection: "row",
								alignItems: "center",
								justifyContent: "space-between",
							}}
						>
							<Image
								source={{ uri: user?.imageUrl }}
								style={{ width: 50, height: 50, borderRadius: 100 }}
							/>
						</View>
					</View>
					<View style={{ flexDirection: "row", gap: 10, marginVertical: 20 }}>
						<View
							style={[
								styles.box,
								{
									flex: 1,
									flexDirection: "row",
									alignItems: "center",
									justifyContent: "space-between",
									paddingHorizontal: 12,
								},
							]}
						>
							<View
								style={{ flexDirection: "row", alignItems: "center", gap: 10 }}
							>
								<FontAwesome6
									name="clock"
									size={25}
									color={Colors.light.themeColor}
								/>
								<Text
									style={[
										styles.text,
										{ color: Colors.light.themeColor, fontSize: 18 },
									]}
								>
									Job length
								</Text>
							</View>
							<View>
								<Text
									style={[
										styles.text,
										{
											color: Colors.light.themeColor,
											fontSize: 17,
											fontFamily: "Zain-Bold",
										},
									]}
								>
									40 - 50 mins
								</Text>
							</View>
						</View>
						<TouchableOpacity
							style={[
								styles.box,
								{
									width: 45,
									flexDirection: "row",
									alignItems: "center",
									justifyContent: "center",
								},
							]}
						>
							<FontAwesome6
								name="heart-circle-plus"
								size={20}
								color={Colors.light.themeColor}
							/>
						</TouchableOpacity>
						<TouchableOpacity
							style={[
								styles.box,
								{
									width: 45,
									flexDirection: "row",
									alignItems: "center",
									justifyContent: "center",
								},
							]}
						>
							<Feather name="share" size={20} color={Colors.light.themeColor} />
						</TouchableOpacity>
					</View>
					<View
						style={{
							flexDirection: "row",
							justifyContent: "space-between",
							alignItems: "center",
							marginVertical: 5,
						}}
					>
						<Text
							style={[styles.text, { fontSize: 20, fontFamily: "Zain-Bold" }]}
						>
							Date
						</Text>
						<View>
							<Text
								style={[
									styles.text,
									{
										fontSize: 18,
										fontFamily: "Zain-Bold",
										color: Colors.light.themeColor,
									},
								]}
							>
								Monday at 13:00 - 14:00
							</Text>
						</View>
					</View>
					<View
						style={{
							flexDirection: "row",
							justifyContent: "space-between",
							alignItems: "center",
							marginVertical: 5,
						}}
					>
						<Text
							style={[styles.text, { fontSize: 20, fontFamily: "Zain-Bold" }]}
						>
							Salary
						</Text>
						<Text
							style={[
								styles.text,
								{
									fontSize: 18,
									fontFamily: "Zain-Bold",
									color: Colors.light.themeColor,
								},
							]}
						>
							120,00 kr / hour
						</Text>
					</View>
					<LocationBox>
						<LocationMapView style={{ marginVertical: 10 }} />
					</LocationBox>
					<ListingJobLister />
				</View>
			</ListingHeader>
			<TouchableOpacity
				style={styles.button}
				onPress={() => router.push(`/(listing)/${id}/apply`)}
			>
				<Text
					style={[
						styles.text,
						{ color: "white", fontFamily: "Zain-Bold", fontSize: 20 },
					]}
				>
					Apply for the job
				</Text>
				<Text
					style={[
						styles.text,
						{ color: "white", fontFamily: "Zain-Bold", fontSize: 20 },
					]}
				>
					180,00 kr
				</Text>
			</TouchableOpacity>
		</>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	text: {
		fontSize: 18,
		fontFamily: "Zain",
		color: Colors.light.text,
	},
	box: {
		backgroundColor: "rgba(85,147,62,0.4)",
		borderRadius: 8,
		height: 45,
	},
	button: {
		position: "absolute",
		bottom: 40,
		left: 20,
		width: Dimensions.get("window").width - 40,
		height: 50,
		margin: "auto",
		backgroundColor: Colors.light.themeColor,
		borderRadius: 8,
		shadowOffset: {
			width: 0,
			height: 0,
		},
		elevation: 3,
		shadowRadius: 4,
		shadowOpacity: 0.35,
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		paddingHorizontal: 25,
	},
});
