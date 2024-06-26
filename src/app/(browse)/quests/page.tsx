import { FeedWrapper } from "@/components/feedWrapper";
import { StickyWrapper } from "@/components/stickyWrapper";
import { Progress } from "@/components/ui/progress";
import { CourseProgress } from "@/components/courseProgress";
import Image from "next/image";
import { redirect } from "next/navigation";
import { quests } from "@/lib/constants";
import { getUserSubscription } from "@/db/queries/userSubscription";
import { getCourseProgressById } from "@/db/queries/courseProgress";
import { getUserData } from "@/db/queries/userData";

const QuestsPage = async () => {
  const userData = await getUserData();
  if (!userData || !userData.activeCourseId || !userData.activeCourse)
    redirect("/courses");
  const courseProgressData = getCourseProgressById(userData.activeCourseId);
  const userSubscriptionData = getUserSubscription();
  const [courseProgress, userSubscription] = await Promise.all([
    courseProgressData,
    userSubscriptionData,
  ]);
  if (!courseProgress) redirect("/courses");
  const isPro = !!userSubscription?.isActive;
  return (
    <div className="flex flex-row-reverse gap-[48px] px-6">
      <StickyWrapper>
        <CourseProgress
          activeCourse={userData.activeCourse}
          hasActiveSubscription={isPro}
          hearts={courseProgress.hearts}
          points={courseProgress.points}
        />
      </StickyWrapper>
      <FeedWrapper>
        <div className="w-full flex flex-col items-center">
          <Image
            src="/quests.svg"
            alt="quests"
            width={90}
            height={90}
            className=""
          />
          <h1 className="text-center font-bold text-neutral-800 text-2xl my-6">
            Quests
          </h1>
          <p className="text-primary text-center text-lg mb-6">
            Complete quests by earning points
          </p>
          <ul className="w-full">
            {quests.map((quest) => {
              const progress = (courseProgress.points / quest.value) * 100;
              return (
                <div
                  className="flex items-center w-full p-4 gap-x-4 border-t-2"
                  key={quest.title}
                >
                  <Image
                    src="/points.svg"
                    alt="Points"
                    width={60}
                    height={60}
                  />
                  <div className="flex flex-col gap-y-2 w-full">
                    <p className="text-neutral-700 text-xl font-bold">
                      {quest.title}
                    </p>
                    <Progress value={progress} className="h-3" />
                  </div>
                </div>
              );
            })}
          </ul>
        </div>
      </FeedWrapper>
    </div>
  );
};

export default QuestsPage;
