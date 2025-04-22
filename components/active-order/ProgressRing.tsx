import { Colors } from "@/constants/Colors";
import { View } from "react-native";
import CircularProgress from "react-native-circular-progress-indicator";

export function ProgressBar({
	elapsedTime,
	maxTime,
}: {
	elapsedTime: number;
	maxTime: number;
}) {
	const progress = (elapsedTime / maxTime) * 100;

	return (
		<View className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white z-20 w-[250] h-[250] rounded-full items-center justify-center shadow-custom">
			<CircularProgress
				value={progress}
				radius={125}
				duration={1000}
				activeStrokeColor={Colors.light.themeColor}
				inActiveStrokeColor={"#d9d9d9"}
				activeStrokeWidth={16}
				inActiveStrokeWidth={24}
				showProgressValue={false}
				maxValue={100}
				title={(maxTime - elapsedTime).toString()}
				subtitle="minutes left"
				progressValueFontSize={20}
				titleStyle={{
					color: Colors.light.text,
					fontSize: 55,
					fontFamily: "Zain-Bold",
				}}
				subtitleStyle={{
					color: Colors.light.muted,
					fontSize: 22,
					fontFamily: "Zain",
					marginTop: -25,
				}}
			/>
		</View>
	);
}
