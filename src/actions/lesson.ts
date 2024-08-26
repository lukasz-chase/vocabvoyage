"use server";
import db from "@/db/drizzle";
import { lessons } from "@/db/schema";
import { auth } from "@clerk/nextjs";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export const createLesson = async (lessonData: {
  title: string;
  unitId: number;
  order: number;
}) => {
  const { userId } = auth();
  if (!userId) {
    throw new Error("Unauthorized");
  }
  try {
    await db.insert(lessons).values(lessonData);
  } catch (error) {
    console.log(error);
  }
  revalidatePath(`/admin/lessons`);
};

export const deleteLesson = async (lessonId: number) => {
  const { userId } = auth();
  if (!userId) {
    throw new Error("Unauthorized");
  }
  try {
    await db.delete(lessons).where(eq(lessons.id, lessonId));
  } catch (error) {
    console.log(error);
  }
  revalidatePath(`/admin/lessons`);
};

export const updateLesson = async (lesson: typeof lessons.$inferSelect) => {
  const { userId } = auth();
  if (!userId) {
    throw new Error("Unauthorized");
  }
  await db.update(lessons).set(lesson).where(eq(lessons.id, lesson.id));
  revalidatePath(`/admin/lessons/${lesson.id}/edit`);
  revalidatePath(`/admin/lessons`);
};
