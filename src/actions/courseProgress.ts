"use server";

import { POINTS_TO_REFILL } from "@/lib/constants";
import db from "@/db/drizzle";
import { challengeProgress, challenges, courseProgress } from "@/db/schema";
import { auth } from "@clerk/nextjs";
import { and, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { getCurrentUserCourseProgress } from "@/db/queries/courseProgress";
import { getUserSubscription } from "@/db/queries/userSubscription";

export const reduceHearts = async (challengeId: number) => {
  const { userId } = auth();
  if (!userId) {
    throw new Error("Unauthorized");
  }

  const currentCourseProgress = await getCurrentUserCourseProgress();

  const userSubscription = await getUserSubscription();

  const challenge = await db.query.challenges.findFirst({
    where: eq(challenges.id, challengeId),
  });

  if (!challenge) throw new Error("Challenge not found");
  const lessonId = challenge.lessonId;
  const existingChallengeProgress = await db.query.challengeProgress.findFirst({
    where: and(
      eq(challengeProgress.userId, userId),
      eq(challengeProgress.challengeId, challengeId)
    ),
  });
  const isPractice = !!existingChallengeProgress;

  if (isPractice) return { error: "practice" };
  if (!currentCourseProgress) throw new Error("User progress not found");
  if (userSubscription?.isActive) {
    return { error: "subscription" };
  }
  if (currentCourseProgress.hearts === 0) return { error: "hearts" };
  await db
    .update(courseProgress)
    .set({
      hearts: Math.max(currentCourseProgress.hearts - 1, 0),
    })
    .where(eq(courseProgress.userId, userId));

  revalidatePath("/shop");
  revalidatePath("/learn");
  revalidatePath("/quests");
  revalidatePath("/leaderboard");
  revalidatePath(`/lesson/${lessonId}`);
};

export const refillHearts = async () => {
  const { userId } = auth();
  if (!userId) throw new Error("Unauthorized");
  const currentCourseProgress = await getCurrentUserCourseProgress();
  if (!currentCourseProgress) throw new Error("User progress not found");
  if (!currentCourseProgress) throw new Error("User progress not found");
  if (currentCourseProgress.hearts === 5)
    throw new Error("Hearts are already full");
  if (currentCourseProgress.points < POINTS_TO_REFILL)
    throw new Error("Not enough points");
  await db
    .update(courseProgress)
    .set({
      hearts: 5,
      points: currentCourseProgress.points - POINTS_TO_REFILL,
    })
    .where(eq(courseProgress.userId, userId));

  revalidatePath("/shop");
  revalidatePath("/quests");
  revalidatePath("/leaderboard");
  revalidatePath("/learn");
};
