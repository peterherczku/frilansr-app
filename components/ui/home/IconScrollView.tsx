import {
	FlatList,
	ScrollView,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from "react-native";
import {
	FontAwesome5,
	Foundation,
	MaterialCommunityIcons,
} from "@expo/vector-icons";

const categories = [
	{
		id: 0,
		name: "Restaurants",
		icon: <MaterialCommunityIcons name="hamburger" size={40} color="black" />,
	},
	{
		id: 1,
		name: "Offices",
		icon: (
			<MaterialCommunityIcons name="office-building" size={40} color="black" />
		),
	},
	{
		id: 2,
		name: "Education",
		icon: <FontAwesome5 name="graduation-cap" size={40} color="black" />,
	},
	{
		id: 3,
		name: "Pets",
		icon: <Foundation name="guide-dog" size={40} color="black" />,
	},
	{
		id: 4,
		name: "From home",
		icon: <FontAwesome5 name="laptop-house" size={35} color="black" />,
	},
];

export function IconScrollView({}) {
	function renderItem({ item, index }) {
		return (
			<TouchableOpacity
				style={[
					styles.element,
					index === 0 && styles.marginLeft,
					index === categories.length - 1 && styles.marginRight,
				]}
			>
				<View style={styles.box}>{item.icon}</View>
				<Text style={[styles.text]}>{item.name}</Text>
			</TouchableOpacity>
		);
	}

	return (
		<View>
			<FlatList
				showsHorizontalScrollIndicator={false}
				keyExtractor={(item) => item.id.toString()}
				horizontal={true}
				data={categories}
				renderItem={renderItem}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	element: {
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
		marginHorizontal: 5,
	},
	box: {
		width: 80,
		height: 80,
		borderRadius: 8,
		backgroundColor: "#D9D9D9",
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
	},
	text: {
		fontFamily: "Zain",
		fontSize: 16,
	},
	marginLeft: {
		marginLeft: 20,
	},
	marginRight: {
		marginRight: 20,
	},
});
