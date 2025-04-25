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

export function selectClosestJob(jobs: JobWithUser[]) {
	if (!Array.isArray(jobs) || jobs.length === 0) return null;
	jobs = jobs.filter((job) => job.status !== "COMPLETED");
	const now = Date.now();

	return jobs.reduce((closest, job) => {
		const jobTime = new Date(job.listing.date).getTime();
		const closestTime = new Date(closest.listing.date).getTime();

		// Compare absolute distance to now
		return Math.abs(jobTime - now) < Math.abs(closestTime - now)
			? job
			: closest;
	}, jobs[0]);
}
