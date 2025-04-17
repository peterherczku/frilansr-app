import { Colors } from "@/constants/Colors";
import { MaterialIcons } from "@expo/vector-icons";
import { TouchableOpacity, View } from "react-native";
import { Text } from "./Text";

export default function ProfileAreYouSureModal({
	handleConfirm,
	message,
	close,
}: {
	handleConfirm: () => Promise<void>;
	message: string;
	close: () => void;
}) {
	return (
		<View className="justify-center items-center flex-1 mx-4">
			<View className="flex-col mx-4 justify-center items-center gap-[10] w-full">
				<MaterialIcons
					name="currency-exchange"
					size={80}
					color={Colors.light.themeColor}
				/>
				<Text className="font-zain-extrabold text-3xl">Are you sure?</Text>
				<Text className="text-muted text-lg max-w-[400px] text-justify">
					{message}
				</Text>
				<TouchableOpacity
					className="p-4 bg-theme w-full rounded-lg"
					onPress={async () => {
						await handleConfirm();
						close();
					}}
				>
					<Text className=" text-center text-white text-xl font-zain-bold">
						Yes, I am sure
					</Text>
				</TouchableOpacity>
				<TouchableOpacity
					className="p-4 rounded-lg w-full"
					onPress={() => {
						close();
					}}
				>
					<Text className=" text-center text-theme text-xl font-zain-bold">
						No, stay here
					</Text>
				</TouchableOpacity>
			</View>
		</View>
	);
}
