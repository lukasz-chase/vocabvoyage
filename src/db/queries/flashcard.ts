import { cache } from "react";
import db from "../drizzle";
import { auth } from "@clerk/nextjs";
import { eq } from "drizzle-orm";
import { flashcard } from "../schema";
import { FLASHCARD_STATE } from "@/lib/constants";

export const getFlashcardById = cache(async (flashcardId: number) => {
  const { userId } = auth();
  if (!userId) return null;
  const data = await db.query.flashcard.findFirst({
    where: eq(flashcard.id, flashcardId),
  });
  return data;
});

export const getFlashcardsBySetId = cache(async (flashcardSetId: number) => {
  const { userId } = auth();
  if (!userId) return null;
  const data = await db.query.flashcard.findMany({
    where: eq(flashcard.flashcardSetId, flashcardSetId),
  });
  const flashcardsToGuess = data.filter(
    (flashcard) => flashcard.state === FLASHCARD_STATE.NOT_GUESSED
  );

  return { allFlashcards: data, flashcardsToGuess };
});
