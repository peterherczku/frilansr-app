import { useSignIn, useSSO } from "@clerk/clerk-expo";
import { useRouter } from "expo-router";
import { TextInput, View, TouchableOpacity } from "react-native";
import { useState, useEffect, useCallback } from "react";
import { Colors } from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import * as WebBrowser from "expo-web-browser";
import * as AuthSession from "expo-auth-session";
import { OAuthStrategy } from "@clerk/types";
import { Text } from "@/components/ui/Text";

export const useWarmUpBrowser = () => {
	useEffect(() => {
		void WebBrowser.warmUpAsync();
		return () => {
			void WebBrowser.coolDownAsync();
		};
	}, []);
};

WebBrowser.maybeCompleteAuthSession();

export default function Page() {
	useWarmUpBrowser();
	const { startSSOFlow } = useSSO();
	const { signIn, setActive, isLoaded } = useSignIn();
	const router = useRouter();

	const [error, setError] = useState("");
	const [emailAddress, setEmailAddress] = useState("");
	const [password, setPassword] = useState("");

	const onSignInPress = useCallback(async () => {
		if (!isLoaded) return;
		try {
			const signInAttempt = await signIn!.create({
				identifier: emailAddress,
				password,
			});
			if (signInAttempt.status === "complete") {
				if (setActive) {
					await setActive({ session: signInAttempt.createdSessionId });
				}
				router.replace("/");
			} else {
				console.error(JSON.stringify(signInAttempt, null, 2));
			}
		} catch (err) {
			if (!err?.errors[0]?.message) {
				setError("An error occurred. Please try again later.");
			} else {
				setError(err.errors[0].message);
			}
		}
	}, [isLoaded, emailAddress, password]);

	const onPressWithSocial = useCallback(async (social: OAuthStrategy) => {
		try {
			const { createdSessionId, setActive, signIn, signUp } =
				await startSSOFlow({
					strategy: social,
					// Defaults to current path
					redirectUrl: AuthSession.makeRedirectUri(),
				});

			if (createdSessionId) {
				setActive!({ session: createdSessionId });
			}
		} catch (err) {
			if (!err?.errors[0]?.message) {
				setError("An error occurred. Please try again later.");
			} else {
				setError(err.errors[0].message);
			}
		}
	}, []);

	const onSignUpPress = () => {
		router.replace("/(auth)/sign-up");
	};

	const onBackPress = () => {
		router.back();
	};

	return (
		<View className="flex-1 bg-white p-[20] flex-col justify-center">
			<View className="flex-col w-full gap-[30]">
				<TouchableOpacity onPress={onBackPress}>
					<Text className="text-lg text-theme underline">Back</Text>
				</TouchableOpacity>
				<View className="flex-col">
					<Text className="text-[30px] font-zain-extrabold">Login</Text>
					<Text className="text-xl text-muted mt-[-10]">
						Please sign in to continue.
					</Text>
				</View>
				<View className="flex-col gap-[10]">
					<Text className="text-lg text-red-500">{error}</Text>
					<TextInput
						value={emailAddress}
						onChangeText={(emailAddress) => setEmailAddress(emailAddress)}
						className="bg-white p-[10] shadow-custom rounded-xl text-lg font-zain"
						autoCapitalize={"none"}
						placeholder={"Enter email address"}
					/>
					<View className="relative">
						<TextInput
							value={password}
							onChangeText={(password) => setPassword(password)}
							className="bg-white p-[10] shadow-custom rounded-xl text-lg font-zain"
							secureTextEntry={true}
							placeholder={"Enter password"}
						/>
						<TouchableOpacity
							className="absolute top-1/2 right-[10]"
							style={{
								transform: [{ translateY: -0.5 * 20 }],
							}}
						>
							<Text className="underline text-theme">Forgot</Text>
						</TouchableOpacity>
					</View>
				</View>
				<TouchableOpacity
					className="flex-row rounded-[50] py-[10] px-[20] w-auto justify-center items-center gap-[6] bg-theme"
					onPress={onSignInPress}
				>
					<Text className="text-white text-lg font-zain-bold">Login</Text>
					<Ionicons
						name={"arrow-forward-circle-outline"}
						color={"white"}
						size={24}
					/>
				</TouchableOpacity>
				<View className="flex-row items-center">
					<View className="h-[3] bg-[#e9e9e9] rounded-sm flex-1" />
					<Text className="font-zain-bold text-muted uppercase my-[10]">
						Or continue with
					</Text>
					<View className="h-[3] bg-[#e9e9e9] rounded-sm flex-1" />
				</View>
				<View className="flex-col gap-[6]">
					<TouchableOpacity
						className="flex-row rounded-[50] py-[10] px-[20] w-auto justify-center items-center gap-[6] border-[#e9e9e9] border-2 border-solid"
						onPress={() => onPressWithSocial("oauth_facebook")}
					>
						<Ionicons
							name={"logo-facebook"}
							size={18}
							color={Colors.light.muted}
						/>
						<Text className="text-lg text-muted">Facebook</Text>
					</TouchableOpacity>
					<TouchableOpacity
						className="flex-row rounded-[50] py-[10] px-[20] w-auto justify-center items-center gap-[6] border-[#e9e9e9] border-2 border-solid"
						onPress={() => onPressWithSocial("oauth_google")}
					>
						<Ionicons
							name={"logo-google"}
							size={18}
							color={Colors.light.muted}
						/>
						<Text className="text-lg text-muted">Google</Text>
					</TouchableOpacity>
					<TouchableOpacity
						className="flex-row rounded-[50] py-[10] px-[20] w-auto justify-center items-center gap-[6] border-[#e9e9e9] border-2 border-solid"
						onPress={() => onPressWithSocial("oauth_apple")}
					>
						<Ionicons
							name={"logo-apple"}
							size={18}
							color={Colors.light.muted}
						/>
						<Text className="text-lg text-muted">Apple</Text>
					</TouchableOpacity>
				</View>
				<TouchableOpacity onPress={onSignUpPress}>
					<Text className="text-lg text-center text-theme underline">
						You don't have an account yet?
					</Text>
				</TouchableOpacity>
			</View>
		</View>
	);
}
