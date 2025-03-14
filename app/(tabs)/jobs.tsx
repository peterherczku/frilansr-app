import {Header} from "@/components/Header";
import {ScrollView, StyleSheet, Text} from "react-native";
import {IconScrollView} from "@/components/ui/home/IconScrollView";
import {FeaturedCarousel} from "@/components/ui/home/FeaturedCarousel";
import {ListingPresenter, ListingPresenterElements, ListingPresenterTitle} from "@/components/ui/home/ListPresenter";
import {Footer} from "@/components/Footer";
import {MySafeAreaView as SafeAreaView} from "@/components/SafeAreaView";
import {Colors} from "@/constants/Colors";
import {SearchBar} from "@/components/ui/jobs/SearchBar";

export default function JobsScreen() {
  return (
      <SafeAreaView style={styles.safeContainer}>
        <Header />
        <SearchBar />
      </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
    backgroundColor: "#fff",
  },
  text: {
    fontFamily: "Zain-Bold",
    fontSize: 22,
    color: Colors.light.text
  }
})
