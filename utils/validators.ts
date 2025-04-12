import { z } from "zod";

const updateListingTitleSchema = z.object({
	title: z.string().min(4, {
		message: "Title must be at least 4 characters long",
	}),
});

const updateListingDescriptionSchema = z.object({
	description: z.string().min(10, {
		message: "Description must be at least 10 characters long",
	}),
});

export { updateListingTitleSchema, updateListingDescriptionSchema };
