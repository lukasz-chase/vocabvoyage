import { getCourseById } from "@/db/queries/courses";
import AdminForm from "@/app/admin/AdminForm";
import { updateCourse } from "@/actions/course";

type Props = {
  params: {
    courseId: number;
  };
};

const EditForm = async ({ params: { courseId } }: Props) => {
  const course = await getCourseById(courseId);
  if (!course) return <div>Course not found</div>;

  return (
    <AdminForm
      entityType="courses"
      data={course}
      updateHandler={updateCourse}
    />
  );
};

export default EditForm;
