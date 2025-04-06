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

export default function ListerTabLayout() {
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
					title: "Listings",
					tabBarIcon: ({ color }) => (
						<Ionicons size={23} color={color} name={"home-outline"} />
					),
				}}
			/>
		</Tabs>
	);
}
