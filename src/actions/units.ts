"use server";

import db from "@/db/drizzle";
import { units } from "@/db/schema";
import { auth } from "@clerk/nextjs";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export const updateUnit = async (unit: typeof units.$inferSelect) => {
  const { userId } = auth();
  if (!userId) {
    throw new Error("Unauthorized");
  }
  await db
    .update(units)
    .set({
      title: unit.title,
      courseId: unit.courseId,
      order: unit.order,
      description: unit.description,
    })
    .where(eq(units.id, unit.id));
  revalidatePath(`/admin/units/${unit.id}/edit`);
  revalidatePath(`/admin/units`);
};

export const createUnit = async (unitData: {
  title: string;
  description: string;
  courseId: number;
  order: number;
}) => {
  const { userId } = auth();
  if (!userId) {
    throw new Error("Unauthorized");
  }
  try {
    await db.insert(units).values(unitData);
  } catch (error) {
    console.log(error);
  }
  revalidatePath(`/admin/units`);
};

export const deleteUnit = async (unitId: number) => {
  const { userId } = auth();
  if (!userId) {
    throw new Error("Unauthorized");
  }
  try {
    await db.delete(units).where(eq(units.id, unitId));
  } catch (error) {
    console.log(error);
  }
  revalidatePath(`/admin/units`);
};
