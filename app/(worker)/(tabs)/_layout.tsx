import { Tabs, useRouter } from "expo-router";
import React from "react";
import { HapticTab } from "@/components/ui/HapticTab";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import {
	FontAwesome,
	Ionicons,
	MaterialCommunityIcons,
} from "@expo/vector-icons";
import { useAuth } from "@clerk/clerk-expo";

export default function TabLayout() {
	const router = useRouter();
	const colorScheme = useColorScheme();
	const { isSignedIn } = useAuth();

	return (
		<Tabs
			screenOptions={{
				tabBarActiveTintColor: Colors[colorScheme ?? "light"].text,
				headerShown: false,
				tabBarButton: HapticTab,
				tabBarLabelStyle: {
					fontFamily: "Zain-Bold",
					fontSize: 16,
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
					title: "Discover",
					tabBarIcon: ({ color }) => (
						<Ionicons size={23} color={color} name={"home-outline"} />
					),
				}}
			/>
			<Tabs.Screen
				name="jobs"
				options={{
					title: "Jobs",
					tabBarIcon: ({ color }) => (
						<MaterialCommunityIcons size={23} name="finance" color={color} />
					),
				}}
			/>
			<Tabs.Screen
				name="calendar"
				options={{
					title: "Calendar",
					tabBarIcon: ({ color }) => (
						<Ionicons size={23} name="calendar-outline" color={color} />
					),
				}}
				listeners={{
					tabPress: (e) => {
						if (!isSignedIn) {
							e.preventDefault();
							router.push("/(auth)/sign-in");
						}
					},
				}}
			/>
			<Tabs.Screen
				name="past-jobs"
				options={{
					title: "Past Jobs",
					tabBarIcon: ({ color }) => (
						<Ionicons size={23} name="folder-open-outline" color={color} />
					),
				}}
				listeners={{
					tabPress: (e) => {
						if (!isSignedIn) {
							e.preventDefault();
							router.push("/(auth)/sign-in");
						}
					},
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
				listeners={{
					tabPress: (e) => {
						if (!isSignedIn) {
							e.preventDefault();
							router.push("/(auth)/sign-in");
						}
					},
				}}
			/>
		</Tabs>
	);
}
