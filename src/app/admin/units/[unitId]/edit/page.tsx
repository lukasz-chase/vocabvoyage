import { updateUnit } from "@/actions/units";
import AdminForm from "@/app/admin/AdminForm";
import { getUnitById } from "@/db/queries/units";

type Props = {
  params: {
    unitId: number;
  };
};

const EditForm = async ({ params: { unitId } }: Props) => {
  const unit = await getUnitById(unitId);
  if (!unit) return <div>Course not found</div>;

  return (
    <AdminForm entityType="units" data={unit} updateHandler={updateUnit} />
  );
};

export default EditForm;
