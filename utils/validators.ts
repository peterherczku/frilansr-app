import { jobTypes } from "@/api/listingFunctions";
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

const isoDateString = z.string().refine(
	(value) => {
		return !isNaN(Date.parse(value));
	},
	{
		message: "Invalid ISO date string",
	}
);

const jobTypeEnum = z.enum(jobTypes, {
	message: "Invalid job type",
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

const updateListingLocationSchema = z.object({
	longitude: z.number({
		message: "Longitude is required",
	}),
	latitude: z.number({
		message: "Latitude is required",
	}),
});

const updateListingTypeSchema = z.object({
	type: jobTypeEnum,
});

const updateListingDateDurationSchema = z.object({
	duration: z
		.number({
			message: "Duration is required",
		})
		.min(10, {
			message: "Duration must be at least 10 minutes",
		})
		.int({
			message: "Duration must be an integer",
		}),
	date: isoDateString,
});

export {
	updateListingTitleSchema,
	updateListingDescriptionSchema,
	updateListingSalarySchema,
	updateListingLocationSchema,
	updateListingTypeSchema,
	updateListingDateDurationSchema,
};
