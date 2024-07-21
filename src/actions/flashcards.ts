"use server";
import db from "@/db/drizzle";
import {
  getFlashcardSetById,
  getFlashcardSets,
  getIncorrectlyGuessedFlashcards,
} from "@/db/queries/flashcardSets";
import { flashcard, flashcardSets } from "@/db/schema";
import { FLASHCARD_STATE } from "@/lib/constants";
import { auth } from "@clerk/nextjs";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export const deleteFlashcard = async (
  flashcardId: number,
  flashcardSetId: number
) => {
  const { userId } = auth();
  if (!userId) {
    throw new Error("Unauthorized");
  }
  try {
    await db.delete(flashcard).where(eq(flashcard.id, flashcardId));
  } catch (error) {
    console.log(error);
  }
  revalidatePath(`/flashcards/${flashcardSetId}/edit`);
};

export const createFlashcard = async (flashcardData: {
  term: string;
  definition: string;
  flashcardSetId: number;
  state: FLASHCARD_STATE;
}) => {
  const { userId } = auth();
  if (!userId) {
    throw new Error("Unauthorized");
  }
  try {
    await db.insert(flashcard).values(flashcardData);
  } catch (error) {
    console.log(error);
  }
  revalidatePath(`/flashcards/${flashcardData.flashcardSetId}/edit`);
};

export const updateFlashcard = async (
  flashcardData: typeof flashcard.$inferSelect
) => {
  const { userId } = auth();
  if (!userId) {
    throw new Error("Unauthorized");
  }
  await db
    .update(flashcard)
    .set({ term: flashcardData.term, definition: flashcardData.definition })
    .where(eq(flashcard.id, flashcardData.id));
  revalidatePath(`/flashcards/${flashcardData.flashcardSetId}/edit`);
};

export const setFlashcardState = async (
  flashcardId: number,
  state: FLASHCARD_STATE
) => {
  const { userId } = auth();
  if (!userId) {
    throw new Error("Unauthorized");
  }
  await db
    .update(flashcard)
    .set({ state })
    .where(eq(flashcard.id, flashcardId));
  revalidatePath("/flashcards");
};
export const setIncorrectlyGuessedFlashcards = async (
  flashcardSetId: number,
  flashcardId: number
) => {
  const { userId } = auth();
  if (!userId) {
    throw new Error("Unauthorized");
  }
  const flashcardSet = await getFlashcardSetById(flashcardSetId);
  const updatedFlashcardsToLearn = [
    ...(flashcardSet?.flashcardsToLearn || []),
    flashcardId,
  ];
  await db
    .update(flashcardSets)
    .set({ flashcardsToLearn: updatedFlashcardsToLearn })
    .where(eq(flashcardSets.id, flashcardSetId));
  revalidatePath("/flashcards");
};

export const resetIncorrectlyGuessedFlashcards = async (
  flashcardSetId: number
) => {
  const { userId } = auth();
  if (!userId) {
    throw new Error("Unauthorized");
  }
  try {
    const incorrectlyGuessedFlashcards = await getIncorrectlyGuessedFlashcards(
      flashcardSetId
    );
    await resetFlashcardsHandler(incorrectlyGuessedFlashcards, flashcardSetId);
    return { success: true };
  } catch (error: any) {
    throw new Error("Something went wrong", error);
  }
};
export const resetFlashcards = async (flashcardSetId: number) => {
  const { userId } = auth();
  if (!userId) {
    throw new Error("Unauthorized");
  }
  const flashcardSet = await getFlashcardSetById(flashcardSetId);
  if (!flashcardSet) throw new Error("Flashcard set not found");
  await resetFlashcardsHandler(flashcardSet.flashcards, flashcardSetId);
};

const resetFlashcardsHandler = async (
  flashcards: (typeof flashcard.$inferSelect)[],
  flashcardSetId: number
) => {
  const updatePromiseArray = [];
  for (const flashcardData of flashcards) {
    updatePromiseArray.push(
      db
        .update(flashcard)
        .set({ state: FLASHCARD_STATE.NOT_GUESSED })
        .where(eq(flashcard.id, flashcardData.id))
    );
  }
  try {
    await db
      .update(flashcardSets)
      .set({ flashcardsToLearn: [] })
      .where(eq(flashcardSets.id, flashcardSetId));
    await Promise.all(updatePromiseArray);
    revalidatePath("/flashcards");
    return { success: true };
  } catch (error: any) {
    throw new Error("Something went wrong", error);
  }
};
