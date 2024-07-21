"use client";
import Confetti from "react-confetti";
import { useAudio, useWindowSize } from "react-use";
import { CircularProgressbarWithChildren } from "react-circular-progressbar";
import { Button } from "@/components/ui/button";
import { flashcard } from "@/db/schema";
import { getFlashcardByStates } from "@/lib/utils";
import { useTransition } from "react";
import {
  resetFlashcards,
  resetIncorrectlyGuessedFlashcards,
} from "@/actions/flashcards";
import { toast } from "sonner";
import { Header } from "@/components/header";

type Props = {
  flashcards: (typeof flashcard.$inferSelect)[];
  title: string;
};

const QuizCompleted = ({ flashcards, title }: Props) => {
  const [finishAudio] = useAudio({
    src: "/finish.mp3",
    autoPlay: true,
  });
  const [pending, startTransition] = useTransition();

  const { width, height } = useWindowSize();
  const { guessedCorrectlyFlashcards, guessedIncorrectlyFlashcards } =
    getFlashcardByStates(flashcards);
  const flashcardsRatio =
    (guessedCorrectlyFlashcards / flashcards.length) * 100;
  const resetIncorrectHandler = async () => {
    try {
      await resetIncorrectlyGuessedFlashcards(flashcards[0].flashcardSetId!);
    } catch (error) {
      toast.error("Something went wrong");
      close();
    }
  };
  const resetAllHandler = async () => {
    try {
      await resetFlashcards(flashcards[0].flashcardSetId!);
    } catch (error) {
      toast.error("Something went wrong");
      close();
    }
  };
  return (
    <>
      {finishAudio}
      <Confetti
        width={width}
        height={height}
        recycle={false}
        numberOfPieces={500}
        tweenDuration={10000}
      />
      <Header title={title} link="/flashcards" />

      <div className="flex flex-col gap-y-4 lg:gap-y-8 max-w-lg mx-auto text-center items-center justify-center h-full">
        <h1 className="text-xl lg:text-3xl font-bold text-neutral-700">
          Great job! <br />
          You are doing great
        </h1>
        <div className="grid grid-cols-2 justify-evenly w-full">
          <div>
            <CircularProgressbarWithChildren
              value={flashcardsRatio}
              styles={{
                path: {
                  stroke: "#22c55e",
                },
                trail: {
                  stroke: "#f97316",
                },
              }}
            >
              <span>{flashcardsRatio}%</span>
            </CircularProgressbarWithChildren>
          </div>
          <div className="self-center flex flex-col items-start ml-auto">
            <div>
              You knew{" "}
              <span className="text-accent">{guessedCorrectlyFlashcards}</span>
            </div>
            <div>
              Still learning{" "}
              <span className="text-secondary">
                {guessedIncorrectlyFlashcards}
              </span>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-4">
          {guessedIncorrectlyFlashcards > 0 && (
            <Button
              variant="primary"
              onClick={resetIncorrectHandler}
              disabled={pending}
            >
              Retry {guessedIncorrectlyFlashcards} flashcards
            </Button>
          )}

          <Button variant="ghost" onClick={resetAllHandler} disabled={pending}>
            Restart all flashcards from this set
          </Button>
        </div>
      </div>
    </>
  );
};

export default QuizCompleted;
