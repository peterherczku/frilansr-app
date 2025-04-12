import {
	CreateListingBody,
	CreateListingContainer,
	CreateListingFooter,
	CreateListingHeader,
	CreateListingSubheader,
	CreateListingSubtitle,
	CreateListingTitle,
} from "@/components/lister/createListing/CreateListing";
import { Text } from "@/components/ui/Text";
import { TextInput, View } from "react-native";

export default function CreateListingTitlePage() {
	return (
		<CreateListingContainer>
			<CreateListingHeader done={0} max={7} />
			<CreateListingBody nextRoute="/(lister)/(create-listing)/description">
				<CreateListingSubheader current={1} max={7}>
					<CreateListingTitle>Title</CreateListingTitle>
					<CreateListingSubtitle>
						Choose a concise and catchy title that immediately grabs attention.
					</CreateListingSubtitle>
				</CreateListingSubheader>
				<View className="flex-col">
					<Text className="text-xl">Title</Text>
					<View className="text-lg py-5 px-8 rounded-[20] bg-[#d9d9d9]">
						<TextInput className="text-lg " />
					</View>
				</View>
			</CreateListingBody>
		</CreateListingContainer>
	);
}
