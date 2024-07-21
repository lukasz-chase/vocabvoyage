import { flashcard } from "@/db/schema";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { FLASHCARD_STATE } from "./constants";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function absoluteUrl(path: string) {
  return `${process.env.NEXT_PUBLIC_APP_URL}${path}`;
}

export const getFlashcardByStates = (
  flashcards: (typeof flashcard.$inferSelect)[]
) => {
  const guessedFlashcards = flashcards.filter(
    (flashcard) => flashcard.state !== FLASHCARD_STATE.NOT_GUESSED
  ).length;
  const guessedCorrectlyFlashcards = flashcards.filter(
    (flashcard) => flashcard.state === FLASHCARD_STATE.GUESSED_CORRECTLY
  ).length;
  const guessedIncorrectlyFlashcards = flashcards.filter(
    (flashcard) => flashcard.state === FLASHCARD_STATE.GUESSED_INCORRECTLY
  ).length;
  return {
    guessedFlashcards,
    guessedCorrectlyFlashcards,
    guessedIncorrectlyFlashcards,
  };
};
