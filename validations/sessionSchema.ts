import { z } from "zod";

export const sessionSchema = z.object({
  sessionToken: z.string().min(1, "El token de sesión no puede estar vacío"),
  userId: z.string().refine((value) => value.length > 0, {
    message: "El ID del usuario debe estar especificado",
  }),
  expires: z.date(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export type Session = z.infer<typeof sessionSchema>;
