import { z } from "zod";


export const registerBillSchema = z.object({
  name: z
    .string()
    .min(3, {
      message: "El nombre debe tener al menos 3 caracteres",
    })
    .max(100, {
      message: "El nombre debe tener menos de 100 caracteres",
    })
    .regex(/^[a-zA-Z\s]+$/, {
      message:
        "El nombre solo puede contener letras sin números ni caracteres especiales",
    }),
  amount: z
    .string()
    .regex(/^\d*\.?\d*$/, { message: "El monto del ingreso debe ser un un valor numérico" }),
  icon: z
    .string()
    .optional(),
  categoryId: z
    .string()
    .min(1, { message: "La categoría de la cuenta es obligatoria" }),
}).refine( data => {
  const { amount } = data;

  return parseFloat(amount);
})


