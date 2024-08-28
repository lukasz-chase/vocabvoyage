import { auth } from "@clerk/nextjs";
import {
  getCourseProgressData,
  getCurrentUserCourseProgress,
} from "./courseProgress";
import { cache } from "react";
import db from "../drizzle";
import { challengeProgress, lessons } from "../schema";
import { eq } from "drizzle-orm";

export const getLessons = cache(async () => {
  const data = await db.query.lessons.findMany();
  return data;
});

export const getLesson = cache(async (id?: number) => {
  const { userId } = auth();

  if (!userId) {
    return null;
  }

  const courseProgress = await getCurrentUserCourseProgress();
  if (!courseProgress) return null;

  const lessonId = id || courseProgress?.activeLessonId;

  if (!lessonId) {
    return null;
  }

  const data = await db.query.lessons.findFirst({
    where: eq(lessons.id, lessonId),
    with: {
      challenges: {
        orderBy: (challenges, { asc }) => [asc(challenges.order)],
        with: {
          challengeOptions: true,
          challengeProgress: {
            where: eq(challengeProgress.userId, userId),
          },
        },
      },
    },
  });
  if (!data || !data.challenges) {
    return null;
  }

  const normalizedChallenges = data.challenges.map((challenge) => {
    const completed =
      challenge.challengeProgress &&
      challenge.challengeProgress.length > 0 &&
      challenge.challengeProgress.every((progress) => progress.completed);

    return { ...challenge, completed };
  });
  return { ...data, challenges: normalizedChallenges };
});

export const getLessonPercentage = cache(async (courseId: number) => {
  const courseProgress = await getCourseProgressData(courseId);
  if (!courseProgress?.activeLessonId) {
    return 0;
  }

  const lesson = await getLesson(courseProgress.activeLessonId);

  if (!lesson) {
    return 0;
  }

  const completedChallenges = lesson.challenges.filter(
    (challenge) => challenge.completed
  );
  const percentage = Math.round(
    (completedChallenges.length / lesson.challenges.length) * 100
  );
  return percentage;
});
