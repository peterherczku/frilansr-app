import { TouchableOpacity, View } from "react-native";
import { Text } from "../ui/Text";
import { router } from "expo-router";
import CircularProgress from "react-native-circular-progress-indicator";
import { Colors } from "@/constants/Colors";

export function FLoatingActiveOrder({
	elapsedTime,
	maxTime,
}: {
	elapsedTime: number;
	maxTime: number;
}) {
	const progress = (elapsedTime / maxTime) * 100;
	function onPress() {
		router.push("/(worker)/active-job");
	}

	return (
		<TouchableOpacity
			onPress={onPress}
			className="absolute bottom-[105] right-[15] bg-white shadow-custom z-10 h-[80] w-[80] rounded-full items-center justify-center"
		>
			<CircularProgress
				value={progress}
				radius={40}
				duration={1000}
				activeStrokeColor={Colors.light.themeColor}
				inActiveStrokeColor={"#d9d9d9"}
				activeStrokeWidth={10}
				inActiveStrokeWidth={12}
				showProgressValue={false}
				maxValue={100}
				title={(maxTime - elapsedTime).toString()}
				subtitle="mins left"
				progressValueFontSize={20}
				titleStyle={{
					color: Colors.light.text,
					fontSize: 16,
					fontFamily: "Zain-Bold",
				}}
				subtitleStyle={{
					color: Colors.light.muted,
					fontSize: 13,
					fontFamily: "Zain",
					marginTop: -10,
				}}
			/>
		</TouchableOpacity>
	);
}
