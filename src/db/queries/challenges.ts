import { auth } from "@clerk/nextjs";
import { cache } from "react";
import db from "../drizzle";
import { challenges } from "../schema";
import { eq } from "drizzle-orm";

export const getChallenges = cache(async () => {
  const data = await db.query.challenges.findMany();
  return data;
});

export const getChallengeById = cache(async (challengeId: number) => {
  const { userId } = auth();
  if (!userId) return null;
  const data = await db.query.challenges.findFirst({
    where: eq(challenges.id, challengeId),
  });
  return data;
});
