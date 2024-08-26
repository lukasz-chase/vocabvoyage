import { getFlashcardSets } from "@/db/queries/flashcardSets";
import { FlashcardSetCard } from "./flashcardsSetCard";
import { Button } from "@/components/ui/button";
import { NewFlashcardButton } from "./NewFlashcardButton";

const WordQuiz = async () => {
  const flashcardSetsData = getFlashcardSets();
  const [flashcardSets] = await Promise.all([flashcardSetsData]);
  return (
    <div>
      <h1 className="text-3xl uppercase text-gray-500">Your flashcard sets</h1>
      <div className="grid grid-cols-[repeat(auto-fit,minmax(5rem,20rem))] gap-1 mt-4">
        {flashcardSets.map((set) => (
          <FlashcardSetCard
            key={set.id}
            flashcardSetId={set.id}
            flashcardsSize={set.flashcards.length}
            title={set.title}
          />
        ))}
        <NewFlashcardButton />
      </div>
    </div>
  );
};

export default WordQuiz;
