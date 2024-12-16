import { useAuthCtx } from "@/app/ctx/auth/auth";
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

  const a_navs: NavItem[] = useMemo(
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

  const u_navs: NavItem[] = useMemo(
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
    ],
    [],
  );

  const { claims } = useAuthCtx();
  const getUserNavs = useCallback(() => {
    if (!claims || claims.length < 1) {
      setNavs(n_navs);
      return;
    }
    claims?.forEach((claim) => {
      switch (claim) {
        case "admin":
          setNavs(s_navs);
          break;
        case "manager":
          setNavs(m_navs);
          break;
        case "agent":
          setNavs(a_navs);
          break;
        case "underwriter":
          setNavs(u_navs);
          break;
        default:
          setNavs(n_navs);
          break;
      }
    });
  }, [claims, m_navs, s_navs, n_navs, a_navs, u_navs]);

  useEffect(() => {
    getUserNavs();
  }, [getUserNavs]);

  return { navs };
};
