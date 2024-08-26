import AdminForm from "@/app/admin/AdminForm";
import { updateChallenge } from "@/actions/challenge";
import { getChallengeById } from "@/db/queries/challenges";

type Props = {
  params: {
    challengeId: number;
  };
};

const EditForm = async ({ params: { challengeId } }: Props) => {
  const challenge = await getChallengeById(challengeId);
  if (!challenge) return <div>challenge not found</div>;

  return (
    <AdminForm
      entityType="challenges"
      data={challenge}
      updateHandler={updateChallenge}
    />
  );
};

export default EditForm;
