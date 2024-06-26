import { FeedWrapper } from "@/components/feedWrapper";
import { StickyWrapper } from "@/components/stickyWrapper";
import Image from "next/image";
import { redirect } from "next/navigation";
import { Quests } from "@/components/quests";
import { getUserSubscription } from "@/db/queries/userSubscription";
import { CourseProgress } from "@/components/courseProgress";
import { getCourseProgressById } from "@/db/queries/courseProgress";
import { getUserData } from "@/db/queries/userData";
import { Items } from "./items";

const ShopPage = async () => {
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
        <Quests points={courseProgress.points} />
      </StickyWrapper>
      <FeedWrapper>
        <div className="w-full flex flex-col items-center">
          <Image
            src="/shop.svg"
            alt="shop"
            width={90}
            height={90}
            className=""
          />
          <h1 className="text-center font-bold text-neutral-800 text-2xl my-6">
            Shop
          </h1>
          <p className="text-muted-foreground text-center text-lg mb-6">
            Spend your points on cool stuff.
          </p>
          <Items
            hasActiveSubscription={isPro}
            hearts={courseProgress.hearts}
            points={courseProgress.points}
          />
        </div>
      </FeedWrapper>
    </div>
  );
};

export default ShopPage;
