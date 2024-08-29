export enum challengeTypesEnum {
  SELECT = "SELECT",
  ASSIST = "ASSIST",
  WORDS_MASH = "WORDS_MASH",
}

export const challengeTypesArray = ["SELECT", "ASSIST", "WORDS_MASH"] as const;
export const ChallengeType = `${challengeTypesEnum}`;
