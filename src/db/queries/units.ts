import { cache } from "react";
import db from "../drizzle";
import { challengeProgress, courses, units } from "../schema";
import { eq } from "drizzle-orm";
import { auth } from "@clerk/nextjs";
import { getUserData } from "./userData";

export const getUnits = cache(async () => {
  const data = await db.query.units.findMany();
  return data;
});

export const getUnitById = cache(async (unitId: number) => {
  const data = await db.query.units.findFirst({
    where: eq(units.id, unitId),
  });
  return data;
});

export const getUnitsByCourseId = cache(async (courseId: number) => {
  const { userId } = auth();
  const userData = await getUserData();
  if (!userId || !userData?.activeCourseId) return [];
  const data = await db.query.units.findMany({
    where: eq(courses.id, courseId),
    with: {
      lessons: {
        orderBy: (lessons, { asc }) => [asc(lessons.order)],
        with: {
          challenges: {
            orderBy: (challenges, { asc }) => [asc(challenges.order)],
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

  const normalizedData = data.map((unit) => {
    const lessonsWithCompletedStatus = unit.lessons.map((lesson) => {
      if (lesson.challenges.length === 0)
        return { ...lesson, completed: false };
      const allCompletedChallenges = lesson.challenges.every((challenge) => {
        return (
          challenge.challengeProgress &&
          challenge.challengeProgress.length > 0 &&
          challenge.challengeProgress.every((progress) => progress.completed)
        );
      });

      return { ...lesson, completed: allCompletedChallenges };
    });
    return { ...unit, lessons: lessonsWithCompletedStatus };
  });

  return normalizedData;
});
