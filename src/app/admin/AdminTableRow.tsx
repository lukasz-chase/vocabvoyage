"use client";

import { Button } from "@/components/ui/button";
import { useTransition } from "react";
import { toast } from "sonner";

type Props = {
  data: any;
  dataName: string;
  deleteFunction: (id: number) => Promise<void>;
};
const AdminTableRow = ({ data, deleteFunction, dataName }: Props) => {
  const [pending, startTransition] = useTransition();

  const handleDelete = () => {
    startTransition(async () => {
      try {
        await deleteFunction(data.id);
        toast.success(`${dataName} deleted successfully`);
      } catch (error) {
        toast.error(`There was an error while deleting ${dataName}`);
      }
    });
  };
  return (
    <tr className="border-b border-gray-200 hover:bg-gray-50">
      {Object.values(data).map((v: any, i: number) => (
        <td className="py-2 px-4 text-center" key={`${v} - ${i}`}>
          {v}
        </td>
      ))}
      <td className="py-2 px-4 flex gap-2 items-center justify-center">
        <Button variant="primary" asChild>
          <a href={`/admin/${dataName}/${data.id}/edit`}>Edit</a>
        </Button>
        <Button variant="destructive" onClick={handleDelete} disabled={pending}>
          Delete
        </Button>
      </td>
    </tr>
  );
};

export default AdminTableRow;
