"use server";

import db from "@/db/drizzle";
import { challenges } from "@/db/schema";
import { challengeTypesEnum } from "@/types";
import { auth } from "@clerk/nextjs";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export const updateChallenge = async (
  challenge: typeof challenges.$inferSelect
) => {
  const { userId } = auth();
  if (!userId) {
    throw new Error("Unauthorized");
  }
  console.log(challenge);

  await db
    .update(challenges)
    .set(challenge)
    .where(eq(challenges.id, challenge.id));
  revalidatePath(`/admin/challenges/${challenge.id}/edit`);
  revalidatePath(`/admin/challenges`);
};

export const createChallenge = async (challengeData: {
  type: challengeTypesEnum;
  question: string;
  lessonId: number;
  order: number;
}) => {
  const { userId } = auth();
  if (!userId) {
    throw new Error("Unauthorized");
  }
  try {
    await db.insert(challenges).values(challengeData);
  } catch (error) {
    console.log(error);
  }
  revalidatePath(`/admin/challenges`);
};

export const deleteChallenge = async (challengeId: number) => {
  const { userId } = auth();
  if (!userId) {
    throw new Error("Unauthorized");
  }
  try {
    await db.delete(challenges).where(eq(challenges.id, challengeId));
  } catch (error) {
    console.log(error);
  }
  revalidatePath(`/admin/challenges`);
};
