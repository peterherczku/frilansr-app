import { Colors } from "@/constants/Colors";
import { timeAgo } from "@/utils/dateUtil";
import { Image } from "expo-image";
import { router } from "expo-router";
import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";

export function MessagesList({
	data,
}: {
	data: {
		id: number;
		name: string;
		profilePicture: string;
		lastMessage: {
			text: string;
			date: number;
		};
	}[];
}) {
	function renderItem({
		item,
	}: {
		item: {
			id: number;
			profilePicture: string;
			name: string;
			lastMessage: {
				text: string;
				date: number;
			};
		};
	}) {
		function selectMessageChannel() {
			router.push("(messages)/" + item.id);
		}

		return (
			<Pressable onPress={selectMessageChannel} style={styles.box}>
				<Image style={styles.image} source={{ uri: item.profilePicture }} />
				<View>
					<Text
						style={[styles.text, { fontFamily: "Zain-Bold", fontSize: 20 }]}
					>
						{item.name}
					</Text>
					<View
						style={{
							marginTop: -7,
							flexDirection: "row",
							gap: 5,
							alignItems: "center",
						}}
					>
						<Text
							numberOfLines={1}
							style={[
								styles.text,
								{
									width: 200,
									color: Colors.light.muted,
								},
							]}
						>
							{item.lastMessage.text}
						</Text>
						<View
							style={{
								backgroundColor: Colors.light.muted,
								width: 4,
								height: 4,
								borderRadius: 10,
							}}
						/>
						<Text
							style={[
								styles.text,
								{
									color: Colors.light.muted,
								},
							]}
						>
							{timeAgo(item.lastMessage.date)}
						</Text>
					</View>
				</View>
			</Pressable>
		);
	}

	return (
		<View style={{ flex: 1, marginHorizontal: 20 }}>
			<FlatList data={data} renderItem={renderItem} />
		</View>
	);
}

const styles = StyleSheet.create({
	text: {
		color: Colors.light.text,
		fontSize: 18,
		fontFamily: "Zain",
	},
	box: {
		flexDirection: "row",
		gap: 15,
		alignItems: "center",
	},
	image: {
		width: 60,
		height: 60,
		borderRadius: 60,
		backgroundColor: "#D9D9D9",
	},
});
