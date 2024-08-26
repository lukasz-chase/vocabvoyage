import { FLASHCARD_STATE } from "@/lib/constants";
import { challengeTypesArray } from "@/types";
import { relations } from "drizzle-orm";
import {
  boolean,
  integer,
  json,
  pgEnum,
  pgTable,
  serial,
  text,
  timestamp,
} from "drizzle-orm/pg-core";

export const courses = pgTable("courses", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  imageSrc: text("image_src").notNull(),
});

export const coursesRelations = relations(courses, ({ many }) => ({
  courseProgress: many(courseProgress),
  units: many(units),
}));

export const units = pgTable("units", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(), // Unit 1
  description: text("description").notNull(), // Learn the basics of spanish
  courseId: integer("course_id")
    .references(() => courses.id, { onDelete: "cascade" })
    .notNull(),
  order: integer("order").notNull(),
});

export const unitsRelations = relations(units, ({ many, one }) => ({
  course: one(courses, {
    fields: [units.courseId],
    references: [courses.id],
  }),
  lessons: many(lessons),
}));

export const lessons = pgTable("lessons", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  unitId: integer("unit_id")
    .references(() => units.id, { onDelete: "cascade" })
    .notNull(),
  order: integer("order").notNull(),
});

export const lessonsRelations = relations(lessons, ({ one, many }) => ({
  unit: one(units, {
    fields: [lessons.unitId],
    references: [units.id],
  }),
  challenges: many(challenges),
}));

export const challengesEnum = pgEnum("type", challengeTypesArray);

export const challenges = pgTable("challenges", {
  id: serial("id").primaryKey(),
  lessonId: integer("lesson_id")
    .references(() => lessons.id, { onDelete: "cascade" })
    .notNull(),
  type: challengesEnum("type").notNull(),
  question: text("question").notNull(),
  order: integer("order").notNull(),
});

export const challengesRelations = relations(challenges, ({ one, many }) => ({
  lesson: one(lessons, {
    fields: [challenges.lessonId],
    references: [lessons.id],
  }),
  challengeOptions: many(challengeOptions),
  challengeProgress: many(challengeProgress),
}));

export const challengeOptions = pgTable("challenge_options", {
  id: serial("id").primaryKey(),
  challengeId: integer("challenge_id")
    .references(() => challenges.id, { onDelete: "cascade" })
    .notNull(),
  text: text("text").notNull(),
  correct: boolean("correct").notNull(),
  imageSrc: text("image_src"),
  audioSrc: text("audio_src"),
});

export const challengeOptionsRelations = relations(
  challengeOptions,
  ({ one }) => ({
    challenge: one(challenges, {
      fields: [challengeOptions.challengeId],
      references: [challenges.id],
    }),
  })
);

export const challengeProgress = pgTable("challenge_progress", {
  id: serial("id").primaryKey(),
  userId: text("user_id").notNull(), // TODO: Confirm this doesn't break
  challengeId: integer("challenge_id")
    .references(() => challenges.id, { onDelete: "cascade" })
    .notNull(),
  completed: boolean("completed").notNull().default(false),
});

export const challengeProgressRelations = relations(
  challengeProgress,
  ({ one }) => ({
    challenge: one(challenges, {
      fields: [challengeProgress.challengeId],
      references: [challenges.id],
    }),
  })
);

export const courseProgress = pgTable("course_progress", {
  courseId: integer("course_id").references(() => courses.id, {
    onDelete: "cascade",
  }),
  userId: text("user_id").references(() => userData.userId, {
    onDelete: "cascade",
  }),
  hearts: integer("hearts").notNull().default(5),
  points: integer("points").notNull().default(0),
});

export const courseProgressRelations = relations(courseProgress, ({ one }) => ({
  user: one(userData, {
    fields: [courseProgress.userId],
    references: [userData.userId],
  }),
  course: one(courses, {
    fields: [courseProgress.courseId],
    references: [courses.id],
  }),
}));

export const userData = pgTable("user_data", {
  userId: text("user_id").primaryKey(),
  userName: text("user_name").notNull().default("User"),
  userImageSrc: text("user_image_src").notNull().default("/mascot.svg"),
  activeCourseId: integer("active_course_id").references(() => courses.id, {
    onDelete: "cascade",
  }),
  subscriptionId: integer("subscription_id").references(
    () => userSubscription.id,
    {
      onDelete: "cascade",
    }
  ),
});

export const userDataRelations = relations(userData, ({ one, many }) => ({
  activeCourse: one(courses, {
    fields: [userData.activeCourseId],
    references: [courses.id],
  }),
  userSubscription: one(userSubscription, {
    fields: [userData.subscriptionId],
    references: [userSubscription.id],
  }),
  courseProgress: many(courseProgress),
}));

export const userSubscription = pgTable("user_subscription", {
  id: serial("id").primaryKey(),
  userId: text("user_id").notNull().unique(),
  stripeCustomerId: text("stripe_customer_id").notNull().unique(),
  stripeSubscriptionId: text("stripe_subscription_id").notNull().unique(),
  stripePriceId: text("stripe_price_id").notNull(),
  stripeCurrentPeriodEnd: timestamp("stripe_current_period_end").notNull(),
});

export const userSubscriptionRelations = relations(
  userSubscription,
  ({ one }) => ({
    user: one(userData, {
      fields: [userSubscription.userId],
      references: [userData.userId],
    }),
  })
);

export const flashcardSets = pgTable("flashcard_sets", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  userId: text("user_id").notNull(),
  flashcardsToLearn: json("flashcards_to_learn")
    .notNull()
    .default([])
    .$type<number[]>(),
});

export const flashcardSetsRelations = relations(
  flashcardSets,
  ({ one, many }) => ({
    user: one(userData, {
      fields: [flashcardSets.userId],
      references: [userData.userId],
    }),
    flashcards: many(flashcard),
  })
);

export const flashcardStateType = pgEnum(
  "state",
  Object.values(FLASHCARD_STATE) as [string]
);

export const flashcard = pgTable("flashcard", {
  id: serial("id").primaryKey(),
  term: text("term").notNull(),
  definition: text("definition").notNull(),
  state: flashcardStateType("state")
    .notNull()
    .default(FLASHCARD_STATE.NOT_GUESSED),
  flashcardSetId: integer("flashcard_set_id").references(
    () => flashcardSets.id,
    {
      onDelete: "cascade",
    }
  ),
});
export const flashcardRelations = relations(flashcard, ({ one }) => ({
  flashcardSet: one(flashcardSets, {
    fields: [flashcard.flashcardSetId],
    references: [flashcardSets.id],
  }),
}));
