import { Application } from "@/api/listingFunctions";
import { Text } from "@/components/ui/Text";
import { useSelectApplication } from "@/hooks/listing/useSelectApplication";
import { cn } from "@/utils/cn";
import { Image } from "expo-image";
import { router } from "expo-router";
import { useState } from "react";
import {
	Alert,
	FlatList,
	Pressable,
	TouchableOpacity,
	View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

function Header({ applications }: { applications: Application[] }) {
	function back() {
		router.back();
	}
	return (
		<View className="mx-[20]">
			<View className="flex-row gap-[6] items-center">
				<View>
					<Text className="text-2xl font-zain-bold">
						Applications ({applications.length})
					</Text>
				</View>
			</View>
			<Text className="text-muted text-lg">
				Click on one of the boxes to select an application
			</Text>
		</View>
	);
}

function ApplicationItem({
	application,
	selected,
	setSelected,
}: {
	application: Application;
	selected: boolean;
	setSelected: (id: string) => void;
}) {
	return (
		<Pressable
			onPress={() => setSelected(application.id)}
			className={cn(
				"border-lg bg-[#ededed] border-2 rounded-[20]",
				!selected && "border-[#d9d9d9]",
				selected && "border-theme"
			)}
		>
			<View
				className={cn(
					"flex-row items-center justify-between p-4 bg-white rounded-[20]"
				)}
			>
				<View className="flex-row items-center gap-[10]">
					<Image
						source={{ uri: application.user.imageUrl }}
						className="w-[60] h-[60] rounded-full bg-[#d9d9d9]"
					/>
					<View>
						<Text className="text-lg font-zain-bold">
							{application.user.name}
						</Text>
					</View>
				</View>
				{selected && (
					<View className="bg-white rounded-full h-[24] w-[24] border-theme border-2 justify-center items-center">
						<View className="bg-theme h-[14] w-[14] rounded-full" />
					</View>
				)}
				{!selected && (
					<View className="bg-white rounded-full h-[24] w-[24] border-muted border-2 justify-center items-center"></View>
				)}
			</View>
			<View className="p-4">
				<Text className="text-lg font-zain-bold">Message</Text>
				<Text className="text-muted mt-[-5]">{application.message}</Text>
			</View>
			<View className="mx-4 mb-4">
				<TouchableOpacity className="py-3 bg-white border-2 border-[#d9d9d9] rounded-lg flex-row items-center justify-center">
					<Text className="font-zain-bold text-muted">Visit profile</Text>
				</TouchableOpacity>
			</View>
		</Pressable>
	);
}

export function ApplicationsList({
	listingId,
	applications,
}: {
	listingId: string;
	applications: Application[];
}) {
	const insets = useSafeAreaInsets();
	const [selected, setSelected] = useState("");
	const { mutateAsync: selectApplication } = useSelectApplication();

	function renderItem({ item }: { item: Application }) {
		return (
			<ApplicationItem
				application={item}
				selected={selected === item.id}
				setSelected={setSelected}
			/>
		);
	}

	async function acceptSelected() {
		try {
			await selectApplication({ listingId, applicationId: selected });
			Alert.alert("Application accepted", "You have accepted the application");
			setSelected("");
			router.back();
		} catch (err) {
			Alert.alert("Error", "Something went wrong. Please try again later.");
		}
	}

	return (
		<View className="flex-1 py-[20] bg-white relative">
			<Header applications={applications} />
			<FlatList
				contentContainerClassName="m-4 gap-[15]"
				data={applications}
				renderItem={renderItem}
				keyExtractor={(application) => application.id}
			/>
			<View className="fixed mx-[20]" style={{ bottom: insets.bottom + 50 }}>
				<TouchableOpacity
					onPress={acceptSelected}
					disabled={selected === ""}
					className="py-3 bg-theme rounded-lg flex-row items-center justify-center shadow-custom disabled:opacity-50"
				>
					<Text className="font-zain-bold text-white text-lg">
						Accept selected
					</Text>
				</TouchableOpacity>
			</View>
		</View>
	);
}
