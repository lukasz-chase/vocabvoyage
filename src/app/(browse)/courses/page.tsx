import { getCourses } from "@/db/queries/courses";
import { List } from "./list";
import { getUserData } from "@/db/queries/userData";

const CoursesPage = async () => {
  const coursesData = getCourses();
  const userData = getUserData();

  const [courses, user] = await Promise.all([coursesData, userData]);

  return (
    <div className="h-full max-w-[912px] px-3 mx-auto">
      <h1 className="text-2xl font-bold text-neutral-700">Language Courses</h1>
      <List courses={courses} activeCourseId={user?.activeCourseId} />
    </div>
  );
};

export default CoursesPage;
