import { z } from "zod";

export const loginSchema = z.object({
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
});

export const RegisterSchema = z
  .object({
    username: z
      .string()
      .min(3, { message: "Debes ingresar un nombre de usuario" }),
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
  })
  .refine((data) => data.password == data.confirm, {
    message: "Las contraseñas no coinciden",
    path: ["confirm"],
  });

export const changePasswordSchema = z
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

export const forgetPasswordSchema = z.object({
  email: z
    .string()
    .email({ message: "Ingresa una dirección de correo valido" }),
});
