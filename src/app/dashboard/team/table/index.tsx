import { DataTable } from "./table";
import { columns } from "./column";

export const Team = () => {
  return (
    <DataTable
      data={[]}
      loading={false}
      toolbarActions={[false, () => false]}
      columns={columns}
    />
  );
};
