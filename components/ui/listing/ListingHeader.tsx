import ParallaxScrollView from "@/components/ParallaxScrollView";
import { Colors } from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { Image as ExpoImage } from "expo-image";
import { router, useFocusEffect } from "expo-router";
import { setStatusBarStyle } from "expo-status-bar";
import { remapProps } from "nativewind";
import { ReactNode, useCallback } from "react";
import { StatusBar, TouchableOpacity, View } from "react-native";

const Image = remapProps(ExpoImage, {
	className: "style",
});

export function ListingHeader({ children }: { children: ReactNode }) {
	useFocusEffect(
		useCallback(() => {
			setStatusBarStyle("light");

			return () => {
				setStatusBarStyle("auto");
			};
		}, [])
	);
	function back() {
		router.back();
	}

	return (
		<>
			<ParallaxScrollView
				headerBackgroundColor={{ light: "#D0D0D0", dark: "#353636" }}
				headerImage={
					<View className="w-full h-full relative z-[50]">
						<Image
							source={{
								uri: "https://i.ytimg.com/vi/fa3Slv2i0Uw/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLAWGk8rcsk5pPehDJ-uhCLmw0q9EA",
							}}
							className={"w-full h-full z-[50]"}
						/>
						<View
							className="w-full h-full absolute top-0 left-0 z-[51]"
							style={{
								backgroundColor: "rgba(0,0,0,0.4)",
							}}
						/>
					</View>
				}
			>
				{children}
			</ParallaxScrollView>
			<TouchableOpacity
				onPress={back}
				className="z-[10] bg-white rounded-[50] p-[8] w-[40] h-[40] shadow-md absolute left-[25]"
				style={{
					top: (StatusBar.currentHeight || 50) + 10, // Ensure it is below the notch
				}}
			>
				<Ionicons
					name="chevron-back"
					size={25}
					style={{ marginLeft: -2 }}
					color={Colors.light.text}
				/>
			</TouchableOpacity>
			<TouchableOpacity
				className="z-[10] bg-white rounded-[50] p-[8] w-[40] h-[40] shadow-md absolute right-[25]"
				style={{
					top: (StatusBar.currentHeight || 50) + 10, // Ensure it is below the notch
				}}
			>
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
