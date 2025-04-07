import { Job } from "@/api/jobFunctions";
import { LocationMapView } from "@/components/listing/LocationBox";
import { Text } from "@/components/ui/Text";
import { Image } from "expo-image";
import { FlatList, TouchableOpacity, View } from "react-native";
import { Marker } from "react-native-maps";

function ActiveListingUpcomingHeader({ job }: { job: Job }) {
	return (
		<View className="flex-col">
			<View className="flex-row items-center gap-[10]">
				<Text className="text-2xl font-zain-bold">{job.listing.title}</Text>
				<View className="flex-row items-center py-[6] px-[10] bg-[#71B8CA] justify-between rounded-lg">
					<Text className="text-sm font-zain-bold text-white">Upcoming</Text>
				</View>
			</View>
			<View className="flex-row items-center gap-[5] mt-[-5]">
				<Text className="text-muted">{job.listing.salary} kr</Text>
				<Text className="text-muted">•</Text>
				<Text className="text-muted">{job.listing.duration} mins</Text>
			</View>
		</View>
	);
}

function ActiveListingUpcomingBody({ job }: { job: Job }) {
	return (
		<View className="flex-row items-center justify-between">
			<View className="flex-col">
				<View className="flex-row items-center gap-[10]">
					<Text>Applications</Text>
					<View className="flex-row  relative w-[60] h-[20]">
						{job.applications?.slice(0, 3).map((application) => (
							<Image
								key={application.id}
								source={{ uri: application.imageUrl }}
								className="absolute top-0 left-0 w-[20] h-[20] rounded-full shadow-md"
							/>
						))}
					</View>
				</View>
				<Text className="text-muted text-sm mt-[-4]">
					{job.applications?.length} applications pending
				</Text>
			</View>
			<TouchableOpacity className="flex-row items-center justify-between py-[6] px-[10] bg-[#71B8CA] rounded-lg">
				<Text className="font-zain-bold text-white">See applications</Text>
			</TouchableOpacity>
		</View>
	);
}

function ActiveListingOngoingHeader({ job }: { job: Job }) {
	return (
		<>
			<View className="flex-col">
				<View className="flex-row items-center gap-[10]">
					<Text className="text-2xl font-zain-bold">{job.listing.title}</Text>
				</View>
				<View className="flex-row items-center gap-[5] mt-[-5]">
					<Text className="text-muted">{job.listing.salary} kr</Text>
					<Text className="text-muted">•</Text>
					<Text className="text-muted">{job.listing.duration} mins</Text>
				</View>
			</View>
			<Image
				source={{
					uri: "https://t4.ftcdn.net/jpg/03/64/21/11/360_F_364211147_1qgLVxv1Tcq0Ohz3FawUfrtONzz8nq3e.jpg",
				}}
				className="w-[35] h-[35] rounded-full bg-[#d9d9d9]"
			/>
		</>
	);
}

function ActiveListingOngoingBody({ job }: { job: Job }) {
	const percent = 66;

	return (
		<View className="flex-col gap-[13]">
			<TouchableOpacity className="flex-row items-center justify-center py-[6] w-[180]  bg-[#88B478] rounded-lg">
				<Text className="font-zain-bold text-white">
					Message {job.worker?.name}
				</Text>
			</TouchableOpacity>
			<View className="relative bg-[#d9d9d9] rounded-full h-[18] w-full">
				<View
					className="absolute top-0 left-0 bg-[#55933E] h-[18] rounded-full"
					style={{ width: `${percent}%` }}
				/>
			</View>
			<View className="gap-[10]">
				<View>
					<Text className="font-zain-bold text-lg">
						Current location of {job.worker?.name}
					</Text>
					<Text className="text-muted mt-[-8]">
						If you see something suspicious, please contact us
					</Text>
				</View>
				<LocationMapView>
					<Marker coordinate={job.listing.location}>
						<View className="items-center justify-center">
							<View className="absolute w-[40] h-[40] rounded-full bg-theme opacity-40 animate-ping" />
							<View className="p-[3] bg-theme rounded-full shadow-lg shadow-theme">
								<Image
									source={{ uri: job.worker?.imageUrl }}
									className="w-[30] h-[30] rounded-full bg-white"
								/>
							</View>
						</View>
					</Marker>
				</LocationMapView>
			</View>
		</View>
	);
}

export function ActiveListings({ jobs }: { jobs: Job[] }) {
	function renderItem({ item }: { item: Job }) {
		return <ActiveListingElement job={item} />;
	}

	return (
		<FlatList
			style={{ marginBottom: 60 }}
			data={jobs}
			renderItem={renderItem}
			keyExtractor={(job) => job.id}
		/>
	);
}

export function ActiveListingElement({ job }: { job: Job }) {
	return (
		<View className="mx-[20] my-[10] p-[10] rounded-lg shadow-custom bg-white flex-col gap-[15]">
			<View className="flex-row items-center justify-between">
				{job.status === "PENDING" && <ActiveListingUpcomingHeader job={job} />}
				{job.status === "ONGOING" && <ActiveListingOngoingHeader job={job} />}
			</View>
			{job.status === "PENDING" && <ActiveListingUpcomingBody job={job} />}
			{job.status === "ONGOING" && <ActiveListingOngoingBody job={job} />}
		</View>
	);
}

export function ActiveListingsHeader() {
	return (
		<View className="mx-[20] mb-[10]">
			<Text className="text-3xl font-zain-bold">Active listings</Text>
			<Text className="text-xl text-muted mt-[-9]">
				You currently have 2 active listings
			</Text>
		</View>
	);
}
