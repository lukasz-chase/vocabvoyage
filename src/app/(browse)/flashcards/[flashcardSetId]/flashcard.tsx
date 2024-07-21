import { flashcard } from "@/db/schema";

type Props = {
  flashcard: typeof flashcard.$inferSelect;
};

const Flashcard = ({ flashcard }: Props) => {
  return (
    <div className="py-4 space-y-2 bg-primary text-primary-foreground w-80 px-2 rounded-xl border-secondary border-2">
      <p>{flashcard.term}</p>
      <p>{flashcard.definition}</p>
    </div>
  );
};

export default Flashcard;
