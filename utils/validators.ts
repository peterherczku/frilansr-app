import { z } from "zod";

const stringToIntegerSchema = z.string().transform((val, ctx) => {
	const num = parseFloat(val);
	if (isNaN(num)) {
		ctx.addIssue({
			code: z.ZodIssueCode.custom,
			message: "Invalid number",
		});
		return z.NEVER;
	}
	return Math.round(num * 100);
});

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

const updateListingSalarySchema = z.object({
	salary: stringToIntegerSchema,
});

export {
	updateListingTitleSchema,
	updateListingDescriptionSchema,
	updateListingSalarySchema,
};
