import { z } from "zod";

export const subscriptionSchema = z.object({
    name: z
        .string()
        .min(2, "Name must be at least 2 characters long.")
        .max(100, "Name should be less than 100 characters.")
        .trim(),
    email: z
        .string()
        .email("Please enter a valid email")
        .toLowerCase()
        .trim(),
});


export const emailValidationSchema = z.string().email("Please enter a valid email").toLowerCase().trim();

