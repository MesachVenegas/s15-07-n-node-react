import prisma from "@/lib/prisma";
import { registerCategorySchema, RegisterCategory } from "@/validations/categorySchema";
import { ZodError } from "zod"; // Import ZodError to handle Zod validation errors

export async function registerCategory(
  data: RegisterCategory
): Promise<{ message: string; data: RegisterCategory }> {
  try {
    // Validate the input data using the schema
    const validatedData = registerCategorySchema.parse(data);

    // Create a new category in the database using Prisma
    const newCategory = await prisma.category.create({
      data: {
        name: validatedData.name,
        owner: validatedData.owner,
        billId: validatedData.billId,
        revenueId: validatedData.revenueId,
      },
    });

    return {
      message: "Category registered successfully",
      data: newCategory,
    };
  } catch (error: unknown) { // Specify the error type as unknown
    if (error instanceof ZodError) {
      throw new Error(`Validation failed: ${error.errors.map(err => err.message).join(', ')}`);
    } else if (error instanceof Error) {
      throw new Error(`Registration failed: ${error.message}`);
    } else {
      throw new Error("An unknown error occurred.");
    }
  }
}
