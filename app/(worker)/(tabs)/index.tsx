import { ScrollView } from "react-native";
import { Header } from "@/components/ui/Header";
import { IconScrollView } from "@/components/home/IconScrollView";
import { FeaturedCarousel } from "@/components/home/FeaturedCarousel";
import {
	ListingPresenter,
	ListingPresenterTitle,
} from "@/components/home/ListPresenter";
import { Footer } from "@/components/ui/Footer";
import { SafeAreaView } from "react-native-safe-area-context";
import { NearbyListings } from "@/components/home/NearbyListings";
import { Text } from "@/components/ui/Text";
import { FloatingActiveOrder } from "@/components/home/FloatingActiveOrder";

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
			<FloatingActiveOrder />
		</SafeAreaView>
	);
}
