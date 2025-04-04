import { ScrollView } from "react-native";
import { Header } from "@/components/Header";
import { IconScrollView } from "@/components/ui/home/IconScrollView";
import { FeaturedCarousel } from "@/components/ui/home/FeaturedCarousel";
import {
	ListingPresenter,
	ListingPresenterTitle,
} from "@/components/ui/home/ListPresenter";
import { Footer } from "@/components/Footer";
import { SafeAreaView } from "react-native-safe-area-context";
import { NearbyListings } from "@/components/ui/home/NearbyListings";
import { Text } from "@/components/ui/Text";

export default function HomeScreen() {
	return (
		<SafeAreaView className="flex-1 bg-white">
			<Header />
			<ScrollView>
				<IconScrollView />
				<FeaturedCarousel />
				<ListingPresenter>
					<ListingPresenterTitle>
						<Text className="text-2xl">Near you</Text>
					</ListingPresenterTitle>
					<NearbyListings />
				</ListingPresenter>
				<ListingPresenter className="mt-[10]">
					<ListingPresenterTitle>
						<Text className="text-2xl">Long-term works</Text>
					</ListingPresenterTitle>
					{/*<ListingPresenterElements data={longTermData} />*/}
				</ListingPresenter>
				<Footer />
			</ScrollView>
		</SafeAreaView>
	);
}
