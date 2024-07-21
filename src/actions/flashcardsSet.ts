"use server";
import db from "@/db/drizzle";
import { flashcardSets } from "@/db/schema";
import { auth } from "@clerk/nextjs";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export const createFlashcardsSet = async () => {
  const { userId } = auth();
  if (!userId) {
    throw new Error("Unauthorized");
  }
  try {
    const res = await db
      .insert(flashcardSets)
      .values({ title: "New Flashcards Set", userId, flashcardsToLearn: [] })
      .returning();
    return res[0].id;
  } catch (error) {
    console.log(error);
  }
};

export const updateFlashcardsSet = async (
  title: string,
  flashcardsSetId: number
) => {
  const { userId } = auth();
  if (!userId) {
    throw new Error("Unauthorized");
  }
  await db
    .update(flashcardSets)
    .set({ title })
    .where(eq(flashcardSets.id, flashcardsSetId));
  revalidatePath(`/flashcards/${flashcardsSetId}/edit`);
  revalidatePath(`/flashcards`);
};

export const deleteFlashcardsSet = async (flashcardSetId: number) => {
  const { userId } = auth();
  if (!userId) {
    throw new Error("Unauthorized");
  }
  try {
    await db.delete(flashcardSets).where(eq(flashcardSets.id, flashcardSetId));
  } catch (error) {
    console.log(error);
  }
  revalidatePath(`/flashcards/${flashcardSetId}/edit`);
};
