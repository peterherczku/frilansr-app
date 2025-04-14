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
import {
	CreateListingPageType,
	getPreviousPage,
} from "@/utils/createListingUtil";
import { ZodIssue } from "zod";

export function CreateListingErrors({ errors }: { errors: ZodIssue[] }) {
	return errors.map((error) => (
		<Text key={error.code + error.message} className="text-red-500">
			{error.message}
		</Text>
	));
}

export function CreateListingFooter({
	onSubmit,
	isLoading,
}: {
	isLoading: boolean;
	onSubmit: () => Promise<any>;
}) {
	return (
		<TouchableOpacity
			onPress={onSubmit}
			disabled={isLoading}
			className="w-full bg-theme rounded-[20] flex-row items-center justify-center py-[12] mt-[20] disabled:opacity-50"
		>
			<Text className="text-white font-zain-bold text-lg">Continue</Text>
		</TouchableOpacity>
	);
}

export function CreateListingSubtitle({ children }: { children: string }) {
	return (
		<Text className="text-lg text-muted leading-[20px] mt-[-3] w-[90%]">
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
	onSubmit,
	children,
	isLoading,
	scrollable = true,
}: {
	onSubmit: () => Promise<any>;
	children: React.ReactNode;
	isLoading: boolean;
	scrollable?: boolean;
}) {
	return (
		<KeyboardAvoidingView
			behavior={Platform.OS === "ios" ? "padding" : "height"}
			className="flex-col flex-1 bg-white rounded-[40] p-[25]"
		>
			<View className="flex-col flex-1 justify-between">
				{scrollable && (
					<ScrollView
						nestedScrollEnabled={true}
						contentContainerStyle={{ gap: 10 }}
					>
						{children}
					</ScrollView>
				)}
				{!scrollable && <View className="flex-col gap-[10]">{children}</View>}
				<View className="pb-[30]">
					<CreateListingFooter isLoading={isLoading} onSubmit={onSubmit} />
				</View>
			</View>
		</KeyboardAvoidingView>
	);
}

export function CreateListingHeader({
	currentPage,
	done,
	max,
}: {
	currentPage: CreateListingPageType;
	done: number;
	max: number;
}) {
	const width = 24 * done + 16 * (done - 1) + 8;

	function back() {
		const page = getPreviousPage(currentPage);
		if (page === "HOME") {
			router.replace("/(lister)/");
			return;
		}
		router.replace(`/(lister)/(create-listing)/${page}`);
	}

	function CheckedBox() {
		return (
			<View className="h-[24] w-[24] bg-theme border-4 border-solid border-theme rounded-full flex-row items-center justify-center">
				<Feather name="check" size={16} color="white" />
			</View>
		);
	}

	function UncheckedBox() {
		return (
			<View className="h-[16] w-[16] bg-[#F2F2F2] border-4 border-solid border-[#9BBA90] rounded-full flex-row items-center justify-between" />
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
						className="left-0 absolute z-[-1] h-[4] bg-theme"
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
