import {StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {Ionicons} from "@expo/vector-icons";
import {Colors} from "@/constants/Colors";

export function ProfilePaymentBoxItem({ title, subtitle } : { title: string, subtitle?: string}) {
    return <TouchableOpacity style={styles.box}>
        <View>
            <Text style={styles.text}>{title}</Text>
            {subtitle && <Text style={[styles.text, styles.subtitle]}>{subtitle}</Text>}
        </View>
        <Ionicons name="chevron-forward" size={24} color={Colors.light.text} />
    </TouchableOpacity>
}

export function ProfilePaymentBox({ children }) {
    return <View style={styles.container}>
        {children}
    </View>
}

const styles = StyleSheet.create({
   container: {
       margin: 20,
       backgroundColor: "white",
       elevation: 2,
       shadowOffset: {
           width: 0,
           height: 0,
       },
       shadowRadius: 2,
       shadowOpacity: 0.25,
       borderRadius: 8,
       paddingHorizontal: 12,
   },
    box: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingVertical: 12,
    },
    text: {
       fontFamily: "Zain",
        fontSize: 18,
        color: Colors.light.text
    },
    subtitle: {
       fontSize: 16,
        color: Colors.light.muted,
        marginTop: -5
    }
});