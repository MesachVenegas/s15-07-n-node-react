"use server"

import prisma from "@/lib/prisma"
import { SettingProps } from "@/types/interface";
import { RegisterSetting, registerSettingSchema } from '@/validations/settingSchema';


export async function registerSetting(
  data: RegisterSetting
): Promise<{ message: string; data: SettingProps }> {
  try {
    // Validar los datos utilizando el esquema de Zod
    const validatedData = registerSettingSchema.parse(data);

    // Asegurar que userId no es undefined
    if (!validatedData.users) {
      throw new Error(
        "The 'users' field is required and cannot be undefined."
      );
    }

    // Crear el registro en la base de datos usando Prisma
    const newSetting = await prisma.setting.create({
      data: {
        currency: validatedData.currency,
        notify: validatedData.notify,
        userId: validatedData.users, // Asegúrate de que siempre se proporcione un userId válido
      },
    });

    return {
      message: "Setting registered successfully",
      data: {
        currency: newSetting.currency,
        notify: newSetting.notify,
        userId: newSetting.userId,
      },
    };
  } catch (error) {
    throw new Error("Registration failed");
  }
}
