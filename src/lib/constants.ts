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

export const AdminFieldStructure = {
  courses: [
    { name: "title", label: "Title", placeholder: "Title" },
    { name: "imageSrc", label: "Image Src", placeholder: "Image Src" },
  ],
  units: [
    { name: "title", label: "Title", placeholder: "Title" },
    { name: "description", label: "Description", placeholder: "Description" },
    { name: "courseId", label: "courseId", placeholder: "courseId" },
    { name: "order", label: "order", placeholder: "order" },
  ],
  lessons: [
    { name: "Title", label: "Title", placeholder: "Title" },
    { name: "unitId", label: "unitId", placeholder: "unitId" },
    { name: "order", label: "order", placeholder: "order" },
  ],
  challenges: [
    { name: "lessonId", label: "lessonId", placeholder: "lessonId" },
    { name: "type", label: "type", placeholder: "type" },
    { name: "question", label: "question", placeholder: "question" },
    { name: "order", label: "order", placeholder: "order" },
  ],
  challengeOptions: [
    { name: "challengeId", label: "challengeId", placeholder: "challengeId" },
    { name: "text", label: "text", placeholder: "text" },
    { name: "correct", label: "correct", placeholder: "correct" },
    { name: "imageSrc", label: "imageSrc", placeholder: "imageSrc" },
    { name: "audioSrc", label: "audioSrc", placeholder: "audioSrc" },
  ],
};
