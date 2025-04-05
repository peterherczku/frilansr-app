import { cn } from "@/utils/cn";
import { ReactNode } from "react";
import { Text as RNText } from "react-native";

export function Text({
	className,
	children,
	numberOfLines,
}: {
	className?: string;
	children?: ReactNode;
	numberOfLines?: number;
}) {
	return (
		<RNText
			numberOfLines={numberOfLines}
			className={cn("font-zain text-base text-text", className)}
		>
			{children}
		</RNText>
	);
}
