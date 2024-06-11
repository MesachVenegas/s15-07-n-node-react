import { z } from "zod";

export const crateGoalSchema = z.object({
  revenue: z
    .string()
    .regex(/^\d*\.?\d*$/, { message: "El monto del ingreso debe ser un un valor numérico" })
}).refine( data => {
  const { revenue } = data

  return parseFloat(revenue);
})
