import * as SecureStore from "expo-secure-store";
import { Platform } from "react-native";
import { TokenCache } from "@clerk/clerk-expo/dist/cache";
import { parse } from "@babel/core";

const createTokenCache = (): TokenCache => {
	return {
		getToken: async (key: string) => {
			try {
				const item = await SecureStore.getItemAsync(key);
				if (item) {
					console.log(`${key} was used 🔐 \n`);
				} else {
					console.log("No values stored under key: " + key);
				}
				return item;
			} catch (error) {
				console.error("secure store get item error: ", error);
				await SecureStore.deleteItemAsync(key);
				return null;
			}
		},
		saveToken: (key: string, token: string) => {
			return SecureStore.setItemAsync(key, token);
		},
	};
};

const createSearchCache = () => {
	async function retrieveSearches() {
		const item = await SecureStore.getItemAsync("searches");
		if (!item) return null;
		const parsedSearches = JSON.parse(item) as string[];
		return parsedSearches;
	}

	return {
		getSearches: async () => {
			try {
				const item = await retrieveSearches();
				return item;
			} catch (error) {
				console.error("secure store get item error: ", error);
				await SecureStore.deleteItemAsync("searches");
				return null;
			}
		},
		saveSearch: async (search: string) => {
			const item = await retrieveSearches();
			if (!item) {
				return SecureStore.setItemAsync("searches", JSON.stringify([search]));
			}
			return SecureStore.setItemAsync(
				"searches",
				JSON.stringify([...item, search])
			);
		},
		clear: async () => {
			return SecureStore.deleteItemAsync("searches");
		},
	};
};

// SecureStore is not supported on the web
export const tokenCache =
	Platform.OS !== "web" ? createTokenCache() : undefined;

export const searchCache =
	Platform.OS !== "web" ? createSearchCache() : undefined;
