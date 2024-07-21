type Props = {
  flashcardSetId: number;
  title: string;
  flashcardsSize: number;
};

export const FlashcardSetCard = ({
  flashcardSetId,
  title,
  flashcardsSize,
}: Props) => {
  return (
    <a
      href={`/flashcards/${flashcardSetId}`}
      className="p-4 border-2 border-primary border-b-4 rounded-xl active:border-b-0"
    >
      <h1 className="text-2xl font-bold">{title}</h1>
      <p className="bg-secondary w-fit rounded-xl p-1 text-sm">
        {flashcardsSize} flashcards
      </p>
    </a>
  );
};
