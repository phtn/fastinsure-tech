import { cn } from "@/lib/utils";

type ColumnWidth = "xs" | "sm" | "md" | "lg" | "xl" | "2xl";
interface TableRowProps {
  value: string | number | undefined;
  size?: ColumnWidth;
  center?: boolean;
}
const HeaderItem = ({ value, size = "xs", center = false }: TableRowProps) => (
  <div
    className={cn(
      "w-28 text-xs font-semibold capitalize dark:text-slate-300",
      {
        "w-36": size === "sm",
      },
      { "w-32": size === "md" },
      { "w-40": size === "lg" },
      { "w-48": size === "xl" },
      { "w-[11.5rem]": size === "2xl" },
      { "text-center": center },
    )}
  >
    {value}
  </div>
);

export const DataTableHeader = (props: { role: string | undefined }) => {
  return (
    <div className="flex h-8 items-center justify-start border-b-[0.33px] border-dotted border-primary-300 bg-steel/20 tracking-tight text-adam dark:bg-adam">
      <HeaderItem value="id" center />
      <HeaderItem size="xl" value="created at" />
      <HeaderItem size="lg" value="assured" />
      <HeaderItem size="sm" value="type" center />
      <HeaderItem size="md" value="coverage" center />
      <HeaderItem size="md" value="service" center />
      <HeaderItem size="lg" value="status" center />
      <HeaderItem size="2xl" value="agent" />
      <HeaderItem
        size="2xl"
        value={props.role === "underwriter" ? "supervisor" : "underwriter"}
      />
    </div>
  );
};
