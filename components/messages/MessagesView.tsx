import { cn } from "@/utils/cn";
import { useUser } from "@clerk/clerk-expo";
import { Image as ExpoImage } from "expo-image";
import { cssInterop, remapProps } from "nativewind";
import { Dimensions, FlatList as RNFlatList, View } from "react-native";
import { Text } from "../ui/Text";
import { Conversation, Message } from "@/api/messageFunctions";

const Image = cssInterop(ExpoImage, {
	className: "style",
});

const FlatList = cssInterop(RNFlatList, {
	contentContainerClassName: "contentContainerStyle",
}) as <T>(props: React.ComponentProps<typeof RNFlatList<T>>) => JSX.Element;

export function MessagesView({
	conversation,
	messages,
}: {
	conversation: Conversation;
	messages: Message[];
}) {
	const { user } = useUser();

	function MessageBubble({ index, item }: { index: number; item: Message }) {
		const isLastInBlock =
			messages.length - 1 == index ||
			messages[index + 1].senderId != item.senderId;
		const isOwn = item.senderId === user?.id;
		const image = isOwn ? user?.imageUrl : conversation.partner.imageUrl;

		return (
			<View className="flex-row items-end my-[5]">
				{isLastInBlock && !isOwn && (
					<Image
						source={{ uri: image }}
						className="w-[40] h-[40] rounded-full bg-[#d9d9d9]"
					/>
				)}

				<View
					className={cn(
						"bg-[#efefef] p-[10] rounded-lg ml-[10] flex-row",
						isOwn && "bg-theme ml-auto",
						!isLastInBlock && !isOwn && "ml-[50]"
					)}
					style={{ maxWidth: Dimensions.get("window").width * 0.65 }}
				>
					<Text className={cn(isOwn && "text-white")}>{item.content}</Text>
				</View>
			</View>
		);
	}

	return (
		<View className="flex-1 bg-white flex-col justify-end m-[20]">
			<FlatList
				contentContainerClassName="flex-1 justify-end flex-col"
				data={messages}
				renderItem={({ item, index }) => (
					<MessageBubble item={item} index={index} />
				)}
			/>
		</View>
	);
}
