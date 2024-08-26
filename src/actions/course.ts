"use server";

import db from "@/db/drizzle";
import { courses } from "@/db/schema";
import { auth } from "@clerk/nextjs";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export const updateCourse = async (course: typeof courses.$inferSelect) => {
  const { userId } = auth();
  if (!userId) {
    throw new Error("Unauthorized");
  }
  await db
    .update(courses)
    .set({ title: course.title, imageSrc: course.imageSrc })
    .where(eq(courses.id, course.id));
  revalidatePath(`/admin/courses/${course.id}/edit`);
  revalidatePath(`/admin/courses`);
};

export const createCourse = async (courseData: {
  title: string;
  imageSrc: string;
}) => {
  const { userId } = auth();
  if (!userId) {
    throw new Error("Unauthorized");
  }
  try {
    await db.insert(courses).values(courseData);
  } catch (error) {
    console.log(error);
  }
  revalidatePath(`/admin/courses`);
};

export const deleteCourse = async (courseId: number) => {
  const { userId } = auth();
  if (!userId) {
    throw new Error("Unauthorized");
  }
  try {
    await db.delete(courses).where(eq(courses.id, courseId));
  } catch (error) {
    console.log(error);
  }
  revalidatePath(`/admin/courses`);
};
