import React, {
	createContext,
	useContext,
	useEffect,
	useState,
	ReactNode,
} from "react";
import { useAuth } from "@clerk/clerk-expo";
import { BACKEND_API_BASE_URL } from "@/api/apiClient";
import { Realtime } from "ably";

interface AblyContextValue {
	ablyClient: Realtime | null;
	refreshToken: () => Promise<void>;
}

const AblyContext = createContext<AblyContextValue | undefined>(undefined);

interface AblyProviderProps {
	children: ReactNode;
}

export const AblyProvider = ({ children }: AblyProviderProps) => {
	const { getToken } = useAuth();
	const [ablyClient, setAblyClient] = useState<Realtime | null>(null);

	useEffect(() => {
		const client = new Realtime({
			authCallback: async (tokenParams, callback) => {
				try {
					const jwt = await getToken({ template: "ably-token" });
					const resp = await fetch(`${BACKEND_API_BASE_URL}/ably/auth`, {
						headers: { Authorization: `Bearer ${jwt}` },
					});
					const tokenDetails = await resp.json();
					callback(null, tokenDetails);
				} catch (err: any) {
					callback(err, null);
				}
			},
		});
		setAblyClient(client);

		return () => {
			client.close();
		};
	}, []);

	const refreshToken = async () => {
		if (!ablyClient) return;
		await ablyClient.auth.requestToken();
	};

	return (
		<AblyContext.Provider value={{ ablyClient, refreshToken }}>
			{children}
		</AblyContext.Provider>
	);
};

export function useAblyClient() {
	const context = useContext(AblyContext);
	if (!context) {
		throw new Error("useAbly must be used within an AblyProvider");
	}
	return context;
}
