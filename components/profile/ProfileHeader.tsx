import { TouchableOpacity, View } from "react-native";
import { useClerk, useUser } from "@clerk/clerk-expo";
import { Image as ExpoImage } from "expo-image";
import { useRouter } from "expo-router";
import { cssInterop } from "nativewind";
import { Text } from "../ui/Text";
import { useSignOut } from "@/hooks/auth/useSignOut";

const Image = cssInterop(ExpoImage, {
	className: "style",
});

export function ProfileHeader() {
	const { user } = useUser();
	const router = useRouter();
	const { signOut } = useSignOut();

	async function pressChangeAccount() {
		await signOut();
		router.replace("/(worker)/(tabs)/");
	}

	return (
		<View className="my-[10] mx-[20] flex-row items-center justify-between">
			<View>
				<Text className="font-zain-extrabold text-3xl">
					Hey, {user?.firstName}!
				</Text>
				<TouchableOpacity onPress={pressChangeAccount}>
					<Text className="text-lg text-muted underline mt-[-6]">
						Change account
					</Text>
				</TouchableOpacity>
			</View>
			<TouchableOpacity>
				<Image
					className="w-[65] h-[65] rounded-full bg-[#d9d9d9]"
					source={{ uri: user?.imageUrl }}
				/>
			</TouchableOpacity>
		</View>
	);
}
