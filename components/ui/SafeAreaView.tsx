import {Platform, SafeAreaView, StyleSheet, StatusBar } from "react-native";

export function MySafeAreaView({ style, children }) {
    return <SafeAreaView style={[style, styles.AndroidSafeArea]}>
        {children}
    </SafeAreaView>
}

const styles = StyleSheet.create({
    AndroidSafeArea: {
        flex: 1,
        backgroundColor: "white",
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
    }
});