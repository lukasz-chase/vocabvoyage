import React from "react";
import AdminForm from "../../AdminForm";
import { createChallenge } from "@/actions/challenge";

const NewChallenge = () => {
  return (
    <div>
      <AdminForm entityType="challenges" createHandler={createChallenge} />
    </div>
  );
};

export default NewChallenge;
