import {StartSSOFlowParams, useSignIn, useSSO} from '@clerk/clerk-expo'
import { Link, useRouter } from 'expo-router'
import {Text, TextInput, Button, View, StyleSheet, TouchableOpacity} from 'react-native'
import React, {useState, useEffect, useCallback} from 'react'
import {Colors} from "@/constants/Colors";
import {Ionicons} from "@expo/vector-icons";
import * as WebBrowser from 'expo-web-browser'
import * as AuthSession from 'expo-auth-session'
import {OAuthStrategy} from "@clerk/types";

export const useWarmUpBrowser = () => {
    useEffect(() => {
        // Preloads the browser for Android devices to reduce authentication load time
        // See: https://docs.expo.dev/guides/authentication/#improving-user-experience
        void WebBrowser.warmUpAsync()
        return () => {
            // Cleanup: closes browser when component unmounts
            void WebBrowser.coolDownAsync()
        }
    }, [])
}

WebBrowser.maybeCompleteAuthSession()

export default function Page() {
    useWarmUpBrowser();
    const { startSSOFlow } = useSSO()
    const { signIn, setActive, isLoaded } = useSignIn()
    const router = useRouter()

    const [error, setError] = useState("");
    const [emailAddress, setEmailAddress] = useState('')
    const [password, setPassword] = useState('')

    // Handle the submission of the sign-in form
    const onSignInPress = React.useCallback(async () => {
        if (!isLoaded) return

        // Start the sign-in process using the email and password provided
        try {
            const signInAttempt = await signIn!.create({
                identifier: emailAddress,
                password,
            })

            // If sign-in process is complete, set the created session as active
            // and redirect the user
            if (signInAttempt.status === 'complete') {
                if (setActive) {
                    await setActive({session: signInAttempt.createdSessionId})
                }
                router.replace('/')
            } else {
                // If the status isn't complete, check why. User might need to
                // complete further steps.
                console.error(JSON.stringify(signInAttempt, null, 2))
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
    }, [isLoaded, emailAddress, password])

    const onPressWithSocial = useCallback(async (social: OAuthStrategy) => {
        try {
            // Start the authentication process by calling `startSSOFlow()`
            const { createdSessionId, setActive, signIn, signUp } = await startSSOFlow({
                strategy: social,
                // Defaults to current path
                redirectUrl: AuthSession.makeRedirectUri(),
            })

            // If sign in was successful, set the active session
            if (createdSessionId) {
                setActive!({ session: createdSessionId })
            } else {
                // If there is no `createdSessionId`,
                // there are missing requirements, such as MFA
                // Use the `signIn` or `signUp` returned from `startSSOFlow`
                // to handle next steps
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
    }, [])

    const onSignUpPress = () => {
        router.replace("/(auth)/sign-up");
    }

    const onBackPress = () => {
        router.back();
    }

    return (
        <View style={styles.page}>
            <View style={styles.container}>
                <TouchableOpacity onPress={onBackPress}>
                    <Text style={[styles.text, styles.back]}>Back</Text>
                </TouchableOpacity>
                <View style={styles.textContainer}>
                    <Text style={[styles.text, styles.title]}>Login</Text>
                    <Text style={[styles.text, styles.subtitle]}>Please sign in to continue.</Text>
                </View>
                <View style={styles.inputsContainer}>
                    <Text style={[styles.text, styles.errorText]}>{error}</Text>
                    <TextInput value={emailAddress} onChangeText={(emailAddress) => setEmailAddress(emailAddress)} style={[styles.input, styles.text]} autoCapitalize={"none"} placeholder={"Enter email address"}  />
                    <View className={styles.inputContainer}>
                        <TextInput value={password} onChangeText={(password) => setPassword(password)} style={[styles.input, styles.text]} secureTextEntry={true} placeholder={"Enter password"}  />
                        <TouchableOpacity style={styles.forgotContainer}>
                            <Text style={[styles.text, styles.forgot]}>Forgot</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <TouchableOpacity style={[styles.button, styles.buttonTheme]} onPress={onSignInPress}>
                    <Text style={[styles.text, styles.buttonText]}>Login</Text>
                    <Ionicons name={"arrow-forward-circle-outline"} color={"white"} size={24} />
                </TouchableOpacity>
                <View style={styles.separatorContainer}>
                    <View style={styles.separator} />
                    <Text style={[styles.text, styles.separatorText]}>Or continue with</Text>
                    <View style={styles.separator} />
                </View>
                <View style={styles.socialButtons}>
                    <TouchableOpacity style={[styles.button, styles.buttonOutline]} onPress={() => onPressWithSocial("oauth_facebook")}>
                        <Ionicons name={"logo-facebook"} size={18} color={Colors.light.muted} />
                        <Text style={[styles.text, styles.buttonOutlineText]}>Facebook</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.button, styles.buttonOutline]} onPress={() => onPressWithSocial("oauth_google")}>
                        <Ionicons name={"logo-google"} size={18} color={Colors.light.muted} />
                        <Text style={[styles.text, styles.buttonOutlineText]}>Google</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.button, styles.buttonOutline]} onPress={() => onPressWithSocial("oauth_apple")}>
                        <Ionicons name={"logo-apple"} size={18} color={Colors.light.muted} />
                        <Text style={[styles.text, styles.buttonOutlineText]}>Apple</Text>
                    </TouchableOpacity>
                </View>
                <TouchableOpacity onPress={onSignUpPress}>
                    <Text style={[styles.text, styles.registerLink]}>You don't have an account yet?</Text>
                </TouchableOpacity>
            </View>
        </View>
    )

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
        elevation: 2,
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