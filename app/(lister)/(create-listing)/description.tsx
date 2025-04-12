import {
	CreateListingBody,
	CreateListingContainer,
	CreateListingFooter,
	CreateListingHeader,
	CreateListingSubheader,
	CreateListingSubtitle,
	CreateListingTitle,
} from "@/components/lister/createListing/CreateListing";

export default function CreateListingDescriptionPage() {
	return (
		<CreateListingContainer>
			<CreateListingHeader done={1} max={7} />
			<CreateListingBody nextRoute="/(lister)/(create-listing)/third">
				<CreateListingSubheader current={2} max={7}>
					<CreateListingTitle>Description</CreateListingTitle>
					<CreateListingSubtitle>
						Write a clear description that explains what the job entails.
					</CreateListingSubtitle>
				</CreateListingSubheader>
			</CreateListingBody>
		</CreateListingContainer>
	);
}
