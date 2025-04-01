import React, { useEffect, useRef } from "react";
import { Animated, ViewStyle, StyleSheet, StyleProp } from "react-native";

type SkeletonProps = {
	width?: number | `${number}%`;
	height?: number;
	borderRadius?: number;
	style?: StyleProp<ViewStyle>;
};

const Skeleton: React.FC<SkeletonProps> = ({
	width = "100%",
	height = 20,
	borderRadius = 8,
	style,
}) => {
	const pulseAnim = useRef(new Animated.Value(0.3)).current;

	useEffect(() => {
		Animated.loop(
			Animated.sequence([
				Animated.timing(pulseAnim, {
					toValue: 1,
					duration: 800,
					useNativeDriver: true,
				}),
				Animated.timing(pulseAnim, {
					toValue: 0.3,
					duration: 800,
					useNativeDriver: true,
				}),
			])
		).start();
	}, [pulseAnim]);

	return (
		<Animated.View
			style={[
				styles.skeleton,
				{
					width,
					height,
					borderRadius,
					opacity: pulseAnim,
				} as Animated.AnimatedProps<ViewStyle>, // ✅ Cast to Animated-compatible style
				style,
			]}
		/>
	);
};

const styles = StyleSheet.create({
	skeleton: {
		backgroundColor: "#aeaeae",
	},
});

export { Skeleton };
