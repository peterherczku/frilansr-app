import {
	ActiveListings,
	ActiveListingsHeader,
} from "@/components/lister/activeListings/ActiveListings";
import { Header } from "@/components/ui/Header";
import { Text } from "@/components/ui/Text";
import { useUserRoleUpdate } from "@/hooks/user/useUserRoleUpdate";
import { showConfirmModal } from "@/utils/modalCallbacks";
import { CommonActions } from "@react-navigation/native";
import { router, useNavigation } from "expo-router";
import { Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const jobs = [
	{
		id: "0",
		listing: {
			id: "1",
			title: "Dog walking",
			description: "Dog walking in the park",
			image:
				"https://i.ytimg.com/vi/fa3Slv2i0Uw/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLAWGk8rcsk5pPehDJ-uhCLmw0q9EA",
			salary: 170,
			location: {
				longitude: 18.0649,
				latitude: 59.33258,
			},
			createdAt: "2023-10-01T12:00:00Z",
			type: "DOG_WALKING",
			date: "2025-10-01T12:00:00Z",
			duration: 40,
			user: {
				id: "1",
				imageUrl:
					"https://t4.ftcdn.net/jpg/03/64/21/11/360_F_364211147_1qgLVxv1Tcq0Ohz3FawUfrtONzz8nq3e.jpg",
				name: "John Doe",
			},
		},
		status: "ONGOING" as const,
		worker: {
			id: "10",
			imageUrl:
				"https://t4.ftcdn.net/jpg/03/64/21/11/360_F_364211147_1qgLVxv1Tcq0Ohz3FawUfrtONzz8nq3e.jpg",
			name: "Jane Smith",
		},
	},
	{
		id: "1",
		listing: {
			id: "1",
			title: "Dog walking",
			description: "Dog walking in the park",
			image:
				"https://i.ytimg.com/vi/fa3Slv2i0Uw/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLAWGk8rcsk5pPehDJ-uhCLmw0q9EA",
			salary: 170,
			location: {
				longitude: 12.5655,
				latitude: 55.6761,
			},
			createdAt: "2023-10-01T12:00:00Z",
			type: "DOG_WALKING",
			date: "2025-10-01T12:00:00Z",
			duration: 40,
			user: {
				id: "1",
				imageUrl:
					"https://t4.ftcdn.net/jpg/03/64/21/11/360_F_364211147_1qgLVxv1Tcq0Ohz3FawUfrtONzz8nq3e.jpg",
				name: "John Doe",
			},
		},
		status: "PENDING" as const,
		applications: [
			{
				id: "1",
				imageUrl:
					"https://t4.ftcdn.net/jpg/03/64/21/11/360_F_364211147_1qgLVxv1Tcq0Ohz3FawUfrtONzz8nq3e.jpg",
				name: "Jane Smith",
			},
			{
				id: "2",
				imageUrl:
					"https://media.istockphoto.com/id/1437816897/photo/business-woman-manager-or-human-resources-portrait-for-career-success-company-we-are-hiring.jpg",
				name: "Alice Johnson",
			},
			{
				id: "3",
				imageUrl:
					"https://media.istockphoto.com/id/1386479313/photo/happy-millennial-afro-american-business-woman-posing-isolated-on-white.jpg",
				name: "Bob Brown",
			},
		],
	},
];

export default function ListerIndexPage() {
	const { updateRole } = useUserRoleUpdate();
	const navigation = useNavigation();

	function handleConfirmModal() {
		showConfirmModal({
			message:
				"Are you sure you want to change to job lister mode? This means that all your current and upcoming jobs will be revoked. Are you sure you want to proceed?",
			onConfirm: async () => {
				try {
					await updateRole("WORKER");
					router.replace("/(worker)/(tabs)/");
					navigation.dispatch(
						CommonActions.reset({
							index: 0,
							routes: [{ name: "(worker)", params: { screen: "(tabs)" } }],
						})
					);
				} catch (err) {
					console.error("Failed to update role:", err);
				}
			},
		});
	}

	return (
		<SafeAreaView className="flex-1 bg-white">
			<Header />
			<Pressable onPress={handleConfirmModal}>
				<Text className="">Change back to Worker</Text>
			</Pressable>
			<ActiveListingsHeader />
			<ActiveListings jobs={jobs} />
		</SafeAreaView>
	);
}
