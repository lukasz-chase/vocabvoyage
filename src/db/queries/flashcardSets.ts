import { cache } from "react";
import db from "../drizzle";
import { auth } from "@clerk/nextjs";
import { and, eq } from "drizzle-orm";
import { flashcardSets } from "../schema";
import { getFlashcardById } from "./flashcard";

export const getFlashcardSets = cache(async () => {
  const { userId } = auth();
  if (!userId) return [];
  const data = await db.query.flashcardSets.findMany({
    where: eq(flashcardSets.userId, userId),
    with: {
      flashcards: true,
    },
  });
  return data;
});

export const getFlashcardSetById = cache(async (flashcardSetId: number) => {
  const { userId } = auth();
  if (!userId) return null;
  const data = await db.query.flashcardSets.findFirst({
    where: and(
      eq(flashcardSets.userId, userId),
      eq(flashcardSets.id, flashcardSetId)
    ),
    with: {
      flashcards: true,
    },
  });

  return data;
});
export const getIncorrectlyGuessedFlashcards = async (
  flashcardSetId: number
) => {
  const { userId } = auth();
  if (!userId) {
    throw new Error("Unauthorized");
  }
  const flashcardSet = await getFlashcardSetById(flashcardSetId);
  console.log(flashcardSet);
  if (!flashcardSet) throw new Error("Flashcard set not found");
  const flashcards = [];
  for (const flashcardId of flashcardSet.flashcardsToLearn) {
    const flashcard = await getFlashcardById(flashcardId);
    if (flashcard) flashcards.push(flashcard);
  }

  try {
    return flashcards;
  } catch (error: any) {
    throw new Error("Something went wrong", error);
  }
};
