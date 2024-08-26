import React from "react";
import { lessons } from "@/db/schema";
import AdminTable from "../AdminTable";
import { getLessons } from "@/db/queries/lessons";
import { deleteLesson } from "@/actions/lesson";

const Lessons = async () => {
  const lessonsData = await getLessons();

  return (
    <AdminTable
      data={lessonsData}
      dataName="lessons"
      schema={lessons}
      deleteFunction={deleteLesson}
    />
  );
};

export default Lessons;
