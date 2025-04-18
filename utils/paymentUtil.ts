const TRANSACTION_FEE = 0.025;
const APPLICATION_FEE = 0.025;

export function calculateTransactionFee(
	salary: number,
	duration: number
): number {
	const payout = Math.round(salary * (duration / 60));
	const transactionFee = Math.round(payout * TRANSACTION_FEE);
	return transactionFee;
}

export function calculateApplicationFee(
	salary: number,
	duration: number
): number {
	const payout = Math.round(salary * (duration / 60));
	const applicationFee = Math.round(payout * APPLICATION_FEE);
	return applicationFee;
}

export function calculateEstimatedPayout(
	salary: number,
	duration: number
): number {
	const appFee = calculateApplicationFee(salary, duration);
	const transFee = calculateTransactionFee(salary, duration);
	const netPayout = calculateNetPayout(salary, duration);
	return netPayout - appFee - transFee;
}

export function calculateNetPayout(salary: number, duration: number) {
	const payout = Math.round(salary * (duration / 60));
	return payout;
}
