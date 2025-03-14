import {FlatList, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {Colors} from "@/constants/Colors";
import {FontAwesome6, Ionicons} from "@expo/vector-icons";
import {Image} from "expo-image";

export function ProfileRecentWorks({ data }: { data: { image: string, title: string, workType: string, earnedMoney: string, duration: string }[] }) {
    function renderItem(item) {
        return <TouchableOpacity key={item.id} style={styles.box}>
            <View style={styles.imageContainer}>
                <Image source={{ uri: item.image }} style={styles.image} />
                <View style={styles.imageOverlay} />
            </View>
            <View style={styles.detailsContainer}>
                <View>
                    <Text style={[styles.text]}>{item.title}</Text>
                    <Text style={[styles.text, styles.workTypeText]}>{item.workType}</Text>
                </View>
                <View style={styles.jobDetailsRow}>
                    <View style={styles.detailRow}>
                        <FontAwesome6 name="sack-dollar" size={14} color={Colors.light.muted} />
                        <Text style={[styles.text, styles.detailText]}>{item.earnedMoney}</Text>
                    </View>
                    <View style={styles.separator}/>
                    <View style={styles.detailRow}>
                        <FontAwesome6 name="clock" size={14} color={Colors.light.muted} />
                        <Text style={[styles.text, styles.detailText]}>{item.duration}</Text>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    }

    return <View style={styles.container}>
        <View style={[styles.headerRow]}>
            <Text style={[styles.text, styles.header]}>Recent works</Text>
            <TouchableOpacity style={styles.headerRow}>
                <Text style={[styles.text, styles.header, styles.headerLink]}>See all</Text>
                <Ionicons name="chevron-forward" size={24} color={Colors.light.themeColor} />
            </TouchableOpacity>
        </View>
        {data.map(renderItem)}
    </View>
}

const styles = StyleSheet.create({
    container: {
        margin: 20,
        flexDirection: "column",
        gap: 10,
    },
    headerRow: {
      flexDirection: "row",
      justifyContent: "space-between",
        alignItems: "center",
        gap: 5,
    },
    header: {
        fontSize: 25,
        fontFamily: "Zain-Bold"
    },
    headerLink: {
        fontSize: 22,
        color: Colors.light.themeColor,
    },
    text: {
        fontFamily: "Zain",
        fontSize: 16,
        color: Colors.light.text
    },
    box: {
        flexDirection: "row",
        alignItems: "center",
        gap: 12,
        marginVertical: 5,
    },
    imageContainer: {
        position: "relative"
    },
    image: {
        width: 70,
        height: 70,
        backgroundColor: "#D9D9D9",
        borderRadius: 8,
    },
    imageOverlay: {
        position: "absolute",
        width: 70,
        height: 70,
        backgroundColor: "rgba(0,0,0,0.25)",
        borderRadius: 8,
        zIndex: 100
    },
    detailsContainer: {
        flexDirection: "column",
    },
    workTypeText: {
        color: Colors.light.muted,
        marginTop: -5,
        fontSize: 14,
    },
    jobDetailsRow: {
        flexDirection: "row",
        gap: 10,
        alignItems: "center"
    },
    detailRow: {
        flexDirection: "row",
        alignItems: "center",
        gap: 6
    },
    detailText: {
        marginTop: 2,
        color: Colors.light.muted
    },
    separator: {
        width: 6,
        height: 6,
        backgroundColor: Colors.light.muted,
        borderRadius: 50
    }
})