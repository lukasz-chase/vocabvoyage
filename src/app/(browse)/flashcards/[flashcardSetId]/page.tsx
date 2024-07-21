import { getFlashcardSetById } from "@/db/queries/flashcardSets";
import React from "react";
import Flashcard from "./flashcard";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/header";

type Props = {
  params: {
    flashcardSetId: number;
  };
};

const FlashcardSet = async ({ params: { flashcardSetId } }: Props) => {
  const flashcardSetData = getFlashcardSetById(flashcardSetId);
  const [flashcardSet] = await Promise.all([flashcardSetData]);
  if (!flashcardSet) return <div>Flashcard set not found</div>;
  return (
    <div>
      <Header title={flashcardSet.title} link="/flashcards" />
      <div className="mt-2 flex gap-2">
        {flashcardSet.flashcards.length !== 0 && (
          <Button variant="primary" asChild disabled={true}>
            <a href={`/flashcards/${flashcardSetId}/quiz`}>Take a test</a>
          </Button>
        )}
        <Button variant="secondary" asChild>
          <a href={`/flashcards/${flashcardSetId}/edit`}>Edit set</a>
        </Button>
      </div>
      {flashcardSet.flashcards.length !== 0 && (
        <h2 className="mt-4">Flashcards</h2>
      )}
      <div className="grid grid-cols-[repeat(auto-fit,minmax(20rem,1fr))] mt-2">
        {flashcardSet.flashcards.map((flashcard) => (
          <Flashcard key={flashcard.id} flashcard={flashcard} />
        ))}
      </div>
    </div>
  );
};

export default FlashcardSet;
