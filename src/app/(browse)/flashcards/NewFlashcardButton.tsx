"use client";
import { createFlashcardsSet } from "@/actions/flashcardsSet";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { toast } from "sonner";

export const NewFlashcardButton = ({}) => {
  const [pending, startTransition] = useTransition();
  const router = useRouter();
  const createNewSetHandler = () => {
    startTransition(async () => {
      try {
        const flashcardSetId = await createFlashcardsSet();
        router.push(`/flashcards/${flashcardSetId}/edit`);
      } catch (error) {
        toast.error("Something went wrong while creating flashcard");
      }
    });
  };
  return (
    <Button
      variant="primary"
      className="h-full"
      onClick={createNewSetHandler}
      disabled={pending}
    >
      Create new set
    </Button>
  );
};
