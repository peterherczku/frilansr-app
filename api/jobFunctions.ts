import { BACKEND_API_BASE_URL, fetchWithAuth } from "./apiClient";
import { Listing } from "./listingFunctions";

export type JobStatus = "WAITING_FOR_WORKER" | "IN_PROGRESS" | "COMPLETED";

export type BaseJobWithUser = {
	id: string;
	status: JobStatus;
	createdAt: string;
	updatedAt: string;
	worker: {
		id: string;
		name: string;
		imageUrl: string;
	};
	listing: Listing;
};

export type JobWithUser = BaseJobWithUser;

export type OngoingJobWithUser = BaseJobWithUser & {
	startTime: string;
};

export type CompletedJobWithUser = BaseJobWithUser & {
	startTime: string;
	stopTime: string;
};

export type AnyJobWithUser =
	| JobWithUser
	| OngoingJobWithUser
	| CompletedJobWithUser;

export async function fetchActiveJobs() {
	const res = await fetchWithAuth(`${BACKEND_API_BASE_URL}/jobs/active`);
	return res as JobWithUser[];
}

export async function fetchActiveWorkerJobs() {
	const res = await fetchWithAuth(`${BACKEND_API_BASE_URL}/jobs/active-worker`);
	return res as JobWithUser[];
}

export async function fetchOngoingWorkerJob() {
	const res = await fetchWithAuth(
		`${BACKEND_API_BASE_URL}/jobs/ongoing-worker`
	);
	return res as OngoingJobWithUser[];
}

export async function startJob(jobId: string) {
	const res = await fetchWithAuth(
		`${BACKEND_API_BASE_URL}/jobs/${jobId}/start`,
		{
			method: "POST",
		}
	);
	return res as OngoingJobWithUser;
}

export async function stopJob(jobId: string) {
	const res = await fetchWithAuth(
		`${BACKEND_API_BASE_URL}/jobs/${jobId}/stop-worker`,
		{
			method: "POST",
		}
	);
	return res as CompletedJobWithUser;
}

export async function fetchRecentWorkerJobs() {
	const res = await fetchWithAuth(
		`${BACKEND_API_BASE_URL}/jobs/recent-jobs-worker`
	);
	return res as CompletedJobWithUser[];
}
