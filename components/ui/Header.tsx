import { TouchableOpacity, View } from "react-native";
import { Feather, Ionicons } from "@expo/vector-icons";
import { useColorScheme } from "@/hooks/useColorScheme";
import { Colors } from "@/constants/Colors";
import { useRouter } from "expo-router";
import { Image as ExpoImage } from "expo-image";
import { SignedIn, SignedOut, useUser } from "@clerk/clerk-expo";
import { cssInterop } from "nativewind";
import { Text } from "./Text";
import { cn } from "@/utils/cn";

const Image = cssInterop(ExpoImage, {
	className: "style",
});

export function Header() {
	const { isSignedIn, user } = useUser();
	const router = useRouter();
	const color = useColorScheme();

	function handleProfilePressOnSignedOut() {
		router.push("/(auth)/sign-in");
	}

	function handleMessagesPressed() {
		router.push("/(messages)/messages");
	}

	function handleLogoPressed() {
		router.push("/(tabs)");
	}

	return (
		<View className="flex-row pb-[20] px-[20] items-center justify-between">
			<TouchableOpacity onPress={handleLogoPressed} className="flex-row">
				<Text className="text-[28px] font-zain-extrabold">fri</Text>
				<Text className="text-[28px] font-zain-extrabold text-theme">
					lansr.
				</Text>
			</TouchableOpacity>
			<View className="flex-row items-center gap-[10]">
				<TouchableOpacity className="flex-row items-center">
					<Text>Current location</Text>
					<Feather
						name="chevron-down"
						size={22}
						color={Colors[color ?? "light"].text}
					/>
				</TouchableOpacity>
				<TouchableOpacity className="relative" onPress={handleMessagesPressed}>
					<View
						className={cn(
							"absolute right-[-3] top-[-3] bg-theme rounded-full w-[18] h-[18] z-[100] items-center justify-center",
							!isSignedIn && "bg-muted"
						)}
					>
						<Text className="text-white font-zain-bold text-[13px]">
							{isSignedIn ? 3 : 0}
						</Text>
					</View>
					<Ionicons
						name={"chatbox-ellipses-outline"}
						size={30}
						color={Colors[color ?? "light"].text}
					/>
				</TouchableOpacity>
				<SignedOut>
					<TouchableOpacity
						onPress={handleProfilePressOnSignedOut}
						className="w-[35] h-[35] rounded-full bg-[#d9d9d9]"
					></TouchableOpacity>
				</SignedOut>
				<SignedIn>
					<TouchableOpacity onPress={() => router.push("/profile")}>
						<Image
							source={{ uri: user?.imageUrl }}
							className="w-[35] h-[35] rounded-full bg-[#d9d9d9]"
						/>
					</TouchableOpacity>
				</SignedIn>
			</View>
		</View>
	);
}
