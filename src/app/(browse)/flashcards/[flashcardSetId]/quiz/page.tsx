import { getFlashcardsBySetId } from "@/db/queries/flashcard";
import QuizCard from "./quizCard";
import QuizHeader from "./quizHeader";
import QuizCompleted from "./quizCompleted";

type Props = {
  params: {
    flashcardSetId: number;
  };
};

const Quiz = async ({ params: { flashcardSetId } }: Props) => {
  const flashcardsData = getFlashcardsBySetId(flashcardSetId);
  const [flashcards] = await Promise.all([flashcardsData]);
  if (!flashcards) return <div>Flashcards set not found</div>;
  if (flashcards.flashcardsToGuess.length === 0)
    return (
      <QuizCompleted
        flashcards={flashcards.allFlashcards}
        title="Go back to all sets"
      />
    );

  return (
    <div className="flex justify-center items-center flex-col">
      <QuizHeader flashcards={flashcards.allFlashcards} />
      <QuizCard flashcard={flashcards.flashcardsToGuess[0]} />
    </div>
  );
};

export default Quiz;
