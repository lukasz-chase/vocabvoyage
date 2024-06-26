"use server";
import db from "@/db/drizzle";
import { getCourseProgressById } from "@/db/queries/courseProgress";
import { getCourseById } from "@/db/queries/courses";
import { getUserData } from "@/db/queries/userData";
import {
  courseProgress as courseProgressSchema,
  userData as userSchema,
} from "@/db/schema";
import { auth, currentUser } from "@clerk/nextjs";
import { and, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export const setActiveCourse = async (courseId: number) => {
  const { userId } = auth();
  const user = await currentUser();
  const userData = await getUserData();

  if (!userId || !user || !userData) {
    throw new Error("Unauthorized");
  }
  const course = await getCourseById(courseId);
  if (!course) {
    throw new Error("Course not found");
  }
  const courseProgress = await getCourseProgressById(courseId);

  if (!course.units.length || !course.units[0].lessons.length) {
    throw new Error("Course is empty");
  }

  try {
    await db
      .update(userSchema)
      .set({
        activeCourseId: courseId,
      })
      .where(eq(userSchema.userId, userId));
    if (!courseProgress) {
      await db.insert(courseProgressSchema).values({
        courseId,
        userId,
      });
    }
  } catch (error) {
    console.log(error);
    throw new Error("Something went wrong");
  }

  revalidatePath("/courses");
  revalidatePath("/learn");
  redirect("/learn");
};
