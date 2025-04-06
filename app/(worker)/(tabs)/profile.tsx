import { ScrollView, View } from "react-native";
import { useClerk } from "@clerk/clerk-expo";
import { router } from "expo-router";
import { Header } from "@/components/ui/Header";
import { ProfileHeader } from "@/components/profile/ProfileHeader";
import {
	ProfilePaymentBox,
	ProfilePaymentBoxItem,
} from "@/components/profile/ProfilePaymentBox";
import { ProfileAffiliateProgram } from "@/components/profile/ProfileAffiliateProgram";
import { ProfileRecentWorks } from "@/components/profile/ProfileRecentWorks";
import {
	ProfileSettingsBox,
	ProfileSettingsBoxItem,
} from "@/components/profile/ProfileSettingsBox";
import { Footer } from "@/components/ui/Footer";
import { SafeAreaView } from "react-native-safe-area-context";

const data = [
	{
		id: 0,
		title: "Walk with Max",
		workType: "Dog walking",
		earnedMoney: "180 kr",
		duration: "45 minutes",
		image:
			"https://media.istockphoto.com/id/1386939001/photo/young-man-and-his-dog-walking-on-a-rainy-day.jpg?s=612x612&w=0&k=20&c=hBBYAnrNcu2h16UwaO4k9ePC7u0mUYfoIZgdc_BJ-Ws=",
	},
	{
		id: 1,
		title: "Netflix",
		workType: "Software engineering",
		earnedMoney: "35000 kr",
		duration: "1 month",
		image:
			"https://images.ctfassets.net/i5wc420v2vd1/5dOUDH5gGwfJn2v46DAZJt/aa64e6719a8e5faef084ea57c18e48ed/BW7A0361.jpg",
	},
	{
		id: 2,
		title: "Meta",
		workType: "Accounting",
		earnedMoney: "42000 kr",
		duration: "2 months",
		image: "https://propmodo.com/wp-content/uploads/2022/10/meta.webp",
	},
];

export default function ProfileScreen() {
	const { signOut } = useClerk();
	return (
		<SafeAreaView className="flex-1 bg-white">
			<Header />
			<ScrollView>
				<ProfileHeader />
				<ProfilePaymentBox>
					<ProfilePaymentBoxItem
						title={"Payment history"}
						subtitle={"15 payments"}
						onPress={() =>
							router.push("/(worker)/(settings)/(payment)/history")
						}
					/>
					<View className="h-[2] bg-[#ECECEC] rounded-lg" />
					<ProfilePaymentBoxItem
						title={"Go to Payment settings"}
						onPress={() =>
							router.push("/(worker)/(settings)/(payment)/payment")
						}
					/>
				</ProfilePaymentBox>
				<ProfileAffiliateProgram />
				<ProfileRecentWorks data={data} />
				<ProfileSettingsBox>
					<ProfileSettingsBoxItem
						onPress={() => router.push("/(worker)/(settings)/account")}
						title={"Account"}
					/>
					<View className="h-[2] bg-[#ECECEC] rounded-lg" />
					<ProfileSettingsBoxItem
						onPress={() => router.push("/(worker)/(settings)/payment")}
						title={"Payment"}
					/>
					<View className="h-[2] bg-[#ECECEC] rounded-lg" />

					<ProfileSettingsBoxItem
						onPress={() => router.replace("/(lister)/(tabs)/")}
						title={"Change to Job Lister mode"}
					/>
					<View className="h-[2] bg-[#ECECEC] rounded-lg" />
					<ProfileSettingsBoxItem title={"Delete account"} destructive={true} />
				</ProfileSettingsBox>
				<Footer />
			</ScrollView>
		</SafeAreaView>
	);
}
