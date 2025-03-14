import * as React from 'react'
import {Text, TextInput, Button, View, TouchableOpacity, StyleSheet} from 'react-native'
import { useSignUp } from '@clerk/clerk-expo'
import { useRouter } from 'expo-router'
import {Ionicons} from "@expo/vector-icons";
import {Colors} from "@/constants/Colors";
import {useState} from "react";

export default function SignUpScreen() {
    const { isLoaded, signUp, setActive } = useSignUp()
    const router = useRouter()

    const [error, setError] = useState("");
    const [emailAddress, setEmailAddress] = useState('')
    const [password, setPassword] = useState('')
    const [pendingVerification, setPendingVerification] = useState(false)
    const [code, setCode] = useState('')

    const onLoginPress = () => {
        router.replace("/(auth)/sign-in");
    }

    // Handle submission of sign-up form
    const onSignUpPress = async () => {
        if (!isLoaded) return
        setError("");

        // Start sign-up process using email and password provided
        try {
            await signUp!.create({
                emailAddress,
                password,
            })

            // Send user an email with verification code
            await signUp!.prepareEmailAddressVerification({ strategy: 'email_code' })

            // Set 'pendingVerification' to true to display second form
            // and capture OTP code
            setPendingVerification(true)
        } catch (err) {
            // See https://clerk.com/docs/custom-flows/error-handling
            // for more info on error handling
            if(!err?.errors[0]?.message) {
                setError("An error occurred. Please try again later.");
            } else {
                setError(err.errors[0].message);
            }
        }
    }

    // Handle submission of verification form
    const onVerifyPress = async () => {
        if (!isLoaded) return
        setError("");

        try {
            // Use the code the user provided to attempt verification
            const signUpAttempt = await signUp!.attemptEmailAddressVerification({
                code,
            })

            // If verification was completed, set the session to active
            // and redirect the user
            if (signUpAttempt.status === 'complete') {
                if (setActive) {
                    await setActive({session: signUpAttempt.createdSessionId})
                }
                router.replace('/')
            } else {
                // If the status is not complete, check why. User may need to
                // complete further steps.
                console.error(JSON.stringify(signUpAttempt, null, 2))
            }
        } catch (err) {
            // See https://clerk.com/docs/custom-flows/error-handling
            // for more info on error handling
            if(!err?.errors[0]?.message) {
                setError("An error occurred. Please try again later.");
            } else {
                setError(err.errors[0].message);
            }
        }
    }

    const onBackPress = () => {
        router.back();
    }

    if (pendingVerification) {
        return <View style={styles.page}>
            <View style={styles.container}>
                <TouchableOpacity>
                    <Text style={[styles.text, styles.back]} onPress={onBackPress}>Back</Text>
                </TouchableOpacity>
                <View style={styles.textContainer}>
                    <Text style={[styles.text, styles.title]}>Verify your email</Text>
                    <Text style={[styles.text, styles.subtitle]}>Please verify your email to continue.</Text>
                </View>
                <View style={styles.inputsContainer}>
                    <Text style={[styles.text, styles.errorText]}>{error}</Text>
                    <TextInput value={code} placeholder="Enter your verification code" onChangeText={(code) => setCode(code)} style={[styles.input, styles.text]}  />
                </View>
                <TouchableOpacity style={[styles.button, styles.buttonTheme]} onPress={onVerifyPress}>
                    <Text style={[styles.text, styles.buttonText]}>Verify</Text>
                    <Ionicons name={"arrow-forward-circle-outline"} color={"white"} size={24} />
                </TouchableOpacity>
                <TouchableOpacity onPress={onLoginPress}>
                    <Text style={[styles.text, styles.registerLink]}>You already have an account?</Text>
                </TouchableOpacity>
            </View>
        </View>
    }

    return <View style={styles.page}>
        <View style={styles.container}>
            <TouchableOpacity>
                <Text style={[styles.text, styles.back]} onPress={onBackPress}>Back</Text>
            </TouchableOpacity>
            <View style={styles.textContainer}>
                <Text style={[styles.text, styles.title]}>Sign up</Text>
                <Text style={[styles.text, styles.subtitle]}>Please sign up to continue.</Text>
            </View>
            <View style={styles.inputsContainer}>
                <Text style={[styles.text, styles.errorText]}>{error}</Text>
                <TextInput value={emailAddress} onChangeText={(emailAddress) => setEmailAddress(emailAddress)} style={[styles.input, styles.text]} autoCapitalize={"none"} placeholder={"Enter email address"}  />
                <TextInput value={password} onChangeText={(password) => setPassword(password)} style={[styles.input, styles.text]} secureTextEntry={true} placeholder={"Enter password"}  />
            </View>
            <TouchableOpacity style={[styles.button, styles.buttonTheme]} onPress={onSignUpPress}>
                <Text style={[styles.text, styles.buttonText]}>Continue</Text>
                <Ionicons name={"arrow-forward-circle-outline"} color={"white"} size={24} />
            </TouchableOpacity>
            <TouchableOpacity onPress={onLoginPress}>
                <Text style={[styles.text, styles.registerLink]}>You already have an account?</Text>
            </TouchableOpacity>
        </View>
    </View>

    /*return (
        <View>
            <>
                <Text>Sign up</Text>
                <TextInput
                    autoCapitalize="none"
                    value={emailAddress}
                    placeholder="Enter email"
                    onChangeText={(email) => setEmailAddress(email)}
                />
                <TextInput
                    value={password}
                    placeholder="Enter password"
                    secureTextEntry={true}
                    onChangeText={(password) => setPassword(password)}
                />
                <Button title="Continue" onPress={onSignUpPress} />
            </>
        </View>
    )*/
}

