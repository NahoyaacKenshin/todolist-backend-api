import { z } from "zod";
export const createTaskSchema = z.object({
    body: z.object({
        title: z
            .string({ message: "Title is required" })
            .min(1, "Title must not be empty")
            .max(255, "Title must not exceed 255 characters"),
        description: z
            .string("Description must be a string")
            .max(2000, "Description must not exceed 2000 characters")
            .optional()
            .nullable(),
    }),
});
//# sourceMappingURL=create-task.schema.js.map