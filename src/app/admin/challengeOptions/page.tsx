import React from "react";
import { challengeOptions } from "@/db/schema";
import AdminTable from "../AdminTable";
import { getChallengeOptions } from "@/db/queries/challengesOptions";
import { deleteChallengeOption } from "@/actions/challengeOptions";

const Challenges = async () => {
  const challengeOptionsData = await getChallengeOptions();

  return (
    <AdminTable
      data={challengeOptionsData}
      dataName="challengeOptions"
      schema={challengeOptions}
      deleteFunction={deleteChallengeOption}
    />
  );
};

export default Challenges;
