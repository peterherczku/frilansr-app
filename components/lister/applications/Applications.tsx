import { ListingWithApplications } from "@/api/listingFunctions";
import { Text } from "@/components/ui/Text";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { FlatList, TouchableOpacity, View } from "react-native";

function UpcomingHeader({ listing }: { listing: ListingWithApplications }) {
	return (
		<View className="flex-col">
			<View className="flex-row items-center gap-[10]">
				<Text className="text-2xl font-zain-bold">{listing.title}</Text>
			</View>
			<View className="flex-row items-center gap-[5] mt-[-5]">
				<Text className="text-muted">{listing.salary} kr</Text>
				<Text className="text-muted">•</Text>
				<Text className="text-muted">{listing.duration} mins</Text>
			</View>
		</View>
	);
}

function UpcomingBody({ listing }: { listing: ListingWithApplications }) {
	const router = useRouter();
	function showModal() {
		router.push({
			pathname: "/(lister)/(listing-applications)/listing-applications",
			params: { id: listing.id },
		});
	}

	return (
		<View className="flex-row items-center justify-between">
			<View className="flex-col">
				<View className="flex-row items-center gap-[10]">
					<Text>Applications</Text>
					<View className="flex-row  relative w-[60] h-[20]">
						{listing.applications.slice(0, 3).map((application) => (
							<Image
								key={application.id}
								source={{ uri: application.user.imageUrl }}
								className="absolute top-0 left-0 w-[20] h-[20] rounded-full shadow-md"
							/>
						))}
					</View>
				</View>
				<Text className="text-muted text-sm mt-[-4]">
					{listing.applications.length} applications pending
				</Text>
			</View>
			<TouchableOpacity
				onPress={showModal}
				className="flex-row items-center justify-between py-[6] px-[10] bg-[#88B478] rounded-lg"
			>
				<Text className="font-zain-bold text-white">See applications</Text>
			</TouchableOpacity>
		</View>
	);
}

export function Applications({
	listings,
}: {
	listings: ListingWithApplications[];
}) {
	function renderItem({ item }: { item: ListingWithApplications }) {
		return (
			<View className="mx-[20] my-[10] p-[10] rounded-lg shadow-custom bg-white flex-col gap-[15]">
				<View className="flex-row items-center justify-between">
					<UpcomingHeader listing={item} />
				</View>
				<UpcomingBody listing={item} />
			</View>
		);
	}

	return (
		<FlatList
			style={{ marginBottom: 60 }}
			data={listings}
			renderItem={renderItem}
			keyExtractor={(listing) => listing.id}
		/>
	);
}

export function ApplicationsHeader({
	listings,
}: {
	listings: ListingWithApplications[];
}) {
	return (
		<View className="mx-[20] mb-[10]">
			<Text className="text-3xl font-zain-bold">Applications</Text>
			<Text className="text-xl text-muted mt-[-9]">
				You currently have {listings.length} pending listings
			</Text>
		</View>
	);
}
