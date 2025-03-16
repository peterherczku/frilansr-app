import { StatusBar } from "react-native";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { useLocalSearchParams } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Colors } from "@/constants/Colors";
import { ListingHeader } from "@/components/ui/listing/ListingHeader";
import { useUser } from "@clerk/clerk-expo";

export default function ListingIndexPage() {
	const { id } = useLocalSearchParams();
	const { user } = useUser();

	return (
		<View style={styles.container}>
			<ListingHeader>
				<View style={{ margin: 20 }}>
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
							<View>
								<Text
									style={[
										styles.text,
										{ marginRight: 10, fontFamily: "Zain-Bold", fontSize: 16 },
									]}
								>
									Peter
								</Text>
							</View>
							<Image
								source={{ uri: user?.imageUrl }}
								style={{ width: 50, height: 50, borderRadius: 100 }}
							/>
						</View>
					</View>
				</View>
			</ListingHeader>
		</View>
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
});
