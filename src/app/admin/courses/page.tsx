import React from "react";
import { courses } from "@/db/schema";
import AdminTable from "../AdminTable";
import { getCourses } from "@/db/queries/courses";
import { deleteCourse } from "@/actions/course";

const Courses = async () => {
  const coursesData = await getCourses();

  return (
    <AdminTable
      data={coursesData}
      dataName="courses"
      schema={courses}
      deleteFunction={deleteCourse}
    />
  );
};

export default Courses;
