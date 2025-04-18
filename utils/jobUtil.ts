import { JobWithUser } from "@/api/jobFunctions";

export function sortUpcomingJobs(jobs: JobWithUser[]) {
	return jobs.sort((a, b) => {
		const dateA = new Date(a.listing.date);
		const dateB = new Date(b.listing.date);

		if (dateA < dateB) return 1;
		if (dateA > dateB) return -1;
		return 0;
	});
}
