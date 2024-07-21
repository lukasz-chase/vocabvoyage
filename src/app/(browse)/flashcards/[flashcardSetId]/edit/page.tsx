import { getFlashcardSetById } from "@/db/queries/flashcardSets";
import React from "react";
import { Header } from "@/components/header";
import FlashcardForm from "./flashcardForm";
import FlashcardsTitleForm from "./FlashcardsTitleForm";

type Props = {
  params: {
    flashcardSetId: number;
  };
};

const EditFlashcardSet = async ({ params: { flashcardSetId } }: Props) => {
  const flashcardSetData = getFlashcardSetById(flashcardSetId);
  const [flashcardSet] = await Promise.all([flashcardSetData]);
  if (!flashcardSet) return <div>Flashcard set not found</div>;
  return (
    <div>
      <Header title={flashcardSet.title} link="/flashcards" />
      <FlashcardsTitleForm
        flashcardSetId={flashcardSetId}
        title={flashcardSet.title}
      />
      <h2 className="mt-4">Flashcards</h2>
      <div className="grid grid-cols-[repeat(auto-fit,minmax(20rem,1fr))] gap-2">
        {flashcardSet.flashcards.map((flashcard) => (
          <FlashcardForm
            key={flashcard.id}
            flashcard={flashcard}
            flashcardSetId={flashcardSetId}
          />
        ))}
        <FlashcardForm flashcardSetId={flashcardSetId} />
      </div>
    </div>
  );
};

export default EditFlashcardSet;
