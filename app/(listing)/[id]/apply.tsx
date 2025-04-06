import { LocationMapView } from "@/components/listing/LocationBox";
import { Text } from "@/components/ui/Text";
import { Colors } from "@/constants/Colors";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import { cssInterop } from "nativewind";
import { ScrollView, TouchableOpacity, View } from "react-native";
import { SafeAreaView as RNSafeAreView } from "react-native-safe-area-context";

const SafeAreaView = cssInterop(RNSafeAreView, {
	className: "style",
});

export default function ApplyForJobPage() {
	return (
		<SafeAreaView className="flex-1 bg-white">
			<View className="mx-[20] flex-row gap-[6] items-center">
				<TouchableOpacity onPress={() => router.back()}>
					<Ionicons name="chevron-back" size={30} color={Colors.light.text} />
				</TouchableOpacity>
				<Text className="text-2xl font-zain-bold">Apply for the job</Text>
			</View>
			<ScrollView className="my-[20] flex-1">
				<View className="mx-[20] my-[10]">
					<View className="py-[5] flex-row items-center justify-between">
						<Text className="text-2xl font-zain-bold">
							Take a walk with Max
						</Text>
					</View>
					<View className="py-[5] flex-row items-center justify-between">
						<Text className="text-lg">Salary</Text>
						<Text className="text-lg font-zain-bold">180,00 kr</Text>
					</View>
					<View className="py-[5] flex-row items-center justify-between">
						<Text className="text-lg">Date</Text>
						<Text className="text-lg font-zain-bold">
							Monday at 13:00 - 13:40
						</Text>
					</View>
					<View className="py-[5] flex-row items-center justify-between">
						<Text className="text-lg">Duration</Text>
						<Text className="text-lg font-zain-bold">30 - 40 minutes</Text>
					</View>
					<View className="py-[5] flex-row items-center justify-between">
						<Text className="text-lg">Location</Text>
						<Text className="text-lg font-zain-bold">
							Gamla stan, 5 km away
						</Text>
					</View>
				</View>
				<View className="my-[10] gap-[10]">
					<Text className="text-2xl font-zain-bold mx-[20]">Payout</Text>
					<TouchableOpacity
						onPress={() => router.push("/(settings)/(payment)/payment")}
						className="mx-[20] px-[16] py-[12] rounded-lg shadow-custom bg-white flex-row items-center justify-between"
					>
						<View className="flex-row items-center gap-[15]">
							<MaterialCommunityIcons
								name="bank-check"
								size={30}
								color={Colors.light.text}
							/>
							<View>
								<Text className="text-[19px] font-zain-bold">
									BANK ACCOUNT **** 1111
								</Text>
								<Text className="text-muted mt-[-5]">
									Estimated payout 166,15 kr
								</Text>
							</View>
						</View>
						<View>
							<Ionicons
								name="chevron-forward"
								size={24}
								color={Colors.light.muted}
							/>
						</View>
					</TouchableOpacity>
				</View>
				<View className="my-[10] gap-[10]">
					<View className="mx-[20]">
						<Text className="text-2xl font-zain-bold">Location</Text>
						<Text className="text-muted text-lg mt-[-5]">
							The exact location will be revealed upon job confirmation.
						</Text>
					</View>
					<View className="mx-[20] relative">
						<LocationMapView disabled={true} />
						<View
							className="absolute w-full h-full rounded-lg"
							style={{
								backgroundColor: "rgba(0,0,0,0.25)",
							}}
						/>
					</View>
				</View>
				<View className="mt-[10] mb-[60]">
					<Text className="text-2xl font-zain-bold mx-[20]">Summary</Text>
					<View>
						<View className="py-[5] flex-row items-center justify-between mx-[20]">
							<Text className="text-lg">Salary</Text>
							<Text className="text-lg font-zain-bold">180,00 kr</Text>
						</View>
						<View className="py-[5] flex-row items-center justify-between mx-[20]">
							<Text className="text-lg">Transaction fee</Text>
							<Text className="text-lg font-zain-bold">-5,85 kr</Text>
						</View>
						<View className="py-[5] flex-row items-center justify-between mx-[20]">
							<Text className="text-lg">Application fee</Text>
							<Text className="text-lg font-zain-bold">- 8 kr</Text>
						</View>
						<View className="py-[5] flex-row items-center justify-between mx-[20]">
							<Text className="text-lg">Final salary</Text>
							<Text className="text-lg font-zain-bold">166,15 kr</Text>
						</View>
					</View>
				</View>
			</ScrollView>
			<View className="absolute bottom-[50] w-full">
				<TouchableOpacity className="bg-theme mx-[20] p-[12] flex-row justify-center rounded-lg shadow-custom">
					<Text className="text-xl text-white">Swipe to accept job offer</Text>
				</TouchableOpacity>
			</View>
		</SafeAreaView>
	);
}
