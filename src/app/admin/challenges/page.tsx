import React from "react";
import { challenges } from "@/db/schema";
import AdminTable from "../AdminTable";
import { deleteChallenge } from "@/actions/challenge";
import { getChallenges } from "@/db/queries/challenges";

const Challenges = async () => {
  const challengesData = await getChallenges();

  return (
    <AdminTable
      data={challengesData}
      dataName="challenges"
      schema={challenges}
      deleteFunction={deleteChallenge}
    />
  );
};

export default Challenges;
