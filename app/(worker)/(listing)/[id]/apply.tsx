import { LocationMapView } from "@/components/listing/LocationBox";
import { Text } from "@/components/ui/Text";
import { Colors } from "@/constants/Colors";
import { useApplyForListing } from "@/hooks/listing/useApplyForListing";
import { useListing } from "@/hooks/listing/useListing";
import { useDistance } from "@/hooks/useDistance";
import { formatDate } from "@/utils/dateUtil";
import {
	convertCentsToDecimalString,
	formatMoney,
	formatRawMoney,
} from "@/utils/numberUtil";
import {
	calculateApplicationFee,
	calculateEstimatedPayout,
	calculateNetPayout,
	calculateTransactionFee,
} from "@/utils/paymentUtil";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import { cssInterop } from "nativewind";
import { useState } from "react";
import {
	ActivityIndicator,
	Alert,
	Keyboard,
	KeyboardAvoidingView,
	Platform,
	ScrollView,
	TextInput,
	TouchableOpacity,
	View,
} from "react-native";
import { Circle } from "react-native-maps";
import { SafeAreaView as RNSafeAreView } from "react-native-safe-area-context";

const SafeAreaView = cssInterop(RNSafeAreView, {
	className: "style",
});

export default function ApplyForJobPage() {
	const { id } = useLocalSearchParams();
	const { listing, isLoading, error } = useListing(id as string);
	const distance = useDistance(listing?.location);
	const [message, setMessage] = useState("");
	const {
		applyForListing,
		isPending: isApplying,
		error: applyError,
	} = useApplyForListing();

	if (isLoading) {
		return (
			<SafeAreaView className="flex-1 bg-white justify-center items-center">
				<ActivityIndicator size="large" color="gray" />
			</SafeAreaView>
		);
	}
	if (error || !listing) {
		return (
			<SafeAreaView>
				<Text>Error {error?.message}</Text>
			</SafeAreaView>
		);
	}

	const netPayout = formatRawMoney(
		calculateNetPayout(listing.salary, listing.duration)
	);

	const applicationFee = formatRawMoney(
		calculateApplicationFee(listing.salary, listing.duration)
	);
	const transactionFee = formatRawMoney(
		calculateTransactionFee(listing.salary, listing.duration)
	);
	const estimatedPayout = formatRawMoney(
		calculateEstimatedPayout(listing.salary, listing.duration)
	);

	async function onPress() {
		Keyboard.dismiss();
		if (!id || typeof id !== "string") {
			console.error("Invalid listing ID:", id);
			return;
		}
		try {
			if (message && message.trim() !== "") {
				await applyForListing({ listingId: id, message });
			} else {
				await applyForListing({ listingId: id });
			}
			setMessage("");
			Alert.alert("Success", "You have successfully applied for the job.");
			router.push("/(worker)/(tabs)/");
		} catch (error) {
			console.error("Failed to apply for listing:", error);
			Alert.alert("Error", "Failed to apply for the job. Please try again.");
		}
	}

	return (
		<SafeAreaView className="flex-1 bg-white">
			<KeyboardAvoidingView
				style={{ flex: 1 }}
				behavior={Platform.OS === "ios" ? "padding" : "height"}
			>
				<View style={{ flex: 1 }}>
					<View className="mx-[20] flex-row gap-[6] items-center">
						<TouchableOpacity onPress={() => router.back()}>
							<Ionicons
								name="chevron-back"
								size={30}
								color={Colors.light.text}
							/>
						</TouchableOpacity>
						<Text className="text-2xl font-zain-bold">Apply for the job</Text>
					</View>
					<ScrollView className="my-[20] flex-1">
						<View className="mx-[20] my-[10]">
							<View className="py-[5] flex-row items-center justify-between">
								<Text className="text-2xl font-zain-bold">{listing.title}</Text>
							</View>
							<View className="py-[5] flex-row items-center justify-between">
								<Text className="text-lg">Salary</Text>
								<Text className="text-lg font-zain-bold">
									{formatMoney(convertCentsToDecimalString(listing.salary))} kr
									/ hour
								</Text>
							</View>
							<View className="py-[5] flex-row items-center justify-between">
								<Text className="text-lg">Date</Text>
								<Text className="text-lg font-zain-bold">
									{formatDate(listing.date)}
								</Text>
							</View>
							<View className="py-[5] flex-row items-center justify-between">
								<Text className="text-lg">Duration</Text>
								<Text className="text-lg font-zain-bold">
									{listing.duration} minutes
								</Text>
							</View>
							<View className="py-[5] flex-row items-center justify-between">
								<Text className="text-lg">Distance</Text>
								<Text className="text-lg font-zain-bold">{distance}</Text>
							</View>
						</View>
						<View className="my-[10] gap-[10]">
							<Text className="text-2xl font-zain-bold mx-[20]">
								Message to Job lister
							</Text>
							<Text className="mx-[20] leading-5 mt-[-7] text-muted">
								Leaving a message is not mandatory, but it can help the job
								lister.
							</Text>
							<View className="mx-[20] bg-[#d9d9d9] min-h-[80] p-4 items-center rounded-lg">
								<TextInput
									onChangeText={setMessage}
									value={message}
									numberOfLines={3}
									multiline
									placeholder="I am interested in your listing because I have experience with..."
									className="text-md w-full text-muted"
								/>
							</View>
						</View>
						<View className="my-[10] gap-[10]">
							<Text className="text-2xl font-zain-bold mx-[20]">Payout</Text>
							<TouchableOpacity
								onPress={() =>
									router.push("/(worker)/(settings)/(payment)/payment")
								}
								className="mx-[20] px-[16] py-[12] rounded-lg shadow-custom bg-white flex-row items-center justify-between"
							>
								<View className="flex-row items-center gap-[15]">
									<MaterialCommunityIcons
										name="bank-check"
										size={30}
										color={Colors.light.text}
									/>
									<View>
										<Text className="text-[19px] font-zain-bold">
											BANK ACCOUNT **** 1111
										</Text>
										<Text className="text-muted mt-[-5]">
											Estimated payout {estimatedPayout} kr
										</Text>
									</View>
								</View>
								<View>
									<Ionicons
										name="chevron-forward"
										size={24}
										color={Colors.light.muted}
									/>
								</View>
							</TouchableOpacity>
						</View>
						<View className="my-[10] gap-[10]">
							<View className="mx-[20]">
								<Text className="text-2xl font-zain-bold">Location</Text>
								<Text className="text-muted text-lg mt-[-5]">
									The exact location will be revealed upon job confirmation.
								</Text>
							</View>
							<View className="mx-[20] relative">
								<LocationMapView
									initialRegion={{
										longitude: listing.location.longitude,
										latitude: listing.location.latitude,
										latitudeDelta: 0.0125,
										longitudeDelta: 0.0125,
									}}
									disabled={true}
								>
									<Circle
										center={listing.location}
										radius={200}
										strokeWidth={2}
										strokeColor="rgba(52, 152, 219, 0.8)"
										fillColor="rgba(52, 152, 219, 0.5)"
									/>
								</LocationMapView>
								<View
									className="absolute w-full h-full rounded-lg"
									style={{
										backgroundColor: "rgba(0,0,0,0.25)",
									}}
								/>
							</View>
						</View>
						<View className="mt-[10] mb-[60]">
							<Text className="text-2xl font-zain-bold mx-[20]">Summary</Text>
							<View>
								<View className="py-[5] flex-row items-center justify-between mx-[20]">
									<Text className="text-lg">Net payout</Text>
									<Text className="text-lg font-zain-bold">{netPayout} kr</Text>
								</View>
								<View className="py-[5] flex-row items-center justify-between mx-[20]">
									<Text className="text-lg">Transaction fee</Text>
									<Text className="text-lg font-zain-bold">
										-{" "}
										{formatRawMoney(
											calculateTransactionFee(listing.salary, listing.duration)
										)}{" "}
										kr
									</Text>
								</View>
								<View className="py-[5] flex-row items-center justify-between mx-[20]">
									<Text className="text-lg">Application fee</Text>
									<Text className="text-lg font-zain-bold">
										-{" "}
										{formatRawMoney(
											calculateApplicationFee(listing.salary, listing.duration)
										)}{" "}
										kr
									</Text>
								</View>
								<View className="py-[5] flex-row items-center justify-between mx-[20]">
									<Text className="text-lg">Final salary</Text>
									<Text className="text-lg font-zain-bold">
										{formatRawMoney(
											calculateEstimatedPayout(listing.salary, listing.duration)
										)}{" "}
										kr
									</Text>
								</View>
							</View>
						</View>
					</ScrollView>
					<View className="absolute bottom-[20] w-full px-[20]">
						<TouchableOpacity
							onPress={onPress}
							disabled={isApplying}
							className="bg-theme p-[12] flex-row justify-center rounded-lg shadow-custom"
						>
							<Text className="text-xl text-white font-zain-bold">
								Click to apply for job
							</Text>
						</TouchableOpacity>
					</View>
				</View>
			</KeyboardAvoidingView>
		</SafeAreaView>
	);
}
