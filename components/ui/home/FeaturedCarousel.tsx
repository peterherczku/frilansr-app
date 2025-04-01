import {
	Dimensions,
	FlatList,
	Pressable,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
	ViewBase,
} from "react-native";
import { Image } from "expo-image";
import { useRef, useState } from "react";
import { Colors } from "@/constants/Colors";
import { router, useRouter } from "expo-router";
import { useFeaturedListings } from "@/hooks/listing/useFeaturedListings";
import { Listing } from "@/api/listingFunctions";
import { Skeleton } from "@/components/Skeleton";

const { width } = Dimensions.get("window");

function CarouselSkeleton() {
	return (
		<Skeleton
			style={{ marginVertical: 20, marginHorizontal: 20 }}
			width={width - 40}
			height={200}
		/>
	);
}

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
				style={styles.box}
			>
				<Image source={{ uri: item.image }} style={styles.image} />
				<View style={styles.detailsContainer}>
					<Text style={[styles.text, styles.nameText]}>{item.title}</Text>
					<Text style={[styles.text, styles.workText]}>{item.type}</Text>
				</View>
				<View style={styles.overlay} />
				<Text style={[styles.text, styles.category]}>{item.description}</Text>
			</Pressable>
		);
	}

	return (
		<View style={styles.container}>
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
			<View style={styles.pagesContainer}>
				{featuredListings.map((item, index) => {
					return (
						<View
							key={item.id}
							style={
								item.id === activeItem ? styles.activePage : styles.inactivePage
							}
						></View>
					);
				})}
			</View>
		</View>
	);
}
const styles = StyleSheet.create({
	container: {
		marginVertical: 20,
	},
	box: {
		marginHorizontal: 20,
		position: "relative",
		width: width - 40,
	},
	image: {
		width: "100%",
		height: 200,
		borderRadius: 8,
	},
	overlay: {
		position: "absolute",
		width: "100%",
		height: 200,
		backgroundColor: "rgba(0,0,0,0.5)",
		borderRadius: 8,
	},
	text: {
		fontFamily: "Zain",
		fontSize: 16,
	},
	category: {
		zIndex: 5,
		position: "absolute",
		top: 10,
		left: 10,
		color: "#C1C1C1",
		fontFamily: "Zain-ExtraBold",
		fontSize: 13,
		textTransform: "uppercase",
	},
	detailsContainer: {
		zIndex: 5,
		position: "absolute",
		bottom: 10,
		left: 10,
	},
	nameText: {
		fontFamily: "Zain-Bold",
		color: "#fff",
		fontSize: 20,
	},
	workText: {
		fontFamily: "Zain",
		color: "#fff",
		fontSize: 14,
		marginTop: -10,
	},
	pagesContainer: {
		marginTop: 10,
		flexDirection: "row",
		gap: 6,
		alignItems: "center",
		justifyContent: "center",
	},
	activePage: {
		width: 13,
		height: 13,
		borderRadius: 50,
		backgroundColor: Colors.light.text,
	},
	inactivePage: {
		width: 13,
		height: 13,
		borderRadius: 50,
		backgroundColor: "#D9D9D9",
	},
});
