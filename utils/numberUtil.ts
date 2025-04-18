function convertCentsToDecimalString(num: number): string {
	return (num / 100).toFixed(2);
}

function formatMoney(num: string) {
	return num.replace(".", ",");
}

function calculatePayment(salary: number, duration: number) {
	const payment = (salary * (duration / 60)) / 100;
	return payment.toFixed(2);
}

function formatRawMoney(num: number) {
	return (num / 100).toFixed(2).replace(".", ",");
}

export {
	convertCentsToDecimalString,
	formatMoney,
	calculatePayment,
	formatRawMoney,
};
