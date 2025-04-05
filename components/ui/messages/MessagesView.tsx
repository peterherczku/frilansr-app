import { cn } from "@/utils/cn";
import { useUser } from "@clerk/clerk-expo";
import { Image as ExpoImage } from "expo-image";
import { remapProps } from "nativewind";
import { FlatList as RNFlatList, Text, View } from "react-native";

type Message = {
	text: string;
	user: {
		id: string;
		name: string;
		imageUrl: string;
	};
	date: number;
};

const Image = remapProps(ExpoImage, {
	className: "style",
});

const FlatList = remapProps(RNFlatList, {
	contentContainerClassName: "contentContainerStyle",
}) as <T>(props: React.ComponentProps<typeof RNFlatList<T>>) => JSX.Element;

export function MessagesView({ messages }: { messages: Message[] }) {
	const { user } = useUser();

	function MessageBubble({ index, item }: { index: number; item: Message }) {
		const isLastInBlock =
			messages.length - 1 == index ||
			messages[index + 1].user.id != item.user.id;
		const isOwn = item.user.id === user?.id;

		return (
			<View className="flex-row items-end my-[5]">
				{isLastInBlock && !isOwn && (
					<Image
						source={{ uri: item.user.imageUrl }}
						className="w-[40] h-[40] rounded-full bg-[#d9d9d9]"
					/>
				)}

				<View
					className={cn(
						"bg-[#efefef] px-[10] rounded-lg ml-[10] flex-row",
						isOwn && "bg-theme ml-auto",
						!isLastInBlock && !isOwn && "ml-[50]"
					)}
				>
					<Text className={cn(isOwn && "text-white")}>{item.text}</Text>
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
