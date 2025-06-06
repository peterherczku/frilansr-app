import { timeAgo } from "@/utils/dateUtil";
import { Image as ExpoImage } from "expo-image";
import { router } from "expo-router";
import { cssInterop } from "nativewind";
import { FlatList, Pressable, View } from "react-native";
import { Text } from "../ui/Text";
import { RecentConversation } from "@/api/messageFunctions";
import { useUser } from "@clerk/clerk-expo";

const Image = cssInterop(ExpoImage, {
	className: "style",
});

export function MessagesList({ data }: { data: RecentConversation[] }) {
	const { user } = useUser();
	function renderItem({ item }: { item: RecentConversation }) {
		function selectMessageChannel() {
			router.push(`/messages/${item.id}`);
		}

		return (
			<Pressable
				onPress={selectMessageChannel}
				className="flex-row gap-[15] items-center"
			>
				<Image
					className={"w-[60] h-[60] rounded-full bg-[#d9d9d9]"}
					source={{ uri: item.partner.imageUrl }}
				/>
				<View>
					<Text className="fotn-zain-bold text-xl">{item.partner.name}</Text>
					{item.lastMessage && (
						<View className="mt-[-7] flex-row gap-[8] items-center">
							<View className="flex-row items-center gap-[4]">
								{item.lastMessage.senderId === user?.id && (
									<Text className="text-muted text-lg">You:</Text>
								)}
								<Text
									numberOfLines={1}
									className="text-muted text-lg max-w-[120]"
								>
									{item.lastMessage.content}
								</Text>
							</View>
							<View className="w-[4] h-[4] rounded-full bg-muted" />
							<Text className="text-muted text-lg">
								{timeAgo(new Date(item.lastMessage.sentAt))}
							</Text>
						</View>
					)}
				</View>
			</Pressable>
		);
	}

	return (
		<View className="flex-1 mx-[20]">
			<FlatList
				contentContainerClassName="gap-[15]"
				data={data}
				renderItem={renderItem}
			/>
		</View>
	);
}
