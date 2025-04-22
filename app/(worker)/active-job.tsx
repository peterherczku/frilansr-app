import { ProgressBar } from "@/components/active-order/ProgressRing";
import { Text } from "@/components/ui/Text";
import { Colors } from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { router, useFocusEffect } from "expo-router";
import { setStatusBarStyle } from "expo-status-bar";
import { useCallback } from "react";
import { TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ActiveJobScreen() {
	useFocusEffect(
		useCallback(() => {
			setStatusBarStyle("light");

			return () => {
				setStatusBarStyle("auto");
			};
		}, [])
	);

	function onClose() {
		router.back();
	}

	return (
		<SafeAreaView edges={["bottom"]} className="flex-1 bg-white">
			<View className="flex-1 relative">
				<Image
					className="flex-1"
					source={{
						uri: "https://nf1hfvmf3k.ufs.sh/f/gQVRIQtjoqO2EKiQ1vfLP9q1iOuWJZTQkacnKjrfRwoGHC0g",
					}}
				/>
				<View className="absolute top-0 left-0 bg-black opacity-40 z-10 w-full h-full" />
				<TouchableOpacity
					onPress={onClose}
					className="absolute top-[60] right-[20] z-[50] bg-white rounded-full h-[43] w-[43] shadow-lg items-center justify-center"
				>
					<Ionicons name="close-outline" size={32} color={Colors.light.text} />
				</TouchableOpacity>
			</View>
			<View className="flex-1">
				<View className="mt-[145] flex-1 justify-between items-center">
					<View className="mx-[50] gap-[10]">
						<Text className="text-center font-zain-extrabold uppercase text-muted">
							Take a walk with Max
						</Text>
						<Text className="text-center text-xl font-zain-bold leading-6">
							Everything's on track! We'll keep you updated in case anything
							happens!
						</Text>
						<Text className="text-center text-sm text-muted">
							Your location is actively being shared with Péter.
						</Text>
					</View>
					<View className="w-full">
						<TouchableOpacity className="bg-theme rounded-lg shadow-custom mx-[20] p-3 items-center justify-between">
							<Text className="text-xl  text-white font-zain-bold">
								Message Péter
							</Text>
						</TouchableOpacity>
					</View>
				</View>
			</View>
			<ProgressBar elapsedTime={18} maxTime={60} />
		</SafeAreaView>
	);
}
