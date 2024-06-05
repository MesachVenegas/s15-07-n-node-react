import { z } from "zod";

// Esquema de validación de login

export const LoginSchema = z.object({
  email: z
    .string()
    .email({ message: "Ingresa una dirección de correo valido" }),
  password: z
    .string()
});

export type LoginUser = z.infer<typeof LoginSchema>;

// Esquema de validación de registro de usuario

export const RegisterSchema = z
  .object({
    username: z.string().min(3, { message: "Debes ingresar un nombre de usuario" }),
    email: z
      .string()
      .email({ message: "Ingresa una dirección de correo valido" }),
    password: z
      .string()
      .min(6, { message: "La contraseña debe contener al menos 6 caracteres" })
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/,
        {
          message:
            "La contraseña debe contener al menos una letra mayúscula, una letra minúscula, un número y un carácter especial(@$!%*?&)",
        }
      ),
    confirm: z.string().min(3, { message: "Debes confirmar la contraseña" }),
    image: z.string().optional().nullable(), // Optional and nullable
  })
  .refine((data) => data.password == data.confirm, {
    message: "Las contraseñas no coinciden",
    path: ["confirm"],
  });

export type RegisterUser = z.infer<typeof RegisterSchema >;

// Esquema de validación de cambio de password de usuario

export const ChangePasswordSchema = z
  .object({
    password: z
      .string()
      .min(6, { message: "La contraseña debe contener al menos 6 caracteres" })
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/,
        {
          message:
            "La contraseña debe contener al menos una letra mayúscula, una letra minúscula, un número y un carácter especial(@$!%*?&)",
        }
      ),
    confirm: z.string().min(3, { message: "Debes confirmar la contraseña" }),
  })
  .refine((data) => data.password == data.confirm, {
    message: "Las contraseñas no coinciden",
    path: ["confirm"],
  });

export type ChangePasswordUser = z.infer<typeof ChangePasswordSchema>;

// Esquema de validación para verificar email de usuario para cambio de password

export const ForgetPasswordSchema = z.object({
  email: z
    .string()
    .email({ message: "Ingresa una dirección de correo valido" }),
});

export type ForgetPasswordUser = z.infer<typeof ForgetPasswordSchema>;