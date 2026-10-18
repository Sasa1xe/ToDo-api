import z from "zod";

export const todosSchema = z.object({
    title: z.string(),
    body: z.string()
})
