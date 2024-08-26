export const challengeTypesArray = ["SELECT", "ASSIST"] as const;
export type ChallengeType = (typeof challengeTypesArray)[number];
