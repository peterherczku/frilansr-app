import { JobType } from "@/api/listingFunctions";

function jobTypeText(type: JobType) {
	switch (type) {
		case "DOG_WALKING":
			return "Dog Walking";
		case "DOG_SITTING":
			return "Dog Sitting";
		case "DOG_TRAINING":
			return "Dog Training";
		default:
			return "Unknown";
	}
}

export { jobTypeText };
