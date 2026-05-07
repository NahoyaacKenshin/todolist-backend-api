import { z } from "zod";

export const getTaskSchema = z.object({
  params: z.object({
    id: z.string({ message: "Task ID is required" }).min(1, "Task ID must not be empty"),
  }),
});

export type GetTaskInput = z.infer<typeof getTaskSchema>["params"];
