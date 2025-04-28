import { TouchableOpacity, View } from "react-native";
import { Colors } from "@/constants/Colors";
import { Text } from "@/components/ui/Text";
import { formatDateWithoutDate } from "@/utils/dateUtil";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";

export function JobTimeSelectInput({
	time,
	setModalVisible,
}: {
	time: Date;
	setModalVisible: (visible: boolean) => void;
}) {
	const showDatePicker = () => {
		setModalVisible(true);
	};

	return (
		<View className="w-full">
			<TouchableOpacity
				className="flex-row items-center p-4 bg-[#d9d9d9] rounded-[20] gap-4"
				onPress={showDatePicker}
			>
				<FontAwesome5 name="clock" size={26} color={Colors.light.muted} />
				<Text className="text-lg text-muted mt-[3]">
					{formatDateWithoutDate(time.toISOString())}
				</Text>
			</TouchableOpacity>
		</View>
	);
}
