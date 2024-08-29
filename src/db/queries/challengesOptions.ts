import { auth } from "@clerk/nextjs";
import { cache } from "react";
import db from "../drizzle";
import { challenges } from "../schema";
import { eq } from "drizzle-orm";

export const getChallengeOptions = cache(async () => {
  const data = await db.query.challengeOptions.findMany();
  return data;
});

export const getChallengeOptionsById = cache(async (challengeId: number) => {
  const { userId } = auth();
  if (!userId) return null;
  const data = await db.query.challengeOptions.findFirst({
    where: eq(challenges.id, challengeId),
  });
  return data;
});
