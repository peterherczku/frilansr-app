export function timeAgo(timestamp: number | string | Date): string {
	const now = new Date();
	const past = new Date(timestamp);
	const diffInSeconds = Math.floor((now.getTime() - past.getTime()) / 1000);

	if (diffInSeconds < 60) {
		return "just now";
	}

	const minutes = Math.floor(diffInSeconds / 60);
	if (minutes < 60) {
		return `${minutes} minute${minutes > 1 ? "s" : ""} ago`;
	}

	const hours = Math.floor(minutes / 60);
	if (hours < 24) {
		return `${hours} hour${hours > 1 ? "s" : ""} ago`;
	}

	const days = Math.floor(hours / 24);
	if (days === 1) {
		return "yesterday";
	} else if (days < 7) {
		return `${days} day${days > 1 ? "s" : ""} ago`;
	}

	const weeks = Math.floor(days / 7);
	if (weeks < 4) {
		return `${weeks} week${weeks > 1 ? "s" : ""} ago`;
	}

	const months = Math.floor(days / 30);
	if (months < 12) {
		return `${months} month${months > 1 ? "s" : ""} ago`;
	}

	const years = Math.floor(days / 365);
	return `${years} year${years > 1 ? "s" : ""} ago`;
}
