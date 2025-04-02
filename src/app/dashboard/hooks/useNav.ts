import { useAuthCtx } from "@/app/ctx/auth/auth";
import { type INavItem } from "@/ui/sidebar/types";
import { useCallback, useEffect, useMemo, useState } from "react";

export const useNav = () => {
  const [navs, setNavs] = useState<INavItem[] | undefined>();

  const n_navs = useMemo(
    () => [
      {
        label: "Activation",
        href: "/dashboard",
        icon: { type: "icon", content: "home-linear" },
      },
    ] as  INavItem[],
    [],
  );

  const s_navs = useMemo(
    () => [
      {
        label: "Overview",
        href: "/dashboard",
        icon: { type: "icon", content: "home-linear" },
      },
      {
        label: "Requests",
        href: "/dashboard/requests",
        icon: { type: "icon", content: "folder-linear" },
      },
      {
        label: "Team",
        href: "/dashboard/team",
        icon: { type: "icon", content: "groups" },
      },
      {
        label: "Chats",
        href: "/dashboard/chats",
        icon: { type: "icon", content: "chat-linear" },
      },
    ] as INavItem[],
    [],
  );

  const a_navs  = useMemo(
    () => [
      {
        label: "Overview",
        href: "/dashboard",
        icon: { type: "icon", content: "home-linear" },
      },
      {
        label: "Requests",
        href: "/dashboard/requests",
        icon: { type: "icon", content: "folder-linear" },
      },
      {
        label: "Chats",
        href: "/dashboard/chats",
        icon: { type: "icon", content: "chat-round-outline" },
      },
    ] as INavItem[],
    [],
  );

  const m_navs = useMemo(
    () => [
      {
        label: "Overview",
        href: "/dashboard",
        icon: { type: "icon", content: "home-linear" },
      },
      {
        label: "Requests",
        href: "/dashboard/requests",
        icon: { type: "icon", content: "folder-linear" },
      },
      {
        label: "Team",
        href: "/dashboard/team",
        icon: { type: "icon", content: "group" },
      },
      {
        label: "Chats",
        href: "/dashboard/chats",
        icon: { type: "icon", content: "chat-linear" },
      },
    ] as INavItem[],
    [],
  );

  const u_navs = useMemo(
    () => [
      {
        label: "Overview",
        href: "/dashboard",
        icon: { type: "icon", content: "home-linear" },
      },
      {
        label: "Requests",
        href: "/dashboard/requests",
        icon: { type: "icon", content: "folder-linear" },
      },
      {
        label: "Chats",
        href: "/dashboard/chats",
        icon: { type: "icon", content: "chat-linear" },
      },
    ] as  INavItem[],
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
