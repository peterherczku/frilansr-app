import {FlatList, Pressable, StyleSheet, Text, View} from "react-native";
import {Image} from "expo-image";
import {Colors} from "@/constants/Colors";
import {FontAwesome6} from "@expo/vector-icons";

export function SearchResults({ results } : { results: {
        id: number,
        title: string,
        category: string,
        location: string,
        salary: string,
        duration: string,
        image: string
    }[]}) {

    function renderItem({item}) {
        return <Pressable style={styles.box}>
            <View style={styles.imageContainer}>
                <Image source={{uri: item.image}} style={styles.image} />
                <View style={styles.imageOverlay} />
            </View>
            <View>
                <Text style={[styles.text, styles.title]}>{item.title}</Text>
                <Text style={[styles.text, styles.mutedText, { marginTop: -8}]}>{item.category}</Text>
                <View style={styles.detailsRow}>
                    <View style={styles.detailsRow}>
                        <FontAwesome6 name="sack-dollar" size={12} color={Colors.light.muted} />
                        <Text style={[styles.text, styles.mutedText, { marginTop: 2, marginLeft: -2 }]}>{item.salary}</Text>
                    </View>
                    <View style={styles.separator} />
                    <View style={styles.detailsRow}>
                        <FontAwesome6 name="map-location-dot" size={12} color={Colors.light.muted} />
                        <Text style={[styles.text, styles.mutedText, { marginTop: 2, marginLeft: -2 }]}>{item.location}</Text>
                    </View>
                    <View style={styles.separator} />
                    <View style={styles.detailsRow}>
                        <FontAwesome6 name="clock" size={12} color={Colors.light.muted} />
                        <Text style={[styles.text, styles.mutedText, { marginTop: 2, marginLeft: -2 }]}>{item.duration}</Text>
                    </View>
                </View>
            </View>
        </Pressable>
    }

    return <View style={styles.container}>
        <FlatList style={{flex: 1}} data={results} renderItem={renderItem} keyExtractor={(item) => item.id} />
    </View>
}

const styles = StyleSheet.create({
   container: {
       flex: 1,
   },
   box: {
       paddingHorizontal: 20,
       paddingVertical: 8,
       flexDirection: "row",
       gap: 12,
       alignItems: "center"
   },
    imageContainer: {
        position: "relative",
    },
   image: {
       width: 70,
       height: 70,
       borderRadius: 8
   },
    imageOverlay: {
       position: "absolute",
        top: 0,
        left: 0,
        width: 70,
        height: 70,
        borderRadius: 8,
        backgroundColor: "rgba(0, 0, 0, 0.4)"
    },
    text: {
       fontFamily: "Zain",
        fontSize: 14,
        color: Colors.light.text
    },
    title: {
       fontFamily: "Zain-Bold",
        fontSize: 16
    },
    mutedText: {
       color: Colors.light.muted
    },
    detailsRow: {
       flexDirection: "row",
       gap: 10,
        alignItems: "center"
    },
    separator: {
       width: 5,
        height: 5,
        borderRadius: 8,
        backgroundColor: Colors.light.muted
    }
});