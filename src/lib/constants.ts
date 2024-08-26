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
    { name: "title", label: "Title", placeholder: "Title" },
    { name: "unitId", label: "Description", placeholder: "Description" },
    { name: "order", label: "order", placeholder: "order" },
  ],
  challenges: [
    { name: "lessonId", label: "Title", placeholder: "Title" },
    { name: "type", label: "Description", placeholder: "Description" },
    { name: "question", label: "order", placeholder: "order" },
    { name: "order", label: "order", placeholder: "order" },
  ],
};
