"use client";
import {
  setFlashcardState,
  setIncorrectlyGuessedFlashcards,
} from "@/actions/flashcards";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { flashcard } from "@/db/schema";
import { FLASHCARD_STATE } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { useState, useTransition } from "react";
import { toast } from "sonner";

type Props = {
  flashcard: typeof flashcard.$inferSelect;
};

const QuizCard = ({ flashcard }: Props) => {
  const [showDefinition, setShowDefinition] = useState(false);
  const [pending, startTransition] = useTransition();

  const handleStateChange = async (id: number, state: FLASHCARD_STATE) => {
    startTransition(async () => {
      try {
        await setFlashcardState(id, state);
        if (state === FLASHCARD_STATE.GUESSED_INCORRECTLY) {
          await setIncorrectlyGuessedFlashcards(flashcard.flashcardSetId!, id);
        }
      } catch (error) {
        toast.error("Something went wrong");
      }
    });
  };

  return (
    <div className="w-[calc(100vw-140px)] md:w-1/2">
      <div className="p-1">
        <Card
          onClick={() => setShowDefinition(!showDefinition)}
          className={cn(
            "border-2 border-secondary transition-all duration-200",
            showDefinition && "skew-y-[180deg]"
          )}
        >
          <CardContent
            className={cn("flex aspect-square items-center justify-center p-6")}
          >
            <span className="text-md md:text-xl lg:text-2xl font-semibold">
              {showDefinition ? flashcard.definition : flashcard.term}
            </span>
          </CardContent>
        </Card>
      </div>
      <div className="flex justify-evenly gap-2 px-2">
        <Button
          variant="destructive"
          className="w-1/2"
          disabled={pending}
          onClick={() =>
            handleStateChange(flashcard.id, FLASHCARD_STATE.GUESSED_INCORRECTLY)
          }
        >
          Still learning
        </Button>
        <Button
          variant="primary"
          className="w-1/2"
          disabled={pending}
          onClick={() =>
            handleStateChange(flashcard.id, FLASHCARD_STATE.GUESSED_CORRECTLY)
          }
        >
          I know it
        </Button>
      </div>
    </div>
  );
};

export default QuizCard;
