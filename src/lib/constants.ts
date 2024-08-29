import { challengeTypesArray } from "@/types";

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

export enum FieldTypes {
  INPUT = "INPUT",
  SELECT = "SELECT",
  CHECKBOX = "CHECKBOX",
}

export const AdminFieldStructure = {
  courses: [
    {
      name: "title",
      label: "Title",
      placeholder: "Title",
      type: FieldTypes.INPUT,
    },
    {
      name: "imageSrc",
      label: "Image Src",
      placeholder: "Image Src",
      type: FieldTypes.INPUT,
    },
  ],
  units: [
    {
      name: "title",
      label: "Title",
      placeholder: "Title",
      type: FieldTypes.INPUT,
    },
    {
      name: "description",
      label: "Description",
      placeholder: "Description",
      type: FieldTypes.INPUT,
    },
    {
      name: "courseId",
      label: "courseId",
      placeholder: "courseId",
      type: FieldTypes.INPUT,
    },
    {
      name: "order",
      label: "order",
      placeholder: "order",
      type: FieldTypes.INPUT,
    },
  ],
  lessons: [
    {
      name: "Title",
      label: "Title",
      placeholder: "Title",
      type: FieldTypes.INPUT,
    },
    {
      name: "unitId",
      label: "unitId",
      placeholder: "unitId",
      type: FieldTypes.INPUT,
    },
    {
      name: "order",
      label: "order",
      placeholder: "order",
      type: FieldTypes.INPUT,
    },
  ],
  challenges: [
    {
      name: "lessonId",
      label: "lessonId",
      placeholder: "lessonId",
      type: FieldTypes.INPUT,
    },
    {
      name: "type",
      label: "type",
      placeholder: "type",
      type: FieldTypes.SELECT,
      selectOptions: challengeTypesArray,
    },
    {
      name: "question",
      label: "question",
      placeholder: "question",
      type: FieldTypes.INPUT,
    },
    {
      name: "order",
      label: "order",
      placeholder: "order",
      type: FieldTypes.INPUT,
    },
  ],
  challengeOptions: [
    {
      name: "challengeId",
      label: "challengeId",
      placeholder: "challengeId",
      type: FieldTypes.INPUT,
    },
    {
      name: "text",
      label: "text",
      placeholder: "text",
      type: FieldTypes.INPUT,
    },
    {
      name: "correct",
      label: "correct",
      placeholder: "correct",
      type: FieldTypes.CHECKBOX,
    },
    {
      name: "imageSrc",
      label: "imageSrc",
      placeholder: "imageSrc",
      type: FieldTypes.INPUT,
    },
    {
      name: "audioSrc",
      label: "audioSrc",
      placeholder: "audioSrc",
      type: FieldTypes.INPUT,
    },
  ],
};
