import { BACKEND_API_BASE_URL, fetchWithAuth } from "./apiClient";

export type CustomerPaymentMethod = {
	id: string;
	brand: string;
	last4: string;
	exp_month: number;
	exp_year: number;
};

export async function hasAccountConnected() {
	const res = await fetchWithAuth(`${BACKEND_API_BASE_URL}/stripe/has-account`);
	return res as {
		hasAccount: boolean;
	};
}

export async function createSetupIntent() {
	const res = await fetchWithAuth(
		`${BACKEND_API_BASE_URL}/stripe/setup-intent`,
		{
			method: "POST",
		}
	);
	return res as {
		clientSecret: string;
	};
}

export async function createCustomerAccount() {
	const res = await fetchWithAuth(
		`${BACKEND_API_BASE_URL}/stripe/create-customer-account`,
		{
			method: "POST",
		}
	);
	return res as {
		customerId: string;
	};
}

export async function fetchCustomerPaymentMethods() {
	const res = await fetchWithAuth(
		`${BACKEND_API_BASE_URL}/stripe/customer-payment-methods`
	);
	return res.paymentMethods as CustomerPaymentMethod[];
}
