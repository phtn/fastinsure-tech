import { useNav } from "@/app/dashboard/hooks/useNav";
import { motion } from "framer-motion";
import { memo, use, useCallback } from "react";
import type { NavItemProps } from "./types";
import { SidebarCtx } from "./ctx";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { HyperList } from "../list";

export const NavItems = () => {
  const { navs } = useNav();

  // const isActive = useMemo(
  //     () =>
  //       (pathname.length >= 2 && href.includes(sub!)) ||
  //       (pathname.length <= 2 && `/${pathname[1]}` === href),
  //     [pathname, href, sub],
  //   );

  return (
    <HyperList
      keyId="id"
      data={navs}
      component={Item}
      container="h-full space-y-2"
    />
  );
};

export const NavItem = (item: NavItemProps) => {
  const { open } = use(SidebarCtx)!;
  const { href, label, icon, className, id } = item;
  const pathname = usePathname();
  const isActive = pathname.startsWith(href);

  const renderIcon = useCallback(() => {
    if (icon.type === "icon") {
      const IconComponent = icon.content;
      return (
        <div
          className={cn("p-1", className, { active: isActive })}
          data-testid={`sidebar-button-${id}`}
        >
          <IconComponent
            className={cn(
              "size-[1.5rem] shrink-0 stroke-1 text-primary-200 drop-shadow-md transition-all duration-300 ease-out transform-gpu hover:text-primary-200 group-hover:text-chalk group-hover:scale-105 dark:text-primary-700",
              {
                "active text-secondary dark:text-secondary-400": isActive,
              },
            )}
          />
        </div>
      );
    } else {
      return (
        <Image
          alt={label}
          src={icon.content as string}
          className={cn("size-7 flex-shrink-0 rounded-full", {})}
        />
      );
    }
  }, [className, icon, label, isActive, id]);

  const ItemLabel = useCallback(
    () => (
      <motion.div
        animate={{
          display: open ? "inline-block" : "none",
          opacity: open ? 1 : 0,
        }}
        className={`${isActive ? "active dark:via-white dark:to-amber-50" : ""} rounded-xl bg-gradient-to-r from-amber-50 via-secondary-100 to-secondary-800 bg-size-200 bg-clip-text bg-pos-100 px-3 py-1 font-inst font-medium text-transparent transition-all duration-300 ease-out group-hover/sidebar:bg-pos-0 dark:to-secondary-400`}
      >
        {item.label}
      </motion.div>
    ),
    [item.label, isActive, open],
  );

  return (
    <Link
      href={href}
      className={cn(
        "group/sidebar flex items-center justify-start gap-3 py-2",
        className,
      )}
    >
      {renderIcon()}

      <ItemLabel />
    </Link>
  );
};

const Item = memo(NavItem);
