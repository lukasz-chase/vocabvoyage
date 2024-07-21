export const POINTS_TO_REFILL = 50;
export const MAX_HEARTS = 5;
export const quests = [
  { title: "Earn 20 XP", value: 20 },
  { title: "Earn 50 XP", value: 50 },
  { title: "Earn 100 XP", value: 100 },
];

export enum FLASHCARD_STATE {
  NOT_GUESSED = "NOT_GUESSED",
  GUESSED_CORRECTLY = "GUESSED_CORRECTLY",
  GUESSED_INCORRECTLY = "GUESSED_INCORRECTLY",
}
