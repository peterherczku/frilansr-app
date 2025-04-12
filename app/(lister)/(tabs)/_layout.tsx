import { Tabs, useRouter } from "expo-router";
import React from "react";
import { HapticTab } from "@/components/ui/HapticTab";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import { FontAwesome, FontAwesome6, Ionicons } from "@expo/vector-icons";
import { useDraftListing } from "@/hooks/listing/useDraftListing";
import { getPage } from "@/utils/createListingUtil";

export default function ListerTabLayout() {
	const router = useRouter();
	const colorScheme = useColorScheme();
	const { draft } = useDraftListing();

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
						if (!draft) {
							router.push("/(lister)/(create-listing)/title");
							return;
						}
						const page = getPage(draft.draft);
						router.push(`/(lister)/(create-listing)/${page}`);
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
