import {StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {useClerk, useUser} from "@clerk/clerk-expo";
import {Image} from "expo-image";
import {Colors} from "@/constants/Colors";
import {useRouter} from "expo-router";

export function ProfileHeader() {
    const { user,  } = useUser();
    const router = useRouter();
    const { signOut } = useClerk();

    async function pressChangeAccount() {
        await signOut();
        router.replace("/(tabs)/");
    }

    return <View style={styles.container}>
        <View>
            <Text style={[styles.text, styles.title]}>Hey, {user?.firstName}!</Text>
            <TouchableOpacity onPress={pressChangeAccount}>
                <Text style={[styles.text, styles.subtitle]}>Change account</Text>
            </TouchableOpacity>
        </View>
        <TouchableOpacity>
            <Image style={styles.image} source={{uri: user?.imageUrl}} />
        </TouchableOpacity>
    </View>
}

const styles = StyleSheet.create({
    container: {
        marginVertical: 10,
        marginHorizontal: 20,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between"
    },
    text: {
        fontFamily: "Zain",
        fontSize: 16,
        color: Colors.light.text
    },
    title: {
        fontFamily: "Zain-ExtraBold",
        fontSize: 24
    },
    subtitle: {
        fontSize: 18,
        color: Colors.light.muted,
        textDecorationLine: "underline",
        marginTop: -6
    },
    image: {
        width: 65,
        height: 65,
        borderRadius: 50,
        backgroundColor: "#D9D9D9"
    }
})