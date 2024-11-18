import { type NavItem } from "@/ui/sidebar";
import {
  Squares2X2Icon,
  TableCellsIcon,
  UsersIcon,
} from "@heroicons/react/24/solid";
import { useEffect, useMemo, useState } from "react";

export const useNav = () => {
  const [navs, setNavs] = useState<NavItem[]>([]);

  const m_navs: NavItem[] = useMemo(
    () => [
      {
        label: "Overview",
        href: "/dashboard",
        icon: { type: "icon", content: Squares2X2Icon },
      },
      {
        label: "Requests",
        href: "/dashboard/requests",
        icon: { type: "icon", content: TableCellsIcon },
      },
      {
        label: "Agents",
        href: "#",
        icon: { type: "icon", content: UsersIcon },
      },
    ],
    [],
  );

  useEffect(() => {
    setNavs(m_navs);
  }, [m_navs]);

  return { navs };
};
