import { rankItem } from "@tanstack/match-sorter-utils";
import { type FilterFn } from "@tanstack/react-table";

type Any = string | number | boolean;
export const fuzzyFilter: FilterFn<Any> = (
  row,
  columnId,
  value: string,
  addMeta,
) => {
  // Rank the item
  const itemRank = rankItem(row.getValue(columnId), value);

  // Store the itemRank info
  addMeta({ itemRank });

  // Return if the item should be filtered in/out
  return itemRank.passed;
};
