import prisma from "@/lib/prisma";
import { goalSchema, RegisterGoal } from "@/validations/goalSchema";

export async function registerGoal(
  data: RegisterGoal
): Promise<{ message: string; data: RegisterGoal }> {
  try {
    // Validar los datos utilizando el esquema de Zod
    const validatedData = goalSchema.parse(data);

    // Crear el registro en la base de datos usando Prisma
    const newGoal = await prisma.goal.create({
      data: {
        name: validatedData.name,
        owner: validatedData.owner,
        billId: validatedData.billId ?? "",  // Asegurarse de que no sea undefined
        revenueId: validatedData.revenueId ?? "",  // Asegurarse de que no sea undefined
      },
    });

    return {
      message: "Goal registered successfully",
      data: newGoal,
    };
  } catch (error) {
    throw new Error("Registration failed");
  }
}
