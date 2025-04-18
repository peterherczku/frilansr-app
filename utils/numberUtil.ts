function convertCentsToDecimalString(num: number): string {
	return (num / 100).toFixed(2);
}

function formatMoney(num: string) {
	return num.replace(".", ",");
}

function formatRawMoney(num: number) {
	return (num / 100).toFixed(2).replace(".", ",");
}

export { convertCentsToDecimalString, formatMoney, formatRawMoney };
