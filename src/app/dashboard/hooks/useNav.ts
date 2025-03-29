import { useAuthCtx } from "@/app/ctx/auth/auth";
import { type INavItem } from "@/ui/sidebar/types";
import {
  ShieldCheckIcon,
  Squares2X2Icon,
  TableCellsIcon,
  UsersIcon,
} from "@heroicons/react/24/solid";
import { useCallback, useEffect, useMemo, useState } from "react";

// const f_navs: INavItem[] = [
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
  const [navs, setNavs] = useState<INavItem[] | undefined>();

  const n_navs: INavItem[] = useMemo(
    () => [
      {
        label: "Activation",
        href: "/dashboard",
        icon: { type: "icon", content: ShieldCheckIcon },
      },
    ],
    [],
  );

  const s_navs: INavItem[] = useMemo(
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

  const a_navs: INavItem[] = useMemo(
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

  const m_navs: INavItem[] = useMemo(
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

  const u_navs: INavItem[] = useMemo(
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

  const { vxuser } = useAuthCtx();
  const getUserNavs = useCallback(() => {
    if (!vxuser?.role || vxuser?.role.length < 1) {
      setNavs(n_navs);
      return;
    }
    const roles = vxuser.role.split(",");
    roles.forEach((claim) => {
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
        case "neo":
          setNavs(n_navs);
          break;
        default:
          setNavs(n_navs);
          break;
      }
    });
  }, [m_navs, s_navs, n_navs, a_navs, u_navs, vxuser]);

  useEffect(() => {
    getUserNavs();
  }, [getUserNavs]);

  return { navs };
};
