import { updateLesson } from "@/actions/lesson";
import AdminForm from "@/app/admin/AdminForm";
import { getLesson } from "@/db/queries/lessons";

type Props = {
  params: {
    lessonId: number;
  };
};

const EditForm = async ({ params: { lessonId } }: Props) => {
  const lesson = await getLesson(lessonId);
  if (!lesson) return <div>Lesson not found</div>;

  return (
    <AdminForm
      entityType="lessons"
      data={lesson}
      updateHandler={updateLesson}
    />
  );
};

export default EditForm;
