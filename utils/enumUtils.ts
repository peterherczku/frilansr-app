import { JobStatus } from "@/api/jobFunctions";
import { JobType } from "@/api/listingFunctions";
import { TransactionStatus } from "@/api/stripeFunctions";

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

function transactionStatusText(status: TransactionStatus) {
	switch (status) {
		case "ON_WAY_TO_FRILASNSR":
			return "On way to Frilansr";
		case "ARRIVED_AT_FRILANSR":
			return "Arrived at Frilansr";
		case "ON_WAY_TO_DESTINATION":
			return "On way to destination";
		case "ARRIVED_AT_DESTINATION":
			return "Arrived at destination";
	}
}

export { jobTypeText, jobStatusText, transactionStatusText };
