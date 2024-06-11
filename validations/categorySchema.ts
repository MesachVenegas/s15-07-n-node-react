import { z } from "zod";

export const registerCategorySchema = z.object({
  name: z
    .string()
    .min(3, {
      message: "El nombre de categoria debe tener al menos 3 caracteres",
    })
    .max(100, {
      message: "El nombre de categoria debe tener menos de 100 caracteres",
    })
    .regex(/^[a-zA-Z]+$/, {
      message: "El nombre de categoria solo puede contener letras sin espacios ni caracteres especiales",
    }),
  owner: z
    .string()
    .length(24, {
      message: "El ID de propietario debe tener exactamente 24 caracteres",
    })
    .regex(/^[a-fA-F0-9]{24}$/, {
      message: "El ID de propietario debe ser un ObjectId válido",
    }),
});

export type RegisterCategory = z.infer<typeof registerCategorySchema>;
