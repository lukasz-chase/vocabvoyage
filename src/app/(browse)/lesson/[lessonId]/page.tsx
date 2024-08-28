import { redirect } from "next/navigation";
import { Quiz } from "../quiz";
import { getLesson } from "@/db/queries/lessons";
import { getCurrentUserCourseProgress } from "@/db/queries/courseProgress";
import { getUserSubscription } from "@/db/queries/userSubscription";

type Props = {
  params: {
    lessonId: number;
  };
};

const LessonIdPage = async ({ params }: Props) => {
  const lessonData = getLesson(params.lessonId);
  const userProgressData = getCurrentUserCourseProgress();
  const userSubscriptionData = getUserSubscription();
  const [lesson, userProgress, userSubscription] = await Promise.all([
    lessonData,
    userProgressData,
    userSubscriptionData,
  ]);
  if (!lesson || !userProgress) redirect("/learn");
  const initialPercentage =
    (lesson.challenges.filter((challenge) => challenge.completed).length /
      lesson.challenges.length) *
    100;
  return (
    <Quiz
      initialLessonId={lesson.id}
      initialLessonChallenges={lesson.challenges}
      initialHearts={userProgress.hearts!}
      userSubscription={userSubscription}
      initialPercentage={initialPercentage}
    />
  );
};

export default LessonIdPage;
