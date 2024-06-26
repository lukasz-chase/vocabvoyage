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
    with: {
      activeCourse: true,
      courseProgress: true,
    },
  });
  return data;
});

export const getTopTenUsers = cache(async () => {
  const { userId } = auth();
  if (!userId) return [];
  const data = await db.query.userData.findMany({
    limit: 10,
    with: {
      courseProgress: {
        orderBy: (courseProgress, { desc }) => [desc(courseProgress.points)],
        columns: {
          points: true,
        },
      },
    },
  });
  return data;
});
