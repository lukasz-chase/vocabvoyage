import { Button } from "@/components/ui/button";
import AdminTableRow from "./AdminTableRow";

type Props = {
  data: any;
  dataName: string;
  schema: any;
  deleteFunction: (id: number) => Promise<void>;
};

const AdminTable = ({ data, dataName, schema, deleteFunction }: Props) => {
  return (
    <div className="container mx-auto p-4">
      <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-lg">
        <thead>
          <tr className="bg-gray-100 border-b border-gray-200">
            {Object.keys(schema).map((key) => (
              <th className="py-2 px-4" key={key}>
                {key}
              </th>
            ))}
            <th className="py-2 px-4">Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((data: any) => (
            <AdminTableRow
              data={data}
              dataName={dataName}
              key={data.id}
              deleteFunction={deleteFunction}
            />
          ))}
        </tbody>
      </table>
      <div className="w-full flex">
        <Button variant="secondary" className="ml-auto mt-2">
          <a href={`/admin/${dataName}/new`}>Create new</a>
        </Button>
      </div>
    </div>
  );
};

export default AdminTable;
