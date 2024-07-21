"use client";
import {
  deleteFlashcardsSet,
  updateFlashcardsSet,
} from "@/actions/flashcardsSet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { toast } from "sonner";

type Props = {
  title: string;
  flashcardSetId: number;
};

const FlashcardsTitleForm = ({ title: oldTitle, flashcardSetId }: Props) => {
  const [title, setTitle] = useState(oldTitle);
  const [pending, startTransition] = useTransition();
  const router = useRouter();
  const updateTitle = () => {
    startTransition(async () => {
      try {
        await updateFlashcardsSet(title, flashcardSetId);
      } catch (error) {
        toast.error("Something went wrong while updating flashcards title");
      }
    });
  };
  const handleDelete = () => {
    startTransition(async () => {
      try {
        await deleteFlashcardsSet(flashcardSetId);
        router.push("/flashcards");
      } catch (error) {
        toast.error("Something went wrong while deleting flashcard");
      }
    });
  };
  return (
    <form className="py-4 space-y-2 text-primary w-80 " onSubmit={updateTitle}>
      <div>
        <Label htmlFor="title">Flashcards Title</Label>
        <Input
          id="title"
          placeholder="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          disabled={pending}
        />
      </div>
      <Button className="w-full" variant="secondaryOutline" disabled={pending}>
        Save the title
      </Button>
      <Button
        type="button"
        className="w-full"
        variant="destructive"
        disabled={pending}
        onClick={handleDelete}
      >
        Delete the whole set
      </Button>
    </form>
  );
};

export default FlashcardsTitleForm;
