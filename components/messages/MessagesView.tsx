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

function getLastSeenMessageId(
	userId: string,
	messages: Message[],
	lastSeenAt?: string
): string {
	if (!lastSeenAt) return "-1";
	const lastSeenAtDate = new Date(lastSeenAt);
	// Copy, filter out future messages, sort descending by sentAt, then take [0]
	return (
		[...messages]
			.filter(
				(msg) =>
					new Date(msg.sentAt).getTime() <= lastSeenAtDate.getTime() &&
					msg.senderId === userId
			)
			.sort(
				(a, b) => new Date(b.sentAt).getTime() - new Date(a.sentAt).getTime()
			)[0]?.id ?? "-1"
	);
}

export function MessagesView({
	conversation,
	messages,
}: {
	conversation: Conversation;
	messages: Message[];
}) {
	const { user } = useUser();
	if (!user) return null;

	const lastSeenId = getLastSeenMessageId(
		user.id,
		messages,
		conversation.partner.lastSeen
	);
	function MessageBubble({ index, item }: { index: number; item: Message }) {
		const isLastInBlock =
			messages.length - 1 == index ||
			messages[index + 1].senderId != item.senderId;
		const isOwn = item.senderId === user?.id;
		const image = isOwn ? user?.imageUrl : conversation.partner.imageUrl;
		const isLastSeen = lastSeenId === item.id;

		return (
			<>
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
				{isLastSeen && (
					<View className="flex-row justify-end items-center gap-[7]">
						<Text className="text-muted text-sm font-zain-bold">Seen</Text>
						<Image
							source={{ uri: conversation.partner.imageUrl }}
							className="w-[20] h-[20] rounded-full"
						/>
					</View>
				)}
			</>
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
