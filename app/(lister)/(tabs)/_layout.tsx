import { Tabs, useNavigation, useRouter } from "expo-router";
import React, { useState } from "react";
import { HapticTab } from "@/components/ui/HapticTab";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import { FontAwesome, FontAwesome6, Ionicons } from "@expo/vector-icons";
import { useDraftListing } from "@/hooks/listing/draft/useDraftListing";
import { getPage, restoreRouter } from "@/utils/createListingUtil";
import { ActivityIndicator, View } from "react-native";
import { CommonActions } from "@react-navigation/native";

export default function ListerTabLayout() {
	const router = useRouter();
	const navigation = useNavigation();
	const colorScheme = useColorScheme();
	const { refetch } = useDraftListing({
		enabled: false,
	});
	const [loading, setLoading] = useState(false);

	if (loading) {
		return (
			<View className="flex-1 justify-center items-center">
				<ActivityIndicator
					size="large"
					color={Colors[colorScheme ?? "light"].text}
				/>
			</View>
		);
	}

	return (
		<Tabs
			screenOptions={{
				tabBarActiveTintColor: Colors[colorScheme ?? "light"].text,
				headerShown: false,
				tabBarButton: HapticTab,
				tabBarLabelStyle: {
					fontFamily: "Zain-Bold",
					fontSize: 14,
				},
				tabBarStyle: {
					borderTopWidth: 0,
					position: "absolute",
					shadowOffset: {
						width: 0,
						height: 4,
					},
					shadowOpacity: 0.25,
					shadowRadius: 4,
				},
			}}
		>
			<Tabs.Screen
				name="index"
				options={{
					title: "Active",
					tabBarIcon: ({ color }) => (
						<Ionicons size={23} color={color} name={"home-outline"} />
					),
				}}
			/>
			<Tabs.Screen
				name="applications"
				options={{
					title: "Applications",
					tabBarIcon: ({ color }) => (
						<FontAwesome6 size={23} name="clipboard-user" color={color} />
					),
				}}
			/>
			<Tabs.Screen
				name="create-listing"
				options={{
					title: "Create",
					tabBarIcon: ({ color }) => (
						<Ionicons size={23} color={color} name={"add-circle-outline"} />
					),
				}}
				listeners={{
					tabPress: async (e) => {
						e.preventDefault();
						setLoading(true);
						const draft = await refetch();
						if (draft.error || !draft.data) {
							setLoading(false);
							router.push("/(lister)/(create-listing)/title");
							return;
						}
						const page = getPage(draft.data.draft);
						restoreRouter(navigation, page);
						setLoading(false);
					},
				}}
			/>
			<Tabs.Screen
				name="payments"
				options={{
					title: "Payments",
					tabBarIcon: ({ color }) => (
						<Ionicons size={23} color={color} name={"card-outline"} />
					),
				}}
			/>
			<Tabs.Screen
				name="profile"
				options={{
					title: "Profile",
					tabBarIcon: ({ color }) => (
						<FontAwesome size={23} name="user-circle-o" color={color} />
					),
				}}
			/>
		</Tabs>
	);
}
