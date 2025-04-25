import { useEffect, useRef, useState } from "react";

export interface TimeRemaining {
	total: number;
	days: number;
	hours: number;
	minutes: number;
	seconds: number;
}

/**
 * Hook: useCountdown
 * @param targetDate - The target date as a Date or parsable date string
 * @returns TimeRemaining - Remaining time until target
 */
export function useTimeDifference(targetDate: string | Date): TimeRemaining {
	const target = useRef(new Date(targetDate));

	const [timeLeft, setTimeLeft] = useState<TimeRemaining>(
		getTimeRemaining(target.current)
	);

	useEffect(() => {
		const intervalId = setInterval(() => {
			const remaining = getTimeRemaining(target.current);
			setTimeLeft(remaining);
			if (remaining.total <= 0) {
				clearInterval(intervalId);
			}
		}, 1000);

		// Initial update to avoid delay
		setTimeLeft(getTimeRemaining(target.current));

		return () => clearInterval(intervalId);
	}, []);

	return timeLeft;
}

/**
 * Helper: calculates time difference between now and endDate
 */
function getTimeRemaining(endDate: Date): TimeRemaining {
	const total = Math.abs(endDate.getTime() - new Date().getTime());
	const seconds = Math.max(Math.floor((total / 1000) % 60), 0);
	const minutes = Math.max(Math.floor((total / 1000 / 60) % 60), 0);
	const hours = Math.max(Math.floor((total / (1000 * 60 * 60)) % 24), 0);
	const days = Math.max(Math.floor(total / (1000 * 60 * 60 * 24)), 0);
	return { total, days, hours, minutes, seconds };
}
