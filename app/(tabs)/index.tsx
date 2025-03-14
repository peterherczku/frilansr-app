import {ScrollView, StyleSheet, Text, View} from "react-native";
import {Header} from "@/components/Header";
import {MySafeAreaView as SafeAreaView} from "@/components/SafeAreaView";
import {IconScrollView} from "@/components/ui/home/IconScrollView";
import {FeaturedCarousel} from "@/components/ui/home/FeaturedCarousel";
import {ListingPresenter, ListingPresenterElements, ListingPresenterTitle} from "@/components/ui/home/ListPresenter";
import {Colors} from "@/constants/Colors";
import {Footer} from "@/components/Footer";

const nearYouData = [
    {
        id: 0,
        title: "Paper work",
        workplace: "Google",
        salary: "800 kr / hour",
        location: "Central Stockholm",
        image: "https://www.evolution-design.info/var/site/storage/images/evolution-design/all-projects/commercial/google-dublin/13285-1-eng-GB/google-dublin_i1920.jpg"
    },
    {
        id: 1,
        title: "Dog walk",
        workplace: "Walk with Max",
        salary: "100 kr / hour",
        location: "Central Stockholm",
        image: "https://media.istockphoto.com/id/1386939001/photo/young-man-and-his-dog-walking-on-a-rainy-day.jpg?s=612x612&w=0&k=20&c=hBBYAnrNcu2h16UwaO4k9ePC7u0mUYfoIZgdc_BJ-Ws="
    }
];

const longTermData = [
    {
        id: 0,
        title: "Software engineering",
        workplace: "Netflix",
        salary: "35000 kr / month",
        location: "New York",
        image: "https://images.ctfassets.net/i5wc420v2vd1/5dOUDH5gGwfJn2v46DAZJt/aa64e6719a8e5faef084ea57c18e48ed/BW7A0361.jpg"
    },
    {
        id: 1,
        title: "Accounting",
        workplace: "Meta",
        salary: "45000 kr / month",
        location: "San Francisco",
        image: "https://propmodo.com/wp-content/uploads/2022/10/meta.webp"
    }
]

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.safeContainer}>
        <Header />
        <ScrollView>
            <IconScrollView />
            <FeaturedCarousel />
            <ListingPresenter>
                <ListingPresenterTitle>
                    <Text style={styles.text}>Near you</Text>
                </ListingPresenterTitle>
                <ListingPresenterElements data={nearYouData} />
            </ListingPresenter>
            <ListingPresenter style={{ marginTop: 10 }}>
                <ListingPresenterTitle>
                    <Text style={styles.text}>Long-term works</Text>
                </ListingPresenterTitle>
                <ListingPresenterElements data={longTermData} />
            </ListingPresenter>
            <Footer />
        </ScrollView>
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