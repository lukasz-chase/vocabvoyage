import { CourseProgress } from "@/components/courseProgress";
import { FeedWrapper } from "@/components/feedWrapper";
import { Quests } from "@/components/quests";
import { StickyWrapper } from "@/components/stickyWrapper";
import { getCourseProgressData } from "@/db/queries/courseProgress";
import { getLessonPercentage } from "@/db/queries/lessons";
import { getUnitsByCourseId } from "@/db/queries/units";
import { getUserData } from "@/db/queries/userData";
import { getUserSubscription } from "@/db/queries/userSubscription";
import { redirect } from "next/navigation";
import React from "react";
import { Unit } from "./unit";
import { Header } from "./header";

const Learn = async () => {
  const userData = await getUserData();
  if (!userData?.activeCourseId) redirect("/courses");
  const unitsData = getUnitsByCourseId(userData.activeCourseId);
  const courseProgressData = getCourseProgressData(userData.activeCourseId);
  const lessonPercentageData = getLessonPercentage(userData.activeCourseId);
  const userSubscriptionData = getUserSubscription();

  const [units, courseProgress, lessonPercentage, userSubscription] =
    await Promise.all([
      unitsData,
      courseProgressData,
      lessonPercentageData,
      userSubscriptionData,
    ]);
  if (!courseProgress || !userData || !userData.activeCourse || !courseProgress)
    redirect("/courses");
  const isPro = !!userSubscription?.isActive;
  return (
    <div className="flex flex-row-reverse gap-[48px] px-6">
      <StickyWrapper>
        <CourseProgress
          activeCourse={userData.activeCourse}
          hearts={courseProgress.hearts!}
          points={courseProgress.points!}
          hasActiveSubscription={isPro}
        />
        <Quests points={courseProgress.points!} />
      </StickyWrapper>
      <FeedWrapper>
        <Header title={userData.activeCourse.title} />
        {units.map((unit) => (
          <div key={unit.id} className="mb-10">
            <Unit
              id={unit.id}
              order={unit.order}
              description={unit.description}
              lessons={unit.lessons}
              title={unit.title}
              activeLesson={courseProgress.activeLesson}
              activeLessonPercentage={lessonPercentage}
            />
          </div>
        ))}
      </FeedWrapper>
    </div>
  );
};

export default Learn;
