import React from "react";
import AdminForm from "../../AdminForm";
import { createCourse } from "@/actions/course";

const NewCourse = () => {
  return (
    <div>
      <AdminForm entityType="courses" createHandler={createCourse} />
    </div>
  );
};

export default NewCourse;
