import { TextInput, View, TouchableOpacity } from "react-native";
import { useSignUp } from "@clerk/clerk-expo";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { Text } from "@/components/ui/Text";

export default function SignUpScreen() {
	const { isLoaded, signUp, setActive } = useSignUp();
	const router = useRouter();

	const [error, setError] = useState("");
	const [emailAddress, setEmailAddress] = useState("");
	const [password, setPassword] = useState("");
	const [pendingVerification, setPendingVerification] = useState(false);
	const [code, setCode] = useState("");

	const onLoginPress = () => {
		router.replace("/(auth)/sign-in");
	};

	// Handle submission of sign-up form
	const onSignUpPress = async () => {
		if (!isLoaded) return;
		setError("");

		// Start sign-up process using email and password provided
		try {
			await signUp!.create({
				emailAddress,
				password,
			});

			// Send user an email with verification code
			await signUp!.prepareEmailAddressVerification({ strategy: "email_code" });

			// Set 'pendingVerification' to true to display second form
			// and capture OTP code
			setPendingVerification(true);
		} catch (err) {
			// See https://clerk.com/docs/custom-flows/error-handling
			// for more info on error handling
			if (!err?.errors[0]?.message) {
				setError("An error occurred. Please try again later.");
			} else {
				setError(err.errors[0].message);
			}
		}
	};

	// Handle submission of verification form
	const onVerifyPress = async () => {
		if (!isLoaded) return;
		setError("");

		try {
			// Use the code the user provided to attempt verification
			const signUpAttempt = await signUp!.attemptEmailAddressVerification({
				code,
			});

			// If verification was completed, set the session to active
			// and redirect the user
			if (signUpAttempt.status === "complete") {
				if (setActive) {
					await setActive({ session: signUpAttempt.createdSessionId });
				}
				router.replace("/");
			} else {
				// If the status is not complete, check why. User may need to
				// complete further steps.
				console.error(JSON.stringify(signUpAttempt, null, 2));
			}
		} catch (err) {
			// See https://clerk.com/docs/custom-flows/error-handling
			// for more info on error handling
			if (!err?.errors[0]?.message) {
				setError("An error occurred. Please try again later.");
			} else {
				setError(err.errors[0].message);
			}
		}
	};

	const onBackPress = () => {
		router.back();
	};

	if (pendingVerification) {
		return (
			<View className="flex-1 bg-white p-[20] flex-col justify-center">
				<View className="flex-col w-full gap-[30]">
					<TouchableOpacity onPress={onBackPress}>
						<Text className="text-lg text-theme underline">Back</Text>
					</TouchableOpacity>
					<View className="flex-col">
						<Text className="font-zain-extrabold text-[30px]">
							Verify your email
						</Text>
						<Text className="text-xl text-muted mt-[-10]">
							Please verify your email to continue.
						</Text>
					</View>
					<View className="flex-col gap-[10]">
						<Text className="text-red-500 text-lg">{error}</Text>
						<TextInput
							value={code}
							placeholder="Enter your verification code"
							onChangeText={(code) => setCode(code)}
							className="bg-white p-[10] rounded-xl shadow-custom text-lg font-zain"
						/>
					</View>
					<TouchableOpacity
						className="flex-row rounded-[50] py-[10] px-[20] w-auto justify-center items-center gap-[6] bg-theme"
						onPress={onVerifyPress}
					>
						<Text className="text-white font-zain-bold text-lg">Verify</Text>
						<Ionicons
							name={"arrow-forward-circle-outline"}
							color={"white"}
							size={24}
						/>
					</TouchableOpacity>
					<TouchableOpacity onPress={onLoginPress}>
						<Text className="text-center underline text-theme text-lg">
							You already have an account?
						</Text>
					</TouchableOpacity>
				</View>
			</View>
		);
	}

	return (
		<View className="flex-1 bg-white p-[20] flex-col justify-center">
			<View className="flex-col w-full gap-[30]">
				<TouchableOpacity onPress={onBackPress}>
					<Text className="text-theme underline text-lg">Back</Text>
				</TouchableOpacity>
				<View className="flex-col">
					<Text className="font-zain-extrabold text-[30px]">Sign up</Text>
					<Text className="text-muted text-xl mt-[-10]">
						Please sign up to continue.
					</Text>
				</View>
				<View className="flex-col gap-[10]">
					<Text className="text-lg text-red-500">{error}</Text>
					<TextInput
						value={emailAddress}
						onChangeText={(emailAddress) => setEmailAddress(emailAddress)}
						className="bg-white p-[10] rounded-xl shadow-custom text-lg font-zain"
						autoCapitalize={"none"}
						placeholder={"Enter email address"}
					/>
					<TextInput
						value={password}
						onChangeText={(password) => setPassword(password)}
						className="bg-white p-[10] rounded-xl shadow-custom text-lg font-zain"
						secureTextEntry={true}
						placeholder={"Enter password"}
					/>
				</View>
				<TouchableOpacity
					className="flex-row rounded-[50] py-[10] px-[20] w-auto justify-center items-center gap-[6] bg-theme"
					onPress={onSignUpPress}
				>
					<Text className="text-white font-zain-bold text-lg">Continue</Text>
					<Ionicons
						name={"arrow-forward-circle-outline"}
						color={"white"}
						size={24}
					/>
				</TouchableOpacity>
				<TouchableOpacity onPress={onLoginPress}>
					<Text className="text-lg text-center text-theme underline">
						You already have an account?
					</Text>
				</TouchableOpacity>
			</View>
		</View>
	);
}