const styles = StyleSheet.create({
    page: {
        flex: 1,
        backgroundColor: "white",
        padding: 20,
        flexDirection: "column",
        justifyContent: "center",
    },
    container: {
        flexDirection: "column",
        width: "100%",
        gap: 30
    },
    back: {
        color: Colors.light.themeColor,
        textDecorationLine: "underline"
    },
    textContainer: {
        flexDirection: "column",
    },
    text: {
        fontFamily: "Zain",
        fontSize: 18
    },
    errorText: {
        color: "red",
    },
    title: {
        fontSize: 30,
        fontFamily: "Zain-ExtraBold",
        color: Colors.light.text
    },
    subtitle: {
        fontSize: 20,
        color: Colors.light.muted,
        marginTop: -10
    },
    inputsContainer: {
        flexDirection: "column",
        gap: 10,
    },
    inputContainer: {
        position: "relative"
    },
    input: {
        backgroundColor: "white",
        padding: 10,
        borderRadius: 12,
        shadowOffset: {
            width: 0,
            height: 0,
        },
        shadowOpacity: 0.20,
        shadowRadius: 2,
    },
    forgotContainer: {
        position: "absolute",
        top: '50%',
        right: 10,
        transform: [{ translateY: -0.5 * 20 }],
    },
    forgot: {
        color: Colors.light.themeColor,
        textDecorationLine: "underline",
        fontSize: 16
    },
    button: {
        flexDirection: "row",
        borderRadius: 50,
        paddingVertical: 10,
        paddingHorizontal: 20,
        width: "auto",
        justifyContent: "center",
        alignItems: "center",
        gap: 6,
    },
    buttonTheme: {
        backgroundColor: Colors.light.themeColor,
    },
    buttonOutline: {
        borderStyle: "solid",
        borderWidth: 2,
        borderColor: "#e9e9e9"
    },
    buttonText: {
        color: "white",
        fontFamily: "Zain-Bold",
    },
    buttonOutlineText: {
        color: Colors.light.muted
    },
    separatorContainer: {
        flexDirection: "row",
        alignItems: "center"
    },
    separator: {
        height: 3,
        backgroundColor: "#e9e9e9",
        borderRadius: 2,
        flex: 1,
    },
    separatorText: {
        fontFamily: "Zain-Bold",
        marginHorizontal: 10,
        fontSize: 16,
        color: Colors.light.muted,
        textTransform: "uppercase"
    },
    socialButtons: {
        flexDirection: "column",
        gap: 6,
    },
    registerLink: {
        textAlign: "center",
        color: Colors.light.themeColor,
        textDecorationLine: "underline"
    }

});