import db from "@/db/drizzle";
import { getCourseById } from "@/db/queries/courses";
import { userData as userSchema } from "@/db/schema";
import { auth, currentUser } from "@clerk/nextjs";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export const setActiveCourse = async (courseId: number) => {
  const { userId } = auth();
  const user = await currentUser();
  if (!userId || !user) {
    throw new Error("Unauthorized");
  }
  const course = await getCourseById(courseId);
  if (!course) {
    throw new Error("Course not found");
  }

  if (!course.units.length || !course.units[0].lessons.length) {
    throw new Error("Course is empty");
  }

  await db
    .update(userSchema)
    .set({
      activeCourseId: courseId,
    })
    .where(eq(userSchema.userId, userId));

  revalidatePath("/courses");
  revalidatePath("/learn");
  redirect("/learn");
};
