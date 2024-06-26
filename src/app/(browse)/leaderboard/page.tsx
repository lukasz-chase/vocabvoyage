import { CourseProgress } from "@/components/courseProgress";
import { FeedWrapper } from "@/components/feedWrapper";
import { Quests } from "@/components/quests";
import { StickyWrapper } from "@/components/stickyWrapper";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { getCurrentUserCourseProgress } from "@/db/queries/courseProgress";
import { getTopTenUsers, getUserData } from "@/db/queries/userData";
import { getUserSubscription } from "@/db/queries/userSubscription";

import Image from "next/image";
import { redirect } from "next/navigation";

const LeaderboardPage = async () => {
  const currentCourseProgressData = getCurrentUserCourseProgress();
  const userSubscriptionData = getUserSubscription();
  const leaderboardData = getTopTenUsers();
  const userData = getUserData();
  const [courseProgress, userSubscription, leaderboard, user] =
    await Promise.all([
      currentCourseProgressData,
      userSubscriptionData,
      leaderboardData,
      userData,
    ]);
  if (!courseProgress || !user?.activeCourse) redirect("/courses");
  const isPro = !!userSubscription?.isActive;
  return (
    <div className="flex flex-row-reverse gap-[48px] px-6">
      <StickyWrapper>
        <CourseProgress
          activeCourse={user.activeCourse}
          hasActiveSubscription={isPro}
          hearts={courseProgress.hearts}
          points={courseProgress.points}
        />
        <Quests points={courseProgress.points} />
      </StickyWrapper>
      <FeedWrapper>
        <div className="w-full flex flex-col items-center">
          <Image
            src="/leaderboard.svg"
            alt="leaderboard"
            width={90}
            height={90}
            className=""
          />
          <h1 className="text-center font-bold text-neutral-800 text-2xl my-6">
            Leaderboard
          </h1>
          <p className="text-primary text-center text-lg mb-6">
            See where you stand in the leaderboard
          </p>
          <Separator className="mb-4 h-0/5 rounded-full" />
          {leaderboard.map((userProgress, index) => (
            <div
              className="flex items-center w-full p-2 px-4 rounded-xl hover:bg-gray-200/50"
              key={userProgress.userId}
            >
              <p className="font-bold text-lime-700 mr-4">{index + 1}</p>
              <Avatar className="bg-green-500 border h-12 w-12 ml-3 mr-6">
                <AvatarImage
                  src={userProgress.userImageSrc}
                  className="object-cover"
                />
              </Avatar>
              <p className="font-bold text-neutral-800 flex-1">
                {userProgress.userName}
              </p>
              <p className="text-primary">{courseProgress.points} XP</p>
            </div>
          ))}
        </div>
      </FeedWrapper>
    </div>
  );
};

export default LeaderboardPage;
