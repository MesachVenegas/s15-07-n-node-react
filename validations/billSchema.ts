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
    .regex(/^[a-zA-Z]+$/, {
      message:
        "El nombre solo puede contener letras sin espacios ni caracteres especiales",
    }),
  amount: z
    .number()
    .positive({
      message: "La ganancia debe ser un número positivo",
    })
    .max(1000000, {
      message: "La ganancia no puede exceder de 1,000,000",
    }),
  owner: z.string().nonempty({
    message: "El propietario es obligatorio",
  }), // Add owner property validation
});

export type RegisterBill = z.infer<typeof registerBillSchema>;

