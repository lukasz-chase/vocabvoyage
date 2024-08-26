import { auth } from "@clerk/nextjs";
import { cache } from "react";
import db from "../drizzle";
import { challenges } from "../schema";
import { eq } from "drizzle-orm";

export const getChallengeById = cache(async (challengeId: number) => {
  const { userId } = auth();
  if (!userId) return null;
  const data = await db.query.flashcard.findFirst({
    where: eq(challenges.id, challengeId),
  });
  return data;
});
