import { JobStatus } from "@/api/jobFunctions";
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

function jobStatusText(status: JobStatus) {
	switch (status) {
		case "WAITING_FOR_WORKER":
			return "Waiting for Worker";
		case "IN_PROGRESS":
			return "In Progress";
		case "COMPLETED":
			return "Completed";
		default:
			return "Unknown";
	}
}

export { jobTypeText, jobStatusText };
