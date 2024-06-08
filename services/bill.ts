import prisma from "@/lib/prisma";
import { registerBillSchema, RegisterBill } from "@/validations/billSchema";

export async function registerBill(
  data: RegisterBill
): Promise<{ message: string; data: RegisterBill }> {
  try {
    // Validar los datos utilizando el esquema de Zod
    const validatedData = registerBillSchema.parse(data);

    // Crear el registro en la base de datos usando Prisma
    const newBill = await prisma.bill.create({
      data: {
        name: validatedData.name,
        amount: validatedData.amount,
        owner: validatedData.owner, // Asegúrate de que 'owner' esté presente en 'validatedData'
      },
    });

    return {
      message: "Bill registered successfully",
      data: newBill,
    };
  } catch (error) {
    throw new Error("Registration failed");
  }
}

