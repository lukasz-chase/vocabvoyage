import { Header } from "@/components/header";
import { Progress } from "@/components/ui/progress";
import { flashcard } from "@/db/schema";
import { getFlashcardByStates } from "@/lib/utils";

type Props = {
  flashcards: (typeof flashcard.$inferSelect)[];
};

const QuizHeader = ({ flashcards }: Props) => {
  const {
    guessedCorrectlyFlashcards,
    guessedFlashcards,
    guessedIncorrectlyFlashcards,
  } = getFlashcardByStates(flashcards);
  const flashcardsProgress = (guessedFlashcards / flashcards.length) * 100;

  return (
    <div className="flex flex-col w-full">
      <Header
        title={`${guessedFlashcards}/${flashcards.length}`}
        link={`/flashcards/${flashcards[0].flashcardSetId}`}
      />
      <div className="px-4 overflow-hidden flex flex-col gap-2">
        <Progress value={flashcardsProgress} />

        <div className="flex justify-between overflow-hidden">
          <span className="w-10 grid place-items-center rounded-full aspect-square bg-orange-500">
            {guessedIncorrectlyFlashcards}
          </span>
          <span className="w-10 grid place-items-center rounded-full aspect-square bg-accent">
            {guessedCorrectlyFlashcards}
          </span>
        </div>
      </div>
    </div>
  );
};

export default QuizHeader;
