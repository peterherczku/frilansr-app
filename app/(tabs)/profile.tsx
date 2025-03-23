import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { useAuth, useClerk } from "@clerk/clerk-expo";
import { Redirect, router } from "expo-router";
import { useEffect } from "react";
import { Header } from "@/components/Header";
import { ProfileHeader } from "@/components/ui/profile/ProfileHeader";
import {
	ProfilePaymentBox,
	ProfilePaymentBoxItem,
} from "@/components/ui/profile/ProfilePaymentBox";
import { ProfileAffiliateProgram } from "@/components/ui/profile/ProfileAffiliateProgram";
import { ProfileRecentWorks } from "@/components/ui/profile/ProfileRecentWorks";
import {
	ProfileSettingsBox,
	ProfileSettingsBoxItem,
} from "@/components/ui/profile/ProfileSettingsBox";
import { Footer } from "@/components/Footer";
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
		<SafeAreaView style={styles.safeContainer}>
			<Header />
			<ScrollView>
				<ProfileHeader />
				<ProfilePaymentBox>
					<ProfilePaymentBoxItem
						title={"Payment history"}
						subtitle={"15 payments"}
						onPress={() => router.push("/(settings)/(payment)/history")}
					/>
					<View
						style={{ height: 2, backgroundColor: "#ECECEC", borderRadius: 8 }}
					/>
					<ProfilePaymentBoxItem
						title={"Go to Payment settings"}
						onPress={() => router.push("/(settings)/(payment)/payment")}
					/>
				</ProfilePaymentBox>
				<ProfileAffiliateProgram />
				<ProfileRecentWorks data={data} />
				<ProfileSettingsBox>
					<ProfileSettingsBoxItem
						onPress={() => router.push("/(settings)/account")}
						title={"Account"}
					/>
					<View
						style={{ height: 2, backgroundColor: "#ECECEC", borderRadius: 8 }}
					/>
					<ProfileSettingsBoxItem
						onPress={() => router.push("/(settings)/payment")}
						title={"Payment"}
					/>
					<View
						style={{ height: 2, backgroundColor: "#ECECEC", borderRadius: 8 }}
					/>
					<ProfileSettingsBoxItem title={"Change to Job Lister mode"} />
					<View
						style={{ height: 2, backgroundColor: "#ECECEC", borderRadius: 8 }}
					/>
					<ProfileSettingsBoxItem title={"Delete account"} destructive={true} />
				</ProfileSettingsBox>
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
});
