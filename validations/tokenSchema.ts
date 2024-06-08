import { z } from "zod";

export const verificationTokenSchema = z.object({
  identifier: z.string().min(1, "El identificador no puede estar vacío"),
  token: z.string().min(1, "El token no puede estar vacío"),
  expires: z.date(),
});

export type VerificationToken = z.infer<typeof verificationTokenSchema>;
