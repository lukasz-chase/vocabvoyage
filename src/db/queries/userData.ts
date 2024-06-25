import { cache } from "react";
import db from "../drizzle";
import { eq } from "drizzle-orm";
import { userData } from "../schema";
import { auth } from "@clerk/nextjs";

export const getUserData = cache(async () => {
  const { userId } = auth();
  if (!userId) return null;
  const data = await db.query.userData.findFirst({
    where: eq(userData.userId, userId),
  });
  return data;
});
