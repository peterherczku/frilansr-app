import type { PropsWithChildren, ReactElement } from "react";
import { View } from "react-native";
import Animated, {
	interpolate,
	useAnimatedRef,
	useAnimatedStyle,
	useScrollViewOffset,
} from "react-native-reanimated";

import { useColorScheme } from "@/hooks/useColorScheme";

const HEADER_HEIGHT = 250;

type Props = PropsWithChildren<{
	headerImage: ReactElement;
	headerBackgroundColor: { dark: string; light: string };
}>;

export default function ParallaxScrollView({
	children,
	headerImage,
	headerBackgroundColor,
}: Props) {
	const colorScheme = useColorScheme() ?? "light";
	const scrollRef = useAnimatedRef<Animated.ScrollView>();
	const scrollOffset = useScrollViewOffset(scrollRef);
	const headerAnimatedStyle = useAnimatedStyle(() => {
		return {
			transform: [
				{
					translateY: interpolate(
						scrollOffset.value,
						[-HEADER_HEIGHT, 0, HEADER_HEIGHT],
						[-HEADER_HEIGHT / 2, 0, HEADER_HEIGHT * 0.75]
					),
				},
				{
					scale: interpolate(
						scrollOffset.value,
						[-HEADER_HEIGHT, 0, HEADER_HEIGHT],
						[2, 1, 1]
					),
				},
			],
		};
	});

	return (
		<View className="flex-1">
			<Animated.ScrollView ref={scrollRef} scrollEventThrottle={16}>
				<Animated.View
					style={[
						{
							height: HEADER_HEIGHT,
							overflow: "hidden",
							zIndex: 10,
							backgroundColor: headerBackgroundColor[colorScheme],
						},
						headerAnimatedStyle,
					]}
				>
					{headerImage}
				</Animated.View>
				<View className="flex-1 overflow-hidden">{children}</View>
			</Animated.ScrollView>
		</View>
	);
}
