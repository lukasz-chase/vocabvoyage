import { auth } from "@clerk/nextjs";
import { cache } from "react";
import db from "../drizzle";
import { userSubscription } from "../schema";
import { eq } from "drizzle-orm";

const DAY_IN_MS = 86_400_000;

export const getUserSubscription = cache(async () => {
  const { userId } = auth();
  if (!userId) return null;
  const data = await db.query.userSubscription.findFirst({
    where: eq(userSubscription.userId, userId),
  });

  if (!data) return null;

  const isActive =
    data.stripePriceId &&
    data.stripeCurrentPeriodEnd?.getTime()! + DAY_IN_MS > Date.now();

  return { ...data, isActive: !!isActive };
});
