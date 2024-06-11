
import { z } from "zod";
 
import prisma from "@/lib/prisma";
import { BillProps } from "@/types/bills";
import { registerBillSchema } from "@/validations/billSchema";

export async function registerBill(
  data: z.infer<typeof registerBillSchema>, goalId: string, userId: string
) : Promise<{ message: string; data: BillProps }> {
  try {
    // Validar los datos utilizando el esquema de Zod
    const validatedData = registerBillSchema.parse(data);

    // Crear el registro en la base de datos usando Prisma
    const newBill = await prisma.bill.create({
      data: {
        name: validatedData.name,
        amount: validatedData.amount,
        owner: userId,
        categoryId: validatedData.category,
        goalId: goalId,
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

