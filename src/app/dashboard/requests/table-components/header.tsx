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
      "w-28 text-xs border-0 border-primary font-semibold capitalize dark:text-slate-300",
      {
        "w-32": size === "sm",
      },
      { "w-36": size === "md" },
      { "w-40": size === "lg" },
      { "w-52": size === "xl" },
      { "w-[11.5rem]": size === "2xl" },
      { "text-center": center },
    )}
  >
    {value}
  </div>
);

export const DataTableHeader = (props: { role: string | undefined }) => {
  return (
    <div className="flex h-8 items-center justify-start border-y-[0.33px] border-dotted border-primary bg-steel/20 tracking-tight text-adam dark:bg-adam">
      <HeaderItem value="id" center />
      <HeaderItem size="xl" value="created at" />
      <HeaderItem size="lg" value="assured" />
      <HeaderItem size="sm" value="type" center />
      <HeaderItem size="sm" value="coverage" center />
      <HeaderItem size="sm" value="service" center />
      <HeaderItem size="lg" value="status" center />
      <HeaderItem size="xl" value="agent" />
      <HeaderItem
        size="2xl"
        value={props.role === "underwriter" ? "supervisor" : "underwriter"}
      />
    </div>
  );
};
