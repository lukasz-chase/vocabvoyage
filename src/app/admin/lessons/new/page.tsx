import React from "react";
import AdminForm from "../../AdminForm";
import { createLesson } from "@/actions/lesson";

const NewLesson = () => {
  return (
    <div>
      <AdminForm entityType="lessons" createHandler={createLesson} />
    </div>
  );
};

export default NewLesson;
