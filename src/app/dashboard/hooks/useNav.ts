import { useAuthCtx } from "@/app/ctx/auth";
import { type NavItem } from "@/ui/sidebar";
import {
  ShieldCheckIcon,
  Squares2X2Icon,
  TableCellsIcon,
  UsersIcon,
} from "@heroicons/react/24/solid";
import { useCallback, useEffect, useMemo, useState } from "react";

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

export const a_navs: NavItem[] = [
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
];

export const useNav = () => {
  const [navs, setNavs] = useState<NavItem[] | undefined>();

  const n_navs: NavItem[] = useMemo(
    () => [
      {
        label: "Activation",
        href: "/dashboard",
        icon: { type: "icon", content: ShieldCheckIcon },
      },
    ],
    [],
  );

  const s_navs: NavItem[] = useMemo(
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
        label: "Team",
        href: "/dashboard/team",
        icon: { type: "icon", content: UsersIcon },
      },
    ],
    [],
  );

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
        label: "Team",
        href: "/dashboard/team",
        icon: { type: "icon", content: UsersIcon },
      },
    ],
    [],
  );

  const { claims } = useAuthCtx();
  const getUserNavs = useCallback(() => {
    console.log(claims);
    if (!claims || claims.length < 1) {
      return setNavs(n_navs);
    }
    claims.forEach((claim) => {
      switch (claim) {
        case "admin":
          return setNavs(s_navs);
        case "manager":
          return setNavs(m_navs);
        case "agent":
          return setNavs(n_navs);
        case "underwriter":
          return setNavs(u_navs);
        default:
          return setNavs(n_navs);
      }
    });
  }, [claims, m_navs, s_navs, n_navs]);

  useEffect(() => {
    getUserNavs();
  }, [getUserNavs]);

  return { navs };
};
