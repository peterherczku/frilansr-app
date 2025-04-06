import { FlatList, Pressable, TouchableOpacity, View } from "react-native";
import { ReactNode } from "react";
import { Image as ExpoImage } from "expo-image";
import { Colors } from "@/constants/Colors";
import { AntDesign, FontAwesome6 } from "@expo/vector-icons";
import { router } from "expo-router";
import { Listing } from "@/api/listingFunctions";
import { Skeleton } from "@/components/ui/Skeleton";
import { cn } from "@/utils/cn";
import { cssInterop, remapProps } from "nativewind";
import { Text } from "../ui/Text";

const CustomAntDesign = cssInterop(AntDesign, {
	className: "style",
});

const Image = cssInterop(ExpoImage, {
	className: "style",
});

export function ListingPresenterSkeleton() {
	return (
		<View>
			<FlatList
				data={[1, 2, 3]}
				renderItem={({ item, index }) => (
					<Skeleton
						className={cn(
							"m-[10]",
							index === 0 && "ml-[20]",
							index === 2 && "mr-[20]"
						)}
						width={220}
						height={220 * 0.6}
					/>
				)}
				horizontal={true}
				showsHorizontalScrollIndicator={false}
			/>
		</View>
	);
}

export function ListingPresenterTitle({ children }: { children: ReactNode }) {
	return (
		<View className="flex-row justify-between items-center mx-[20]">
			{children}
			<TouchableOpacity
				onPress={() => router.navigate("/(worker)/(tabs)/jobs")}
				className="flex-row justify-between items-center mx-[20]"
			>
				<Text className="text-xl text-theme underline">Show all</Text>
				<CustomAntDesign
					name="arrowright"
					size={20}
					className="ml-[6] mr-[-15]"
					color={Colors.light.themeColor}
				/>
			</TouchableOpacity>
		</View>
	);
}

export function ListingPresenterElements({ data }: { data: Listing[] }) {
	function renderItem({ item, index }: { item: Listing; index: number }) {
		return (
			<Pressable
				className={cn(
					"flex-col mx-5 relative",
					index === 0 && "ml-[20]",
					index === data.length - 1 && "mr-[20]"
				)}
				onPress={() => router.push(`/(worker)/(listing)/${item.id}`)}
			>
				<Image
					className="rounded-t-lg"
					width={220}
					height={220 * 0.6}
					source={{ uri: item.image }}
				/>
				<View
					className="rounded-t-lg absolute w-[220] h-[132]"
					style={{ backgroundColor: "rgba(0,0,0,0.35)" }}
				/>
				<View className="pl-[10] pt-[6] rounded-b-lg bg-white shadow-custom overflow-visible pb-[5]">
					<View className="pb-[6]">
						<Text className="text-muted text-[13px] font-zain-extrabold">
							{/*item.workplace*/}
						</Text>
						<Text className="mt-[-6] text-[17px] font-zain-bold">
							{item.title}
						</Text>
					</View>
					<View className="pt-[8] border-t-[1] border-dashed border-muted flex-row gap-[8] items-center">
						<View className="flex-row items-center gap-[5]">
							<FontAwesome6
								name="sack-dollar"
								size={10}
								color={Colors.light.muted}
							/>
							<Text className="text-muted text-[13px] font-zain-bold">
								{item.salary}
							</Text>
						</View>
						<View className="w-[5] h-[5] rounded-full bg-muted" />
						<View className="flex-row items-center gap-[5]">
							<FontAwesome6
								name="location-dot"
								size={10}
								color={Colors.light.muted}
							/>
							<Text className="text-[13px] text-muted font-zain-bold">
								{/*item.location*/}
							</Text>
						</View>
					</View>
				</View>
			</Pressable>
		);
	}

	return (
		<View>
			<FlatList
				style={{ paddingBottom: 10 }}
				data={data}
				renderItem={renderItem}
				horizontal={true}
				showsHorizontalScrollIndicator={false}
			/>
		</View>
	);
}

export function ListingPresenter({
	className,
	children,
}: {
	className?: string;
	children: ReactNode;
}) {
	return <View className={cn("flex-col gap-[20]", className)}>{children}</View>;
}
