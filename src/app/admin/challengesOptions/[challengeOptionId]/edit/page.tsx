import AdminForm from "@/app/admin/AdminForm";
import { getChallengeOptionsById } from "@/db/queries/challengesOptions";
import { updateChallengeOptions } from "@/actions/challengeOptions";

type Props = {
  params: {
    challengeOptionId: number;
  };
};

const EditForm = async ({ params: { challengeOptionId } }: Props) => {
  const challengeOptions = await getChallengeOptionsById(challengeOptionId);
  if (!challengeOptions) return <div>challenge Options not found</div>;

  return (
    <AdminForm
      entityType="challengeOptions"
      data={challengeOptions}
      updateHandler={updateChallengeOptions}
    />
  );
};

export default EditForm;
