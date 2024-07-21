import { useState } from "react";
import Image from "next/image";
import { ResultCard } from "./resultCard";
import { useRouter } from "next/navigation";
import Confetti from "react-confetti";
import { useAudio, useWindowSize } from "react-use";
import { Footer } from "./footer";

type Props = { initialLessonId: number; challengesLength: number };

const LessonCompleted = ({ initialLessonId, challengesLength }: Props) => {
  const [lessonId] = useState(initialLessonId);
  const [finishAudio] = useAudio({
    src: "/finish.mp3",
    autoPlay: true,
  });
  const { width, height } = useWindowSize();
  const router = useRouter();

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
      <div className="flex flex-col gap-y-4 lg:gap-y-8 max-w-lg mx-auto text-center items-center justify-center h-full">
        <Image
          src="/finish.svg"
          alt="Finish"
          className="hidden lg:block"
          height={100}
          width={100}
        />
        <Image
          src="/finish.svg"
          alt="Finish"
          className="block lg:hidden"
          height={50}
          width={50}
        />
        <h1 className="text-xl lg:text-3xl font-bold text-neutral-700">
          Great job! <br />
          Youve completed the lesson.
        </h1>
        <div className="flex items-center gap-x-4 w-full">
          <ResultCard variant="points" value={challengesLength * 10} />
          <ResultCard variant="hearts" value={challengesLength * 10} />
        </div>
      </div>
      <Footer
        lessonId={lessonId}
        status="completed"
        onCheck={() => router.push("/learn")}
      />
    </>
  );
};

export default LessonCompleted;
