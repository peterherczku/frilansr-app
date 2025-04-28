import { cn } from "@/utils/cn";
import { cssInterop } from "nativewind";
import React, { useEffect, useRef } from "react";
import { Animated } from "react-native";

type SkeletonProps = {
	width?: number | `${number}%`;
	height?: number;
	borderRadius?: number;
	className?: string;
};

const AnimatedView = cssInterop(Animated.View, {
	className: "style",
});

const Skeleton: React.FC<SkeletonProps> = ({
	width = "100%",
	height = 20,
	className,
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
		<AnimatedView
			style={{ width, height, opacity: pulseAnim }}
			className={cn("rounded-lg bg-[#aeaeae]", className)}
		/>
	);
};

export { Skeleton };
