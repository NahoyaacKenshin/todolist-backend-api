import { z } from "zod";
export const signupSchema = z.object({
    email: z.string().email("Invalid email address"),
    password: z
        .string()
        .min(8, "Password must be at least 8 characters")
        .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
        .regex(/[0-9]/, "Password must contain at least one number"),
});
export const loginSchema = z.object({
    email: z.string().email("Invalid email address"),
    password: z.string().min(1, "Password is required"),
});
export const verifyEmailSchema = z.object({
    token: z.string().min(1, "Verification token is required"),
});
export const createTaskSchema = z.object({
    title: z.string().min(1, "Title is required").max(255, "Title too long"),
    description: z.string().max(1000, "Description too long").optional(),
});
export const updateTaskSchema = createTaskSchema.partial();
//# sourceMappingURL=validation.js.map