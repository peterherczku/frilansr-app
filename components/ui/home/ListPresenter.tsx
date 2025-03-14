import {FlatList, Platform, StyleSheet, Text, TouchableOpacity, View, ViewStyle} from "react-native";
import {ReactNode} from "react";
import {Image} from "expo-image";
import {Colors} from "@/constants/Colors";
import {AntDesign, FontAwesome6} from "@expo/vector-icons";

export function ListingPresenterTitle({ children }) {
    return <View style={styles.row}>
        {children}
        <TouchableOpacity style={styles.row}>
            <Text style={[styles.text, styles.greenText]}>
                Show all
            </Text>
            <AntDesign name="arrowright" size={20} style={{marginLeft: 6, marginRight: -15}} color={Colors.light.themeColor} />
        </TouchableOpacity>
    </View>
}

export function ListingPresenterElements({ data } : { data: {
        image: string,
        workplace: string,
        salary: string,
        title: string
    }[]}) {
    function renderItem({item, index}) {
        return <View style={[
            styles.box,
            index === 0 && {marginLeft: 20},
            index === data.length - 1 && {marginRight: 20},
        ]}>
            <Image style={styles.image} source={{uri: item.image}} />
            <View style={styles.overlay} />
            <View style={styles.informationContainer}>
                <View style={styles.textContainer}>
                    <Text style={[styles.text, styles.workplaceText]}>{item.workplace}</Text>
                    <Text style={[styles.text, styles.titleText]}>{item.title}</Text>
                </View>
                <View style={[styles.detailsContainer]}>
                    <View style={styles.detailsRow}>
                        <FontAwesome6 name="sack-dollar" size={10} color={Colors.light.muted} />
                        <Text style={[styles.text, styles.detailText]}>{item.salary}</Text>
                    </View>
                    <View style={styles.separator} />
                    <View style={styles.detailsRow}>
                        <FontAwesome6 name="location-dot" size={10} color={Colors.light.muted} />
                        <Text style={[styles.text, styles.detailText]}>{item.location}</Text>
                    </View>
                </View>
            </View>
        </View>
    }

    return <View>
        <FlatList style={{paddingBottom:10}} data={data} renderItem={renderItem} horizontal={true} showsHorizontalScrollIndicator={false} />
    </View>
}

export function ListingPresenter({ style, children } : { style?: ViewStyle, children: ReactNode }) {
    return <View style={[styles.container, style]}>
        {children}
    </View>
}

const styles = StyleSheet.create({
    text: {
      fontFamily: "Zain",
      fontSize: 20,
        color: Colors.light.text
    },
    greenText: {
        color: Colors.light.themeColor,
        textDecorationLine: "underline"
    },
    container: {
        flexDirection: "column",
        gap: 20,
    },
    row: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginHorizontal: 20,
    },
    box: {
        flexDirection: "column",
        marginHorizontal: 5,
        position: "relative",
    },
    informationContainer: {
        paddingLeft: 10,
        paddingTop: 6,
        borderBottomRightRadius: 8,
        borderBottomLeftRadius: 8,
        backgroundColor: "white",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3,
        elevation: 3,
        overflow: "visible",
        paddingBottom: 5,
    },
    image: {
        borderTopLeftRadius: 8,
        borderTopRightRadius: 8,
        width: 220,
        height: 220 * 0.6
    },
    overlay: {
        borderTopLeftRadius: 8,
        borderTopRightRadius: 8,
        position: "absolute",
        width: 220,
        height: 220 * 0.6,
        backgroundColor: "rgba(0,0,0,0.35)"
    },
    textContainer: {
        paddingBottom: 6,
    },
    detailsContainer: {
        paddingTop: 8,
        borderTopWidth: 1,
        borderStyle: "dashed",
        borderColor: Colors.light.muted,
        flexDirection: "row",
        gap: 8,
        alignItems: "center",
    },
    detailsRow: {
        flexDirection: "row",
        alignItems: "center",
        gap: 5
    },
    workplaceText: {
        color: Colors.light.muted,
        fontSize: 13,
        fontFamily: "Zain-ExtraBold"
    },
    titleText: {
        marginTop: -6,
        fontSize: 17,
        fontFamily: "Zain-Bold"
    },
    detailText: {
        fontSize: 13,
        color: Colors.light.muted,
        fontFamily: "Zain-Bold"
    },
    separator: {
        width: 5,
        height: 5,
        borderRadius: 50,
        backgroundColor: Colors.light.muted
    }
})