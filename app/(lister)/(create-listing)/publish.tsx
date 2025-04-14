import {
	CreateListingBody,
	CreateListingContainer,
	CreateListingErrors,
	CreateListingHeader,
	CreateListingSubheader,
	CreateListingSubtitle,
	CreateListingTitle,
} from "@/components/lister/createListing/CreateListing";
import { Text } from "@/components/ui/Text";
import { useDraftListing } from "@/hooks/listing/draft/useDraftListing";
import { usePublishDraftListing } from "@/hooks/listing/draft/usePublishDraftListing";
import { useUpdateDraftListing } from "@/hooks/listing/draft/useUpdateDraftListing";
import { router } from "expo-router";
import { useState } from "react";
import { Alert, ScrollView, View } from "react-native";
import { ZodIssue } from "zod";

const CURRENT = "publish";

export default function CreateListingDescriptionPage() {
	const { publishDraft, isPending } = usePublishDraftListing();
	const [errors, setErrors] = useState<ZodIssue[]>([]);

	async function onSubmit() {
		try {
			await publishDraft();
			Alert.alert("Success", "Your listing has been published successfully!");

			router.push(`/(lister)/(tabs)/`);
		} catch (error) {
			console.error("Failed to update draft:", error);
		}
	}

	return (
		<CreateListingContainer>
			<CreateListingHeader currentPage={CURRENT} done={7} max={8} />
			<CreateListingBody
				footerText="Accept and publish"
				scrollable={false}
				isLoading={isPending}
				onSubmit={onSubmit}
			>
				<CreateListingSubheader current={8} max={8}>
					<CreateListingTitle>Publish</CreateListingTitle>
					<CreateListingSubtitle>
						Make your listing visible to potential candidates. You can edit it
						later if needed.
					</CreateListingSubtitle>
				</CreateListingSubheader>
				<View className="flex-col gap-2">
					<CreateListingErrors errors={errors} />
					<Text className="text-xl">Terms of Conditions</Text>
					<ScrollView className="h-[300] bg-[#d9d9d9] rounded-[20] p-4">
						<Text className="font-zain-bold  text-xl">
							Frilansr job lister agreement
						</Text>
						<Text className="text-muted text-lg">
							Welcome to Frilasnr! These Terms and Conditions ("Terms") govern
							your use of our website, products, and services (collectively, the
							"Services"). By accessing or using our Services, you agree to be
							bound by these Terms. If you do not agree to these Terms, please
							do not use our Services.
						</Text>
						<Text className="font-zain-bold  text-lg">
							1. Acceptance of Terms
						</Text>
						<Text className="text-muted text-lg">
							By using the Services provided by [Your Company Name], you confirm
							that you are at least 18 years of age and agree to abide by these
							Terms. Your continued use of our Services indicates your
							acceptance of these Terms as they may be updated from time to
							time. 2. Modifications to the Terms We reserve the right to update
							or modify these Terms at any time without prior notice. Any
							changes will be effective immediately upon posting on our website.
							Your continued use of the Services after such modifications
							indicates your acceptance of the revised Terms.
						</Text>
					</ScrollView>
				</View>
			</CreateListingBody>
		</CreateListingContainer>
	);
}
