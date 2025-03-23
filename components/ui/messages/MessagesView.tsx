import { Colors } from "@/constants/Colors";
import { useUser } from "@clerk/clerk-expo";
import { Image } from "expo-image";
import { Dimensions, FlatList, StyleSheet, Text, View } from "react-native";

type Message = {
	text: string;
	user: {
		id: string;
		name: string;
		imageUrl: string;
	};
	date: number;
};

export function MessagesView({ messages }: { messages: Message[] }) {
	const { user } = useUser();

	function MessageBubble({ index, item }: { index: number; item: Message }) {
		const isLastInBlock =
			messages.length - 1 == index ||
			messages[index + 1].user.id != item.user.id;
		const isOwn = item.user.id === user?.id;

		return (
			<View
				style={{
					flexDirection: "row",
					alignItems: "flex-end",
					marginVertical: 5,
				}}
			>
				{isLastInBlock && !isOwn && (
					<Image
						source={{ uri: item.user.imageUrl }}
						style={{
							width: 40,
							height: 40,
							borderRadius: 40,
							backgroundColor: "#D9D9D9",
						}}
					/>
				)}

				<View
					style={[
						styles.bubble,
						isOwn && {
							backgroundColor: Colors.light.themeColor,
							marginLeft: "auto",
						},
						!isLastInBlock &&
							!isOwn && {
								marginLeft: 50,
							},
					]}
				>
					<Text
						style={[
							styles.text,
							isOwn && {
								color: "white",
							},
						]}
					>
						{item.text}
					</Text>
				</View>
			</View>
		);
	}

	return (
		<View
			style={{
				flex: 1,
				backgroundColor: "white",
				flexDirection: "column",
				justifyContent: "flex-end",
				margin: 20,
			}}
		>
			<FlatList
				contentContainerStyle={{
					flex: 1,
					justifyContent: "flex-end",
					flexDirection: "column",
				}}
				data={messages}
				renderItem={MessageBubble}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	text: {
		fontFamily: "Zain",
		fontSize: 16,
		color: Colors.light.text,
	},
	bubble: {
		backgroundColor: "#EFEFEF",
		padding: 10,
		maxWidth: Dimensions.get("window").width * 0.65,
		borderRadius: 8,
		marginLeft: 10,
		flexDirection: "row",
	},
});
