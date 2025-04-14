import { TouchableOpacity, View } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Colors } from "@/constants/Colors";
import { Text } from "@/components/ui/Text";
import { formatDateWithoutHours } from "@/utils/dateUtil";

export function JobDateSelectInput({
	date,
	setDateVisible,
}: {
	date: Date;
	setDateVisible: (visible: boolean) => void;
}) {
	const showDatePicker = () => {
		setDateVisible(true);
	};

	return (
		<View className="w-full">
			<TouchableOpacity
				className="flex-row items-center p-4 bg-[#d9d9d9] rounded-[20] gap-4"
				onPress={showDatePicker}
			>
				<Ionicons
					name="calendar-outline"
					size={26}
					color={Colors.light.muted}
				/>
				<Text className="text-lg text-muted mt-[3]">
					{formatDateWithoutHours(date.toISOString())}
				</Text>
			</TouchableOpacity>
		</View>
	);
}
