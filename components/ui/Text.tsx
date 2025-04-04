import { cn } from "@/utils/cn";
import { ReactNode } from "react";
import { Text as RNText } from "react-native";

export function Text({
	className,
	children,
}: {
	className?: string;
	children?: ReactNode;
}) {
	return (
		<RNText className={cn("font-zain text-base text-text", className)}>
			{children}
		</RNText>
	);
}
