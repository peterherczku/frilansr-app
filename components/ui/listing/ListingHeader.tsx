import ParallaxScrollView from "@/components/ParallaxScrollView";
import { Colors } from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { router } from "expo-router";
import { setStatusBarStyle } from "expo-status-bar";
import { ReactNode, useEffect } from "react";
import { StatusBar, StyleSheet, TouchableOpacity, View } from "react-native";

export function ListingHeader({ children }: { children: ReactNode }) {
	useEffect(() => {
		setStatusBarStyle("light");
		return () => {
			setStatusBarStyle("auto");
		};
	}, []);
	function back() {
		router.back();
	}

	return (
		<>
			<ParallaxScrollView
				headerBackgroundColor={{ light: "#D0D0D0", dark: "#353636" }}
				headerImage={
					<View style={styles.imageContainer}>
						<Image
							source={{
								uri: "https://i.ytimg.com/vi/fa3Slv2i0Uw/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLAWGk8rcsk5pPehDJ-uhCLmw0q9EA",
							}}
							style={styles.image}
						/>
						<View style={styles.imageOverlay} />
					</View>
				}
			>
				{children}
			</ParallaxScrollView>
			<TouchableOpacity
				onPress={back}
				style={[styles.button, styles.backButton]}
			>
				<Ionicons
					name="chevron-back"
					size={25}
					style={{ marginLeft: -2 }}
					color={Colors.light.text}
				/>
			</TouchableOpacity>
			<TouchableOpacity style={[styles.button, styles.heartButton]}>
				<Ionicons
					name="heart-outline"
					size={25}
					style={{ marginLeft: -0.5 }}
					color={Colors.light.text}
				/>
			</TouchableOpacity>
		</>
	);
}

const styles = StyleSheet.create({
	imageContainer: {
		width: "100%",
		height: "100%",
		position: "relative",
		zIndex: 50,
	},
	imageOverlay: {
		width: "100%",
		height: "100%",
		position: "absolute",
		top: 0,
		left: 0,
		backgroundColor: "rgba(0,0,0,0.4)",
		zIndex: 51,
	},
	image: {
		width: "100%",
		height: "100%",
		zIndex: 50,
	},
	button: {
		zIndex: 10,
		backgroundColor: "white",
		borderRadius: 50,
		padding: 8,
		width: 40,
		height: 40,
		elevation: 2,
		shadowOffset: {
			width: 0,
			height: 0,
		},
		shadowRadius: 2,
		shadowOpacity: 0.25,
	},
	backButton: {
		position: "absolute",
		top: (StatusBar.currentHeight || 50) + 10, // Ensure it is below the notch
		left: 25,
	},
	heartButton: {
		position: "absolute",
		top: (StatusBar.currentHeight || 50) + 10, // Ensure it is below the notch
		right: 25,
	},
});
