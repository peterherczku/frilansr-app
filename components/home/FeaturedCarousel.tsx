import { Dimensions, FlatList, Pressable, View } from "react-native";
import { Image as ExpoImage } from "expo-image";
import { useState } from "react";
import { useRouter } from "expo-router";
import { useFeaturedListings } from "@/hooks/listing/useFeaturedListings";
import { Listing } from "@/api/listingFunctions";
import { Skeleton } from "@/components/ui/Skeleton";
import { Text } from "../ui/Text";
import { cssInterop } from "nativewind";

const { width } = Dimensions.get("window");

function CarouselSkeleton() {
	return (
		<Skeleton className="my-[20] mx-[20]" width={width - 40} height={200} />
	);
}

const Image = cssInterop(ExpoImage, {
	className: "style",
});

export function FeaturedCarousel() {
	const [activeItem, setActiveItem] = useState("0");
	const router = useRouter();
	const { featuredListings, isLoading, error } = useFeaturedListings();

	if (isLoading) {
		return <CarouselSkeleton />;
	}
	if (error || !featuredListings) {
		return (
			<View>
				<Text>Error {error?.message}</Text>
			</View>
		);
	}

	function renderItem({ item }: { item: Listing }) {
		return (
			<Pressable
				onPress={() => router.push(`/(listing)/${item.id}`)}
				className="mx-[20] relative"
				style={{
					width: width - 40,
				}}
			>
				<Image
					source={{ uri: item.image }}
					className="w-full h-[200] rounded-lg"
				/>
				<View className="z-[5] absolute bottom-[10] left-[10] z-[2]">
					<Text className="text-xl font-zain-bold text-white">
						{item.title}
					</Text>
					<Text className="mt-[-10] text-white text-sm">{item.type}</Text>
				</View>
				<View
					className="w-full h-[200] absolute rounded-lg z-[1]"
					style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
				/>
				<Text className="z-[2] absolute top-[10] left-[10] text-[#c1c1c1] font-zain-extrabold uppercase">
					{item.description}
				</Text>
			</Pressable>
		);
	}

	return (
		<View className="my-[20]">
			<FlatList
				data={featuredListings}
				renderItem={renderItem}
				keyExtractor={(item) => item.id.toString()}
				horizontal={true}
				showsHorizontalScrollIndicator={false}
				pagingEnabled={true}
				onViewableItemsChanged={({ viewableItems }) => {
					if (viewableItems[0]) {
						const activeId = viewableItems[0].item.id;
						setActiveItem(activeId);
					}
				}}
			/>
			<View className="mt-[10] flex-row gap-[6] items-center justify-center">
				{featuredListings.map((item, index) => {
					return (
						<View
							key={item.id}
							className={`w-[13] h-[13] rounded-full " ${
								item.id === activeItem ? "bg-text" : "bg-[#D9D9D9]"
							}`}
						></View>
					);
				})}
			</View>
		</View>
	);
}
