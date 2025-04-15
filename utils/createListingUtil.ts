import { ListingDraft } from "@/api/listingFunctions";
import {
	CommonActions,
	NavigationProp,
	NavigationState,
} from "@react-navigation/native";

export type CreateListingPageType =
	| "title"
	| "description"
	| "image"
	| "salary"
	| "location"
	| "type"
	| "date"
	| "publish";

export function restoreRouter(
	navigation: Omit<
		NavigationProp<ReactNavigation.RootParamList>,
		"getState"
	> & {
		getState(): NavigationState | undefined;
	},
	page: CreateListingPageType
) {
	const prevPages = getAllPreviousPages(page);
	const routes = prevPages.map((prevPage) => ({
		name: prevPage,
	}));
	navigation.dispatch(
		CommonActions.reset({
			index: 0,
			routes: [
				{
					name: "(lister)",
					state: {
						index: 1,
						routes: [
							{
								name: "(tabs)",
								state: {
									index: 0,
									routes: [{ name: "index" }],
								},
							},
							{
								name: "(create-listing)",
								state: {
									index: routes.length,
									routes: [...routes, { name: page }],
								},
							},
						],
					},
				},
			],
		})
	);
}

function getAllPreviousPages(
	current: CreateListingPageType
): CreateListingPageType[] {
	switch (current) {
		case "title":
			return [];
		case "description":
			return ["title"];
		case "image":
			return ["title", "description"];
		case "salary":
			return ["title", "description", "image"];
		case "location":
			return ["title", "description", "image", "salary"];
		case "type":
			return ["title", "description", "image", "salary", "location"];
		case "date":
			return ["title", "description", "image", "salary", "location", "type"];
		case "publish":
			return [
				"title",
				"description",
				"image",
				"salary",
				"location",
				"type",
				"date",
			];
		default:
			return [];
	}
}

export function getNextPage(
	current: CreateListingPageType
): CreateListingPageType {
	switch (current) {
		case "title":
			return "description";
		case "description":
			return "image";
		case "image":
			return "salary";
		case "salary":
			return "location";
		case "location":
			return "type";
		case "type":
			return "date";
		case "date":
			return "publish";
		default:
			throw new Error("Invalid page type");
	}
}

export function getPreviousPage(
	current: CreateListingPageType
): CreateListingPageType | "HOME" {
	switch (current) {
		case "description":
			return "title";
		case "image":
			return "description";
		case "salary":
			return "image";
		case "location":
			return "salary";
		case "type":
			return "location";
		case "date":
			return "type";
		case "publish":
			return "date";
		default:
			return "HOME";
	}
}

export function getPage(draft: ListingDraft) {
	switch (true) {
		case !draft.title:
			return "title";
		case !draft.description:
			return "description";
		case !draft.image:
			return "image";
		case !draft.salary:
			return "salary";
		case !draft.location:
			return "location";
		case !draft.type:
			return "type";
		case !draft.date:
			return "date";
		default:
			return "publish";
	}
}
