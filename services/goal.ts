'use server'

import { z } from "zod";

import prisma from "@/lib/prisma";
import { GoalsProps } from "@/types/goals";
import { crateGoalSchema } from '@/validations/goal';

/**
 * Creates a new goal in the database.
 *
 * @param {z.infer<typeof crateGoalSchema>} data - The data for creating the goal.
 * @return {Promise<{ message: string; data: GoalsProps }>} - A promise that resolves to an object containing a success message and the created goal data.
 * @throws {Error} - If there is an error creating the goal.
 */
export async function createGoal(
  data: z.infer<typeof crateGoalSchema>,
  ownerId: string,
  target: 'control' | 'buy' | 'investment' | 'emergency' | 'other'
): Promise<{ message: string; data: GoalsProps; }> {
  try {
    const goal = await prisma.goal.create({
      data: {
        owner: ownerId,
        target: target,
        revenue: Number(data.revenue),
      }
    });

    return { message: "La meta se ha creado exitosamente", data: goal };
  } catch (error) {
    throw error;
  }
}