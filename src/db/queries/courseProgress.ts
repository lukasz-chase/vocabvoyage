import { cache } from "react";
import db from "../drizzle";
import {
  challengeProgress,
  courseProgress,
  units,
  userData as userDataSchema,
} from "../schema";
import { and, eq } from "drizzle-orm";
import { auth } from "@clerk/nextjs";

export const getCurrentUserCourseProgress = cache(async () => {
  const { userId } = auth();
  if (!userId) {
    return null;
  }
  const userData = await db.query.userData.findFirst({
    where: eq(userDataSchema.userId, userId),
  });
  if (!userData?.activeCourseId) {
    return null;
  }
  const courseProgressData = await db.query.courseProgress.findFirst({
    where: and(
      eq(courseProgress.courseId, userData?.activeCourseId),
      eq(courseProgress.userId, userId)
    ),
  });
  return courseProgressData;
});

export const getCourseProgressById = cache(async (courseId: number) => {
  const { userId } = auth();
  if (!userId) {
    return null;
  }
  const courseProgressData = await db.query.courseProgress.findFirst({
    where: and(
      eq(courseProgress.courseId, courseId),
      eq(courseProgress.userId, userId)
    ),
  });
  return courseProgressData;
});

export const getCourseProgressData = cache(async (courseId: number) => {
  const { userId } = auth();
  if (!userId) {
    return null;
  }
  const courseProgressData = await db.query.courseProgress.findFirst({
    where: and(
      eq(courseProgress.courseId, courseId),
      eq(courseProgress.userId, userId)
    ),
  });
  const unitsInActiveCourse = await db.query.units.findMany({
    orderBy: (units, { asc }) => [asc(units.order)],
    where: eq(units.courseId, courseId),
    with: {
      lessons: {
        orderBy: (lessons, { asc }) => [asc(lessons.order)],
        with: {
          unit: true,
          challenges: {
            with: {
              challengeProgress: {
                where: eq(challengeProgress.userId, userId),
              },
            },
          },
        },
      },
    },
  });
  const firstUncompletedLesson = unitsInActiveCourse
    .flatMap((unit) => unit.lessons)
    .find((lesson) => {
      return lesson.challenges.some((challenge) => {
        return (
          !challenge.challengeProgress ||
          challenge.challengeProgress.length === 0 ||
          challenge.challengeProgress.some(
            (progress) => progress.completed === false
          )
        );
      });
    });
  return {
    ...courseProgressData,
    activeLesson: firstUncompletedLesson,
    activeLessonId: firstUncompletedLesson?.id,
  };
});
