'use server'

import { z } from "zod";

import prisma from "@/lib/prisma";
import { BillProps, DefaultBillProps } from "@/types/bills";
import { registerBillSchema } from "@/validations/billSchema";
import { revalidatePath } from "next/cache";


/**
 * Fetches default bills for a given category ID.
 *
 * @param {string} id - The ID of the category.
 * @return {Promise<{ message: string, data: BillProps[] }>} An object containing a message and an array of default bills.
 * @throws {Error} If there was an error fetching the bills.
 */
export async function FetchDefaultBills( id: string ): Promise<{ message: string; data: DefaultBillProps[]; }>{
  try {
    const bills = await prisma.billDefault.findMany({
      where: { categoryId: id },
    })

    revalidatePath('/first-steps/bills/add');
    return { message: "success", data: bills }
  } catch (error) {
    throw error;
  }
}


// export async function registerBill(
//   data: z.infer<typeof registerBillSchema>, goalId: string, userId: string
// ) : Promise<{ message: string; data: BillProps }> {
//   try {
//     // Validar los datos utilizando el esquema de Zod
//     const validatedData = registerBillSchema.parse(data);

//     // Crear el registro en la base de datos usando Prisma
//     const newBill = await prisma.bill.create({
//       data: {
//         name: validatedData.name,
//         amount: validatedData.amount,
//         owner: userId,
//         icon: '',
//         categoryId: validatedData.category,
//         goalId: goalId,
//       },
//     });

//     return {
//       message: "Bill registered successfully",
//       data: newBill,
//     };
//   } catch (error) {
//     throw new Error("Registration failed");
//   }
// }

