import { z } from "zod";

import prisma from "@/lib/prisma";
import { crateGoalSchema } from '@/validations/goal';
import { GoalsProps, PlanProps } from "@/types/goals";

/**
 * Creates a new goal in the database.
 *
 * @param {z.infer<typeof crateGoalSchema>} data - The data for creating the goal.
 * @return {Promise<{ message: string; data: GoalsProps }>} - A promise that resolves to an object containing a success message and the created goal data.
 * @throws {Error} - If there is an error creating the goal.
 */
export async function createGoal(data: z.infer<typeof crateGoalSchema>, ownerId: string, target: PlanProps): Promise<{ message: string; data: GoalsProps; }> {
  try {
    const goal = await prisma.goal.create({
      data: {
        owner: ownerId,
        target: target.plan,
        revenue: data.revenue,
      }
    });

    return { message: "La meta se ha creado exitosamente", data: goal };
  } catch (error) {
    throw error;
  }
}