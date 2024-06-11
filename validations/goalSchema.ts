import { z } from "zod";

export const goalSchema = z.object({
  name: z.string().min(1, "El nombre no puede estar vacío"),
  owner: z.string().refine((value) => value.length > 0, {
    message: "El propietario debe estar especificado",
  }),
  billId: z.string().optional(),
  revenueId: z.string().optional(),
});

export type RegisterGoal = z.infer<typeof goalSchema>;
