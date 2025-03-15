import { Footer } from "@/components/Footer";
import { Colors } from "@/constants/Colors";
import { FontAwesome6 } from "@expo/vector-icons";
import { Image } from "expo-image";
import {
	FlatList,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from "react-native";

const urgentWorkData = [
	{
		id: 0,
		title: "Walk with Max",
		category: "Dog walking",
		duration: "40 min",
		salary: "120 kr",
		location: "Östermalm",
		image:
			"https://www.evolution-design.info/var/site/storage/images/evolution-design/all-projects/commercial/google-dublin/13285-1-eng-GB/google-dublin_i1920.jpg",
	},
	{
		id: 1,
		title: "Accounting",
		category: "Offices",
		duration: "1 hour",
		salary: "1200 kr",
		location: "Norrmalm",
		image:
			"https://media.istockphoto.com/id/1386939001/photo/young-man-and-his-dog-walking-on-a-rainy-day.jpg?s=612x612&w=0&k=20&c=hBBYAnrNcu2h16UwaO4k9ePC7u0mUYfoIZgdc_BJ-Ws=",
	},
];

export function SearchUrgentWorks() {
	function renderItem({
		item,
	}: {
		item: {
			id: number;
			title: string;
			category: string;
			duration: string;
			salary: string;
			location: string;
			image: string;
		};
	}) {
		return (
			<TouchableOpacity style={styles.card}>
				<View style={styles.imageContainer}>
					<Image source={{ uri: item.image }} style={styles.image} />
					<View style={styles.imageOverlay} />
					<View style={styles.label}>
						<Text
							style={[styles.text, { fontFamily: "Zain-Bold", fontSize: 18 }]}
						>
							Urgent work
						</Text>
					</View>
				</View>
				<View style={{ padding: 8 }}>
					<Text
						style={[styles.text, { fontSize: 20, fontFamily: "Zain-Bold" }]}
					>
						{item.title}
					</Text>
					<Text
						style={[styles.text, { marginTop: -8, color: Colors.light.muted }]}
					>
						{item.category}
					</Text>
					<View style={[styles.row]}>
						<View style={[styles.row]}>
							<FontAwesome6
								name="sack-dollar"
								size={12}
								color={Colors.light.muted}
							/>
							<Text style={[styles.text, styles.detailText]}>
								{item.salary}
							</Text>
						</View>
						<View style={styles.separator} />
						<View style={[styles.row]}>
							<FontAwesome6 name="clock" size={12} color={Colors.light.muted} />
							<Text style={[styles.text, styles.detailText]}>
								{item.duration}
							</Text>
						</View>
						<View style={styles.separator} />
						<View style={[styles.row]}>
							<FontAwesome6
								name="map-location-dot"
								size={12}
								color={Colors.light.muted}
							/>
							<Text style={[styles.text, styles.detailText]}>
								{item.location}
							</Text>
						</View>
					</View>
				</View>
			</TouchableOpacity>
		);
	}

	return (
		<View style={{ flex: 1 }}>
			<FlatList
				showsVerticalScrollIndicator={false}
				data={urgentWorkData}
				renderItem={renderItem}
				keyExtractor={(item) => item.id.toString()}
				scrollEnabled={true}
				ListFooterComponent={<View style={{ marginBottom: 50 }} />}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	card: {
		backgroundColor: "white",
		elevation: 2,
		shadowOffset: {
			width: 1,
			height: 2,
		},
		shadowRadius: 2,
		shadowOpacity: 0.2,
		marginBottom: 20,
		marginHorizontal: 2,
		borderRadius: 8,
	},
	imageContainer: {
		position: "relative",
	},
	image: {
		flex: 1,
		height: 200,
		borderTopLeftRadius: 8,
		borderTopRightRadius: 8,
	},
	imageOverlay: {
		position: "absolute",
		top: 0,
		left: 0,
		width: "100%",
		height: 200,
		backgroundColor: "rgba(0,0,0,0.4)",
		zIndex: 10,
		borderTopLeftRadius: 8,
		borderTopRightRadius: 8,
	},
	label: {
		position: "absolute",
		zIndex: 15,
		bottom: 10,
		left: 10,
		backgroundColor: "rgba(255, 255, 255, 0.7)",
		paddingVertical: 5,
		paddingHorizontal: 15,
		borderRadius: 6,
	},
	text: {
		color: Colors.light.text,
		fontFamily: "Zain",
		fontSize: 16,
	},
	row: {
		flexDirection: "row",
		alignItems: "center",
		gap: 5,
	},
	detailText: {
		color: Colors.light.muted,
	},
	separator: {
		width: 4,
		height: 4,
		borderRadius: 80,
		backgroundColor: Colors.light.muted,
	},
});
