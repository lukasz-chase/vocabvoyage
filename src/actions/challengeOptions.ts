"use server";

import db from "@/db/drizzle";
import { challengeOptions } from "@/db/schema";
import { auth } from "@clerk/nextjs";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export const updateChallengeOptions = async (
  challengeOption: typeof challengeOptions.$inferSelect
) => {
  const { userId } = auth();
  if (!userId) {
    throw new Error("Unauthorized");
  }
  await db
    .update(challengeOptions)
    .set(challengeOption)
    .where(eq(challengeOptions.id, challengeOption.id));
  revalidatePath(`/admin/challengesOptions/${challengeOption.id}/edit`);
  revalidatePath(`/admin/challengesOptions`);
};

export const createChallengeOption = async (challengeOptionData: {
  challengeId: number;
  text: string;
  correct: boolean;
  imageSrc?: string;
  audioSrc?: string;
}) => {
  const { userId } = auth();
  if (!userId) {
    throw new Error("Unauthorized");
  }
  try {
    await db.insert(challengeOptions).values(challengeOptionData);
  } catch (error) {
    console.log(error);
  }
  revalidatePath(`/admin/challengesOptions`);
};

export const deleteChallengeOption = async (challengeOptionId: number) => {
  const { userId } = auth();
  if (!userId) {
    throw new Error("Unauthorized");
  }
  try {
    await db
      .delete(challengeOptions)
      .where(eq(challengeOptions.id, challengeOptionId));
  } catch (error) {
    console.log(error);
  }
  revalidatePath(`/admin/challengesOptions`);
};
