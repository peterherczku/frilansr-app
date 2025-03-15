import {
	Dimensions,
	FlatList,
	Pressable,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from "react-native";
import { Image } from "expo-image";
import { useRef, useState } from "react";
import { Colors } from "@/constants/Colors";

const { width } = Dimensions.get("window");

const featuredPlaces = [
	{
		id: 4,
		name: "Take a walk with Max",
		category: "Pets",
		workType: "Dog walking",
		image:
			"https://i.ytimg.com/vi/fa3Slv2i0Uw/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLAWGk8rcsk5pPehDJ-uhCLmw0q9EA",
	},
	{
		id: 0,
		name: "McDonald's",
		category: "Restaurant",
		workType: "Doing dishes",
		image:
			"https://www.eatthis.com/wp-content/uploads/sites/4/2021/06/mcdonalds-2.jpg?quality=82&strip=all",
	},
	{
		id: 1,
		name: "Five Guys",
		category: "Restaurant",
		workType: "Making hamburgers",
		image:
			"https://wp-api.bokabord.se/wp-content/uploads/2024/09/Five-Guys-oppnar-i-Sverige-%E2%80%93-vid-Sergels-torg-i-Stockholm-960x715.png",
	},
	{
		id: 2,
		name: "frilansr.",
		category: "Office",
		workType: "Accounting",
		image:
			"https://www.jll.pt/images/people/people-photography/privacy-in-the-open-plan-office.jpg",
	},
	{
		id: 3,
		name: "After school tutoring",
		category: "Education",
		workType: "Math teaching",
		image:
			"https://s39613.pcdn.co/wp-content/uploads/2021/11/day-picture-id1163588010.jpg",
	},
];

export function FeaturedCarousel() {
	const [activeItem, setActiveItem] = useState(0);

	function renderItem({ item, index }) {
		return (
			<Pressable style={styles.box}>
				<Image source={{ uri: item.image }} style={styles.image} />
				<View style={styles.detailsContainer}>
					<Text style={[styles.text, styles.nameText]}>{item.name}</Text>
					<Text style={[styles.text, styles.workText]}>{item.workType}</Text>
				</View>
				<View style={styles.overlay} />
				<Text style={[styles.text, styles.category]}>{item.category}</Text>
			</Pressable>
		);
	}

	return (
		<View style={styles.container}>
			<FlatList
				data={featuredPlaces}
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
				{featuredPlaces.map((item, index) => {
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
