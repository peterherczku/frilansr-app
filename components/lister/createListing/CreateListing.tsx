import { Text } from "@/components/ui/Text";
import { Colors } from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import {
	KeyboardAvoidingView,
	Platform,
	ScrollView,
	TouchableOpacity,
	View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Feather from "@expo/vector-icons/Feather";
import { ReactNode } from "react";

export function CreateListingFooter({
	route,
}: {
	route: `/(lister)/(create-listing)/${string}`;
}) {
	return (
		<TouchableOpacity
			onPress={() => router.push(route)}
			className="w-full bg-theme rounded-[20] flex-row items-center justify-center py-[12] mt-[20]"
		>
			<Text className="text-white font-zain-bold text-lg">Continue</Text>
		</TouchableOpacity>
	);
}

export function CreateListingSubtitle({ children }: { children: string }) {
	return (
		<Text className="text-lg text-muted leading-[20px] mt-[-3] w-[80%]">
			{children}
		</Text>
	);
}

export function CreateListingTitle({ children }: { children: string }) {
	return <Text className="text-[30px] font-zain-bold">{children}</Text>;
}

export function CreateListingSubheader({
	children,
	current,
	max,
}: {
	children: ReactNode;
	current: number;
	max: number;
}) {
	return (
		<View className="flex-col">
			<Text className="text-theme text-lg">
				step {current} out of {max}
			</Text>
			{children}
		</View>
	);
}

export function CreateListingBody({
	nextRoute,
	children,
}: {
	nextRoute: `/(lister)/(create-listing)/${string}`;
	children: React.ReactNode;
}) {
	return (
		<KeyboardAvoidingView
			behavior={Platform.OS === "ios" ? "padding" : "height"}
			className="flex-col flex-1 bg-white rounded-[40] p-[25]"
		>
			<View className="flex-col flex-1 justify-between">
				<ScrollView contentContainerStyle={{ gap: 10 }}>{children}</ScrollView>
				<View className="pb-[30]">
					<CreateListingFooter route={nextRoute} />
				</View>
			</View>
		</KeyboardAvoidingView>
	);
}

export function CreateListingHeader({
	done,
	max,
}: {
	done: number;
	max: number;
}) {
	const width = 28 * done + 16 * (done - 1);

	function back() {
		router.back();
	}

	function CheckedBox() {
		return (
			<View className="h-[28] w-[28] bg-theme border-4 border-solid border-theme rounded-full flex-row items-center justify-center">
				<Feather name="check" size={20} color="white" />
			</View>
		);
	}

	function UncheckedBox() {
		return (
			<View className="h-[28] w-[28] bg-[#F2F2F2] border-4 border-solid border-[#9BBA90] rounded-full flex-row items-center justify-between" />
		);
	}

	return (
		<View className="flex-col gap-[20px] mx-[20] mb-[20]">
			<View className="flex-row justify-between items-center">
				<View className="flex-row gap-[6] items-center">
					<TouchableOpacity onPress={back}>
						<Ionicons name="chevron-back" size={30} color={Colors.light.text} />
					</TouchableOpacity>
					<Text className="text-2xl font-zain-bold">Create listing</Text>
				</View>
				<TouchableOpacity>
					<Ionicons name="close-outline" size={30} color={Colors.light.text} />
				</TouchableOpacity>
			</View>
			<View className="flex-row justify-center items-center w-full">
				<View className="flex-row items-center justify-center gap-[16]">
					{Array.from({ length: done }, (_, index) => (
						<CheckedBox key={"done_" + index} />
					))}
					{Array.from({ length: max - done }, (_, index) => (
						<UncheckedBox key={"not_done_" + index} />
					))}
					<View
						className="left-0 absolute z-[-1] h-[2] bg-theme"
						style={{ width: width }}
					/>
					<View className="right-0 w-full absolute z-[-2] h-[4] bg-[#9BBA90]" />
				</View>
			</View>
		</View>
	);
}

export function CreateListingContainer({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<SafeAreaView edges={["top"]} className="flex-1 bg-[#F2F2F2]">
			{children}
		</SafeAreaView>
	);
}
