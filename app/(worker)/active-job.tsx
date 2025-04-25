import { ProgressBar } from "@/components/active-order/ProgressRing";
import { Text } from "@/components/ui/Text";
import { Colors } from "@/constants/Colors";
import { useOngoingJob } from "@/hooks/job/useOngoingJob";
import { elapsedTimeInMinutes } from "@/utils/dateUtil";
import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { router, useFocusEffect } from "expo-router";
import { setStatusBarStyle } from "expo-status-bar";
import { useCallback } from "react";
import { TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ActiveJobScreen() {
	const { ongoingJob, isLoading, error } = useOngoingJob();
	if (isLoading || error || ongoingJob === undefined) return null;
	const startDate = new Date(ongoingJob.startTime);
	const elapsedTime = elapsedTimeInMinutes(startDate);
	const maxTime = ongoingJob.listing.duration;

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
						uri: ongoingJob.listing.image,
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
							{ongoingJob.listing.title}
						</Text>
						<Text className="text-center text-xl font-zain-bold leading-6">
							Everything's on track! We'll keep you updated in case anything
							happens!
						</Text>
						<Text className="text-center text-sm text-muted">
							Your location is actively being shared with{" "}
							{ongoingJob.listing.user.name}.
						</Text>
					</View>
					<View className="w-full">
						<TouchableOpacity
							onPress={() => router.replace("/messages/recent-messages")}
							className="bg-theme rounded-lg shadow-custom mx-[20] p-3 items-center justify-between"
						>
							<Text className="text-xl  text-white font-zain-bold">
								Message {ongoingJob.listing.user.name}
							</Text>
						</TouchableOpacity>
					</View>
				</View>
			</View>
			<ProgressBar elapsedTime={elapsedTime} maxTime={maxTime} />
		</SafeAreaView>
	);
}
