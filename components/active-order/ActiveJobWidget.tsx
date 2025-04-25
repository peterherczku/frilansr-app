import { Image } from "expo-image";
import { TouchableOpacity, View } from "react-native";
import { Text } from "../ui/Text";
import { LocationMapView } from "../listing/LocationBox";
import { JobWithUser } from "@/api/jobFunctions";
import { Circle } from "react-native-maps";
import { useDistance } from "@/hooks/useDistance";
import { useStartJob } from "@/hooks/job/useStartJob";
import { router } from "expo-router";
import { useTimeDifference } from "@/hooks/useCountdown";
import { useStopJob } from "@/hooks/job/useStopJob";

export function ActiveJobWidget({ job }: { job: JobWithUser }) {
	const remainingTime = useTimeDifference(job.listing.date);
	const distance = useDistance(job.listing.location);

	const canStart =
		job.status === "WAITING_FOR_WORKER" ? remainingTime.minutes <= 5 : true;

	const { startJob, isPending, error } = useStartJob();
	const { stopJob, isPending: isStopPending, error: stopError } = useStopJob();

	async function onPress() {
		switch (job.status) {
			case "WAITING_FOR_WORKER":
				await startJob(job.id);
			case "IN_PROGRESS":
				router.push("/(worker)/active-job");
			default:
		}
	}

	async function onStopPress() {
		await stopJob(job.id);
	}

	function getButtonText() {
		if (job.status === "WAITING_FOR_WORKER") {
			if (canStart) return "Start now";
			return "You cannot start the job yet";
		}
		if (job.status === "IN_PROGRESS") {
			return "See details";
		}
		if (job.status === "COMPLETED") {
			return "Job completed";
		}
	}

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
				<View className="shadow-lg px-2 py-[2] absolute left-[15] top-[15] bg-white rounded-lg z-20">
					<Text className="text-lg">{job.listing.title}</Text>
				</View>
			</View>
			<View className="justify-center items-center flex-row gap-[7]">
				<Text className="text-[30px]">
					{job.status === "WAITING_FOR_WORKER" && "Job starts in"}
					{job.status === "IN_PROGRESS" && "Job started"}
				</Text>
				<Text className="text-[30px] font-zain-extrabold">
					{remainingTime.minutes}m {remainingTime.seconds}s
				</Text>
				{job.status === "IN_PROGRESS" && (
					<Text className="text-[30px]">ago</Text>
				)}
			</View>
			<View className="justify-center items-center mx-[15] gap-[8]">
				{stopError && <Text className="text-red-500">{stopError.message}</Text>}
				{error && <Text className="text-red-500">{error.message}</Text>}
				{job.status === "IN_PROGRESS" && (
					<TouchableOpacity
						onPress={onStopPress}
						disabled={isStopPending}
						className="bg-red-300 w-full p-3 justify-center items-center rounded-lg disabled:opacity-60"
					>
						<Text className="text-red-800 text-xl font-zain-bold">
							Stop work
						</Text>
					</TouchableOpacity>
				)}
				<TouchableOpacity
					disabled={!canStart || isPending || job.status === "COMPLETED"}
					className="bg-theme w-full rounded-lg p-3 justify-center items-center disabled:opacity-60"
					onPress={onPress}
				>
					<Text className="text-xl font-zain-bold text-white">
						{getButtonText()}
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
