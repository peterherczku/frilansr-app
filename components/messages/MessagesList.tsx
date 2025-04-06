import { timeAgo } from "@/utils/dateUtil";
import { Image as ExpoImage } from "expo-image";
import { router } from "expo-router";
import { cssInterop } from "nativewind";
import { FlatList, Pressable, View } from "react-native";
import { Text } from "../ui/Text";

const Image = cssInterop(ExpoImage, {
	className: "style",
});

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
			router.push(`/(messages)/${item.id}`);
		}

		return (
			<Pressable
				onPress={selectMessageChannel}
				className="flex-row gap-[15] items-center"
			>
				<Image
					className={"w-[60] h-[60] rounded-full bg-[#d9d9d9]"}
					source={{ uri: item.profilePicture }}
				/>
				<View>
					<Text className="fotn-zain-bold text-xl">{item.name}</Text>
					<View className="mt-[-7] flex-row gap-[5] items-center">
						<Text numberOfLines={1} className="text-muted text-lg w-[200]">
							{item.lastMessage.text}
						</Text>
						<View className="w-[4] h-[4] rounded-full bg-muted" />
						<Text className="text-muted text-lg">
							{timeAgo(item.lastMessage.date)}
						</Text>
					</View>
				</View>
			</Pressable>
		);
	}

	return (
		<View className="flex-1 mx-[20]">
			<FlatList data={data} renderItem={renderItem} />
		</View>
	);
}
