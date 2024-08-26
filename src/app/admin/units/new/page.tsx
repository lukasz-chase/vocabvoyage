import React from "react";
import AdminForm from "../../AdminForm";
import { createUnit } from "@/actions/units";

const NewCourse = () => {
  return (
    <div>
      <AdminForm entityType="units" createHandler={createUnit} />
    </div>
  );
};

export default NewCourse;
