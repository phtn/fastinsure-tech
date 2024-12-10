import { DataTable } from "./table";
import { columns } from "./column";

export const Team = () => {
  return (
    <DataTable
      data={[
        { id: "984 Coffee", value: 4000 },
        { id: "Cocaine", value: 4000 },
        { id: "Meth", value: 4000 },
        { id: "Pot", value: 4000 },
        { id: "Heroine", value: 4000 },
        { id: "Acid", value: 4000 },
        { id: "DMT", value: 4000 },
      ]}
      loading={false}
      toolbarActions={[false, () => false]}
      columns={columns}
    />
  );
};
