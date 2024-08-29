import React from "react";
import AdminForm from "../../AdminForm";
import { createChallengeOption } from "@/actions/challengeOptions";

const NewChallengeOption = () => {
  return (
    <div>
      <AdminForm
        entityType="challengeOptions"
        createHandler={createChallengeOption}
      />
    </div>
  );
};

export default NewChallengeOption;
