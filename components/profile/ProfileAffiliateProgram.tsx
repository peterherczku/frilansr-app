import { TouchableOpacity, View } from "react-native";
import { Text } from "../ui/Text";

export function ProfileAffiliateProgram() {
	return (
		<View
			className="p-[15] mx-[20] rounded-lg flex-col gap-[18]"
			style={{
				backgroundColor: "rgba(85, 147, 62, 0.4)",
			}}
		>
			<View>
				<Text className="font-zain-bold text-[17px] ">
					Would you like 0% fees on your next jobs?
				</Text>
				<Text className="mt-[-5] text-sm">
					Invite five of your friends, and start earning together!
				</Text>
			</View>
			<View className="flex-row items-center justify-between">
				<View className="flex-row items-center">
					<View className="relative bg-white w-[140] rounded-lg h-[16]">
						<View className="absolute left-0 top-0 w-[92.4] h-[16] rounded-lg bg-theme"></View>
					</View>
					<Text className="zain-bold text-theme mt-[1.5] ml-[5] text-[17px]">
						3/5
					</Text>
				</View>
				<TouchableOpacity>
					<Text className="font-zain-bold text-theme underline text-[17px]">
						Invite your friends
					</Text>
				</TouchableOpacity>
			</View>
		</View>
	);
}
