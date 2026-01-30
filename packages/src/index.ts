import { z } from "zod";

export const CheckInSchema = z.object({
    id: z.string(),
    weight: z.number(),
    notes: z.string().optional()
});

export type CheckIn = z.infer<typeof CheckInSchema>;
