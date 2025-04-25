import { Image } from "expo-image";
import { TouchableOpacity, View } from "react-native";
import { Text } from "../ui/Text";
import { useCountdown } from "@/hooks/useCountdown";
import { LocationMapView } from "../listing/LocationBox";
import { JobWithUser } from "@/api/jobFunctions";
import { Circle } from "react-native-maps";
import { useDistance } from "@/hooks/useDistance";
import { useStartJob } from "@/hooks/job/useStartJob";

export function ActiveJobWidget({ job }: { job: JobWithUser }) {
	const remainingTime = useCountdown(job.listing.date);
	const distance = useDistance(job.listing.location);

	const canStart = remainingTime.minutes <= 5;

	const { startJob, isPending, error } = useStartJob();

	return (
		<View className="mx-[20] gap-[10] shadow-custom bg-white rounded-[20] pb-[15]">
			<View className="relative">
				<Image
					source={{
						uri: job.listing.image,
					}}
					className="w-full h-[250] rounded-t-[20]"
				/>
				<View className="bg-black opacity-30 absolute top-0 left-0 w-full h-full z-10 rounded-t-[20]" />
			</View>
			<View className="justify-center items-center flex-row gap-[8]">
				<Text className="text-[30px]">Job starts in</Text>
				<Text className="text-[30px] font-zain-extrabold">
					{remainingTime.minutes}m {remainingTime.seconds}s
				</Text>
			</View>
			<View className="justify-center items-center mx-[15]">
				{error && <Text className="text-red-500">{error.message}</Text>}
				<TouchableOpacity
					disabled={!canStart || isPending}
					className="bg-theme w-full rounded-lg p-3 justify-center items-center disabled:opacity-60"
					onPress={async () => await startJob(job.id)}
				>
					<Text className="text-xl font-zain-bold text-white">
						{canStart ? "Start now " : "You cannot start the job yet"}
					</Text>
				</TouchableOpacity>
			</View>
			<View className="mx-[15] gap-[5]">
				<View>
					<Text className="text-xl font-zain-bold">Location</Text>
					<Text className="text-muted mt-[-6]">
						You are currently {distance} km away from the start location
					</Text>
				</View>
				<View className="relative">
					<LocationMapView
						initialRegion={{
							...job.listing.location,
							latitudeDelta: 0.0025,
							longitudeDelta: 0.0025,
						}}
						disabled={true}
					>
						<Circle
							center={job.listing.location}
							radius={25}
							strokeWidth={2}
							strokeColor="rgba(52, 152, 219, 0.8)"
							fillColor="rgba(52, 152, 219, 0.5)"
						/>
					</LocationMapView>
					<View className="bg-black opacity-30 z-10 absolute top-0 left-0 w-full h-full rounded-lg" />
				</View>
			</View>
		</View>
	);
}
