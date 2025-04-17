import { useImageUploader } from "@/utils/uploadthing";
import { useClerk } from "@clerk/clerk-expo";
import { Alert } from "react-native";
import { useDraftListing } from "./useDraftListing";
import { openSettings } from "expo-linking";
import { useQueryClient } from "@tanstack/react-query";

export function useListingImageUploader() {
	const queryClient = useQueryClient();
	const { draft } = useDraftListing();
	const clerk = useClerk();

	const { openImagePicker, isUploading } = useImageUploader(
		"listingImageUploader",
		{
			headers: async () => ({
				Authorization: `Bearer ${await clerk.session?.getToken()}`,
				"X-Listing-Id": draft!.draft.id,
			}),
			onClientUploadComplete: (data) => {
				queryClient.setQueryData(["draft-listing"], (oldData: any) => ({
					...oldData,
					draft: {
						...oldData.draft,
						image: data[0].ufsUrl,
					},
				}));
			},
			onUploadError: (error) => Alert.alert("Upload Error", error.message),
		}
	);

	function handleImagePicker() {
		openImagePicker({
			source: "library",
			onInsufficientPermissions: () => {
				Alert.alert(
					"No Permissions",
					"You need to grant permission to your Photos to use this",
					[
						{ text: "Dismiss" },
						{ text: "Open Settings", onPress: openSettings },
					]
				);
			},
		});
	}

	return { image: draft?.draft.image, handleImagePicker, isUploading };
}
