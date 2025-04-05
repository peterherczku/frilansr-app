import { TouchableOpacity, View } from "react-native";
import { useClerk, useUser } from "@clerk/clerk-expo";
import { Image as ExpoImage } from "expo-image";
import { useRouter } from "expo-router";
import { remapProps } from "nativewind";
import { Text } from "../Text";

const Image = remapProps(ExpoImage, {
	className: "style",
});

export function ProfileHeader() {
	const { user } = useUser();
	const router = useRouter();
	const { signOut } = useClerk();

	async function pressChangeAccount() {
		await signOut();
		router.replace("/(tabs)/");
	}

	return (
		<View
			style={{
				marginVertical: 10,
				marginHorizontal: 20,
				flexDirection: "row",
				alignItems: "center",
				justifyContent: "space-between",
			}}
		>
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
