import {StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {Colors} from "@/constants/Colors";

export function ProfileAffiliateProgram() {
    return <View style={styles.container}>
        <View>
            <Text style={[styles.text, styles.title]}>Would you like 0% fees on your next jobs?</Text>
            <Text style={[styles.text, styles.subtitle]}>Invite five of your friends, and start earning together!</Text>
        </View>
        <View style={[styles.row, styles.between]}>
            <View style={styles.row}>
                <View style={styles.progressBar}>
                    <View style={styles.progress}></View>
                </View>
                <Text style={[styles.text, styles.progressText]}>3/5</Text>
            </View>
            <TouchableOpacity>
                <Text style={[styles.text, styles.inviteText]}>Invite your friends</Text>
            </TouchableOpacity>
        </View>
    </View>
}

const styles = StyleSheet.create({
   container: {
       backgroundColor: "rgba(85, 147, 62, 0.4)",
       padding: 15,
       marginHorizontal: 20,
       borderRadius: 8,
       flexDirection: "column",
       gap: 18
   },
    row: {
       flexDirection: "row",
       alignItems: "center"
    },
    between: {
       justifyContent: "space-between"
    },
    text: {
       fontFamily: "Zain",
        fontSize: 17,
        color: Colors.light.text
    },
    title: {
       fontFamily: "Zain-Bold"
    },
    subtitle: {
       fontSize: 14,
        marginTop: -5
    },
    progressBar: {
       position: "relative",
        backgroundColor: "white",
        width: 140,
        borderRadius: 8,
        height: 16,
    },
    progress: {
       position: "absolute",
        left: 0,
        top: 0,
        width: 140 * 0.66,
        height: 16,
        borderRadius: 8,
        backgroundColor: Colors.light.themeColor
    },
    inviteText: {
       color: Colors.light.themeColor,
        fontFamily: "Zain-Bold",
        textDecorationLine: "underline"
    },
    progressText: {
       color: Colors.light.themeColor,
        fontFamily: "Zain-Bold",
        marginTop: 1.5,
        marginLeft: 5
    }

});