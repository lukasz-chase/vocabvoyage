import Image from "next/image";
import { Button } from "./ui/button";
import Link from "next/link";
import { Progress } from "./ui/progress";
import { quests } from "@/lib/constants";

type Props = {
  points: number;
};

export const Quests = ({ points }: Props) => {
  return (
    <div className="border-2 rounded-xl pb-4 space-y-4">
      <div className="flex items-center justify-between w-full space-y-2 px-4">
        <h3 className="font-bold text-lg">Quests</h3>
        <Link href="/quests">
          <Button size="sm" variant="primaryOutline">
            View all
          </Button>
        </Link>
      </div>
      <ul className="w-full space-y-4 ">
        {quests.map((quest) => {
          const progress = (points / quest.value) * 100;
          console.log(progress);
          return (
            <div
              className="flex items-center w-full p-4 gap-x-3"
              key={quest.title}
            >
              <Image src="/points.svg" alt="Points" width={40} height={40} />
              <div className="flex flex-col gap-y-2 w-full">
                <p className="text-neutral-700 text-sm font-bold">
                  {quest.title}
                </p>
                <Progress value={progress} className="h-2" />
              </div>
            </div>
          );
        })}
      </ul>
    </div>
  );
};
