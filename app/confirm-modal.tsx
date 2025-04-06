// app/_modal/confirm.tsx
import {
	RelativePathString,
	useLocalSearchParams,
	useRouter,
} from "expo-router";
import { TouchableOpacity, View } from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { Colors } from "@/constants/Colors";
import { Text } from "@/components/ui/Text";

type ModalParams = {
	message?: string;
	onConfirmCallback?: string;
};
export default function ConfirmModal() {
	const router = useRouter();
	const params = useLocalSearchParams<ModalParams>();

	const message = params.message || "Are you sure you want to proceed?";
	const callbackId = params.onConfirmCallback;

	const handleConfirm = () => {
		if (
			callbackId &&
			global.modalCallbacks &&
			global.modalCallbacks[callbackId]
		) {
			global.modalCallbacks[callbackId]();
			delete global.modalCallbacks[callbackId];
		}
	};

	return (
		<View className="flex-col pt-[30] pb-[30] mt-4 mx-5 justify-center items-center gap-[10]">
			<MaterialIcons
				name="currency-exchange"
				size={80}
				color={Colors.light.themeColor}
			/>
			<Text className="font-zain-extrabold text-3xl">Are you sure?</Text>
			<Text className="text-muted text-lg max-w-[400px]">{message}</Text>
			<TouchableOpacity
				className="p-4 bg-theme w-full mx-4 rounded-lg"
				onPress={handleConfirm}
			>
				<Text className=" text-center text-white text-xl font-zain-bold">
					Yes, I am sure
				</Text>
			</TouchableOpacity>
			<TouchableOpacity
				className="p-4 w-ful rounded-lg"
				onPress={() => router.back()}
			>
				<Text className=" text-center text-theme text-xl font-zain-bold">
					No, stay here
				</Text>
			</TouchableOpacity>
		</View>
	);
}
