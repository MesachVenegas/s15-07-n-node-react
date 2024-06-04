import { z } from "zod";

export const registerSettingSchema = z.object({
  currency: z.string().min(6, {
    message: "Por favor ingrese su moneda preferida"
  }),
  notify: z.boolean(),
  users: z.string().min(3).max(50).optional().refine((val) => !!val, {
    message: "Por favor, selecciona usuario.",
  }),
})

export type RegisterSetting = z.infer<typeof registerSettingSchema>;