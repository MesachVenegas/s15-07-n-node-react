import { z } from "zod";

export const crateGoalSchema = z.object({
  revenue: z
    .preprocess(value => parseFloat(value as string), z.number().min(0, {
      message: "El monto de ingresos debe ser mayor a cero"
    }))
    .refine(value => !isNaN(value), {
      message: "El monto de ingresos debe ser un número"
    }),
})