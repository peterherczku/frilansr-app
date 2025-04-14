import { ListingDraft } from "@/api/listingFunctions";

export type CreateListingPageType =
	| "title"
	| "description"
	| "image"
	| "salary"
	| "location"
	| "type"
	| "duration"
	| "date"
	| "publish";

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
			return "duration";
		case "duration":
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
		case "duration":
			return "type";
		case "date":
			return "duration";
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
		case !draft.duration:
			return "duration";
		case !draft.date:
			return "date";
		default:
			return "publish";
	}
}
