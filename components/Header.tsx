import {Pressable, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {Feather, Ionicons} from "@expo/vector-icons";
import {useColorScheme} from "@/hooks/useColorScheme";
import {Colors} from "@/constants/Colors";
import {useRouter} from "expo-router";
import { Image } from "expo-image";
import {SignedIn, SignedOut, useAuth, useUser} from "@clerk/clerk-expo";

export function Header() {
    const { isSignedIn, user } = useUser();
    const router = useRouter();
    const color = useColorScheme();

    function handleProfilePressOnSignedOut() {
        router.push("/(auth)/sign-in");
    }

    return <View style={[styles.row, styles.container, styles.itemsCenter, styles.justifyBetween]}>
        <View style={[styles.row]}>
            <Text style={[styles.text, styles.title]}>fri</Text>
            <Text style={[styles.text, styles.title, styles.titleGreen]}>lansr.</Text>
        </View>
        <View style={[styles.row, styles.itemsCenter, styles.headerRight]}>
            <TouchableOpacity style={[styles.row, styles.itemsCenter]}>
                <Text style={[styles.text]}>Current location</Text>
                <Feather name="chevron-down" size={22} color={Colors[color ?? "light"].text} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.messagesView}>
                <View style={isSignedIn ? [styles.notificationsView] : [styles.notificationsView, styles.notificationsViewZero]}>
                    <Text style={styles.notificationsText}>{isSignedIn ? 3 : 0}</Text>
                </View>
                <Ionicons name={"chatbox-ellipses-outline"} size={30} color={Colors[color ?? "light"].text} />
            </TouchableOpacity>
            <SignedOut>
                <TouchableOpacity onPress={handleProfilePressOnSignedOut} style={styles.profilePicture}></TouchableOpacity>
            </SignedOut>
            <SignedIn>
                <TouchableOpacity onPress={() => router.push("/profile")}>
                    <Image source={{uri: user?.imageUrl}} style={styles.profilePicture} />
                </TouchableOpacity>
            </SignedIn>
        </View>
    </View>
}

const styles= StyleSheet.create({
    text: {
        fontFamily: "Zain",
        fontSize: 16,
    },
    title: {
        fontSize: 28,
        fontFamily: "Zain-ExtraBold"
    },
    titleGreen: {
        color: Colors.light.themeColor
    },
    row: {
        display: "flex",
        flexDirection: "row"
    },
    justifyBetween: {
        justifyContent: "space-between"
    },
    itemsCenter: {
        alignItems: "center"
    },
    container: {
        paddingBottom: 20,
        paddingHorizontal: 20
    },
    messagesView: {
        position: "relative",
    },
    headerRight: {
       gap: 10,
    },
    notificationsView: {
        position: "absolute",
        right: -3,
        top: -3,
        backgroundColor: Colors.light.themeColor,
        borderRadius: 50,
        width: 18,
        height: 18,
        zIndex: 100,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },
    notificationsViewZero: {
        backgroundColor: Colors.light.muted
    },
    notificationsText: {
        color: "#fff",
        fontFamily: "Zain-Bold",
        fontSize: 13,
    },
    profilePicture: {
        width: 35,
        height: 35,
        borderRadius: 50,
        backgroundColor: "#D9D9D9"
    }
});