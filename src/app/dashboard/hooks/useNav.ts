import { type UserRole } from "@/lib/secure/resource";
import { type NavItem } from "@/ui/sidebar";
import {
  Squares2X2Icon,
  TableCellsIcon,
  UsersIcon,
} from "@heroicons/react/24/solid";
import { useCallback } from "react";

// const f_navs: NavItem[] = [
//   {
//     id: 3,
//     label: "Overview",
//     href: "/dashboard",
//     icon: { type: "icon", content: Squares2X2Icon },
//   },
//   {
//     id: 4,
//     label: "Requests",
//     href: "/dashboard/requests",
//     icon: { type: "icon", content: TableCellsIcon },
//   },
//   {
//     id: 5,
//     label: "Agents",
//     href: "#",
//     icon: { type: "icon", content: UsersIcon },
//   },
// ];

const m_navs: NavItem[] = [
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
];

const a_navs: NavItem[] = [
  {
    label: "Overview",
    href: "/dashboard",
    icon: { type: "icon", content: Squares2X2Icon },
  },
  {
    label: "Requests",
    href: "/dashboard/requests/all",
    icon: { type: "icon", content: TableCellsIcon },
  },
  {
    label: "Agents",
    href: "#",
    icon: { type: "icon", content: UsersIcon },
  },
];

const u_navs: NavItem[] = [
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
];

const n_navs: NavItem[] = [
  {
    label: "Activation",
    href: "/dashboard",
    icon: { type: "icon", content: Squares2X2Icon },
  },
];

const s_navs: NavItem[] = [
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
];

export const useNav = () => {
  const getUserNavs = useCallback((claims: UserRole[] | null) => {
    if (!claims || claims.length < 1) {
      return n_navs;
    }

    claims.forEach((claim) => {
      switch (claim) {
        case "admin":
          return s_navs;
        case "manager":
          return m_navs;
        case "agent":
          return a_navs;
        case "underwriter":
          return u_navs;
        default:
          return n_navs;
      }
    });
  }, []);

  return { getUserNavs };
};
