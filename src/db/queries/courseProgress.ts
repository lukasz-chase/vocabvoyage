import { cache } from "react";
import db from "../drizzle";
import { courses } from "../schema";
import { eq } from "drizzle-orm";

export const getCourseProgressById = cache(async (courseId: number) => {
  const data = await db.query.courses.findFirst({
    where: eq(courses.id, courseId),
  });
  return data;
});
