"use client";
import {
  createFlashcard,
  deleteFlashcard,
  updateFlashcard,
} from "@/actions/flashcards";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { flashcard } from "@/db/schema";
import { FLASHCARD_STATE } from "@/lib/constants";
import { useState, useTransition } from "react";
import { toast } from "sonner";

type Props = {
  flashcard?: typeof flashcard.$inferSelect;
  flashcardSetId: number;
};

const FlashcardForm = ({ flashcard, flashcardSetId }: Props) => {
  const [term, setTerm] = useState(flashcard?.term || "");
  const [definition, setDefinition] = useState(flashcard?.definition || "");
  const [pending, startTransition] = useTransition();

  const flashcardHandler = () => {
    if (flashcard) {
      startTransition(async () => {
        try {
          await updateFlashcard({ ...flashcard, term, definition });
        } catch (error) {
          toast.error("Something went wrong while updating flashcard");
        }
      });
    } else {
      startTransition(async () => {
        try {
          await createFlashcard({
            term,
            definition,
            state: FLASHCARD_STATE.NOT_GUESSED,
            flashcardSetId,
          });
        } catch (error) {
          toast.error("Something went wrong while creating flashcard");
        }
      });
    }
  };
  const handleDelete = () => {
    if (!flashcard) return;
    startTransition(async () => {
      try {
        await deleteFlashcard(flashcard.id, flashcardSetId);
      } catch (error) {
        toast.error("Something went wrong while deleting flashcard");
      }
    });
  };
  return (
    <form
      className="py-4 space-y-2 bg-primary text-primary-foreground w-80 px-2 rounded-xl border-secondary border-2"
      onSubmit={flashcardHandler}
    >
      <div>
        <Label htmlFor="term">Term</Label>
        <Input
          id="term"
          placeholder="Term"
          value={term}
          onChange={(e) => setTerm(e.target.value)}
          disabled={pending}
        />
      </div>
      <div>
        <Label htmlFor="definition">Definition</Label>
        <Input
          id="definition"
          placeholder="Definition"
          value={definition}
          onChange={(e) => setDefinition(e.target.value)}
          disabled={pending}
        />
      </div>
      <Button className="w-full" variant="secondaryOutline" disabled={pending}>
        {flashcard ? "Update" : "Create"}
      </Button>
      {flashcard && (
        <Button
          type="button"
          className="w-full"
          variant="destructive"
          disabled={pending}
          onClick={handleDelete}
        >
          Delete
        </Button>
      )}
    </form>
  );
};

export default FlashcardForm;
