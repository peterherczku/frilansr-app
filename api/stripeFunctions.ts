import { BACKEND_API_BASE_URL, fetchWithAuth } from "./apiClient";

export type CustomerPaymentMethod = {
	id: string;
	brand: string;
	last4: string;
	exp_month: number;
	exp_year: number;
};

export type ConnectedBankAccount = {
	id: string;
	bank: string;
	last4: string;
	country: string;
	currency: string;
	default_for_currency: boolean;
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

export async function createConnectAccount() {
	const res = await fetchWithAuth(
		`${BACKEND_API_BASE_URL}/stripe/create-connect-account`,
		{
			method: "POST",
		}
	);
	return res as {
		accountId: string;
	};
}

export async function fetchOnboardingLink() {
	const res = await fetchWithAuth(
		`${BACKEND_API_BASE_URL}/stripe/account-link`
	);
	return res as {
		url: string;
	};
}

export async function fetchConnectedBankAccounts() {
	const res = await fetchWithAuth(
		`${BACKEND_API_BASE_URL}/stripe/connected-account-bank-accounts`
	);
	return res as {
		bankAccounts: ConnectedBankAccount[];
	};
}
