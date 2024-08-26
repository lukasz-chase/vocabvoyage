import React from "react";
import { getUnits } from "@/db/queries/units";
import { units } from "@/db/schema";
import AdminTable from "../AdminTable";
import { deleteUnit } from "@/actions/units";

const Units = async () => {
  const unitsData = await getUnits();
  return (
    <AdminTable
      data={unitsData}
      dataName="units"
      schema={units}
      deleteFunction={deleteUnit}
    />
  );
};

export default Units;
