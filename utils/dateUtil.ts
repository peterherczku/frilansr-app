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

export function formatDate(isoString: string) {
	const dateObj = new Date(isoString);

	const formattedDate = dateObj.toLocaleDateString("en-GB", {
		day: "numeric",
		month: "long",
		year: "numeric",
	});

	const formattedTime = dateObj.toLocaleTimeString("en-US", {
		hour: "numeric",
		minute: "2-digit",
		hour12: true,
	});

	return `${formattedDate} at ${formattedTime}`;
}

export function formatDateWithoutHours(isoString: string) {
	const dateObj = new Date(isoString);

	const formattedDate = dateObj.toLocaleDateString("en-GB", {
		day: "numeric",
		month: "long",
		year: "numeric",
	});

	return formattedDate;
}

export function formatDateWithoutDate(isoString: string) {
	const dateObj = new Date(isoString);

	const formattedTime = dateObj.toLocaleTimeString("en-US", {
		hour: "numeric",
		minute: "2-digit",
		hour12: true,
	});

	return formattedTime;
}

export function differenceInMinutes(start: Date, end: Date): number {
	const diffInMs = Math.abs(end.getTime() - start.getTime());
	return Math.floor(diffInMs / (1000 * 60));
}

export function formatTimeDifference(isoString: string): string {
	const now = new Date();
	const then = new Date(isoString);
	if (isNaN(then.getTime())) {
		throw new Error(`Invalid ISO date string: "${isoString}"`);
	}

	let deltaMs = then.getTime() - now.getTime();
	const isPast = deltaMs < 0;
	deltaMs = Math.abs(deltaMs);

	const MS_PER_MINUTE = 1000 * 60;
	const MS_PER_HOUR = MS_PER_MINUTE * 60;
	const MS_PER_DAY = MS_PER_HOUR * 24;

	const days = Math.floor(deltaMs / MS_PER_DAY);
	const hours = Math.floor((deltaMs % MS_PER_DAY) / MS_PER_HOUR);
	const minutes = Math.floor((deltaMs % MS_PER_HOUR) / MS_PER_MINUTE);

	const pluralize = (value: number, unit: string): string =>
		`${value} ${unit}${value === 1 ? "" : "s"}`;

	let result: string;
	if (days >= 1) {
		result = `in ${pluralize(days, "day")} ${pluralize(hours, "hour")}`;
	} else {
		result = `in ${pluralize(hours, "hour")} ${pluralize(minutes, "minute")}`;
	}

	if (isPast) {
		// remove leading "in " and append " ago"
		result = result.replace(/^in\s+/, "") + " ago";
	}

	return result;
}

export function elapsedTimeInMinutes(start: Date): number {
	const diffInMs = differenceInMinutes(start, new Date());
	return Math.round(diffInMs / 1000 / 60);
}
