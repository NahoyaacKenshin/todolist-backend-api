import { z } from "zod";
export const updateTaskSchema = z.object({
    params: z.object({
        id: z.string({ message: "Task ID is required" }).min(1, "Task ID must not be empty"),
    }),
    body: z.object({
        title: z
            .string("Title must be a string")
            .min(1, "Title must not be empty")
            .max(255, "Title must not exceed 255 characters")
            .optional(),
        description: z
            .string("Description must be a string")
            .max(2000, "Description must not exceed 2000 characters")
            .optional()
            .nullable(),
        completed: z
            .boolean("Completed must be a boolean")
            .optional(),
    }),
});
//# sourceMappingURL=update-task.schema.js.map