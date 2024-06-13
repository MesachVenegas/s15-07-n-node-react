'use server'

import { ZodError } from "zod"; // Import ZodError to handle Zod validation errors

import prisma from "@/lib/prisma";
import { CategoryProps } from "@/types/category";
import { registerCategorySchema, RegisterCategory } from "@/validations/categorySchema";
import { revalidatePath } from "next/cache";


/**
 * Fetches default categories from the database.
 *
 * @return {Promise<{ message: string, data: CategoryProps[] }>} An object containing a message and an array of default categories.
 */
export async function FetchDefaultCategories(): Promise<{ message: string; data: CategoryProps[]; }>{
  try {
    const categories = await prisma.category.findMany({
      where: {
        default: true
      }
    });

    revalidatePath('/first-steps/bills')
    return { message: "success", data: categories };
  }
  catch (error) {
    throw error;
  }
}


// export async function registerCategory(
//   data: CategoryProps
// ): Promise<{ message: string; data: RegisterCategory }> {
//   try {
//     // Validate the input data using the schema
//     const validatedData = registerCategorySchema.parse(data);

//     // Create a new category in the database using Prisma
//     const newCategory = await prisma.category.create({
//       data: {
//         name: validatedData.name,
//         icon: '',
//         default: false,
//         owner: validatedData.owner,
//       },
//     });

//     return {
//       message: "Category registered successfully",
//       data: newCategory,
//     };
//   } catch (error: unknown) { // Specify the error type as unknown
//     if (error instanceof ZodError) {
//       throw new Error(`Validation failed: ${error.errors.map(err => err.message).join(', ')}`);
//     } else if (error instanceof Error) {
//       throw new Error(`Registration failed: ${error.message}`);
//     } else {
//       throw new Error("An unknown error occurred.");
//     }
//   }
// }
