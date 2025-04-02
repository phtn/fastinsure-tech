import { useNav } from "@/app/dashboard/hooks/useNav";
import { Icon } from "@/lib/icon";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { memo, use, useCallback } from "react";
import { HyperList } from "../list";
import { SidebarCtx } from "./ctx";
import { type NavItemProps } from "./types";

export const NavItems = () => {
  const { navs } = useNav();

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
  const currentSlug = pathname.split("/").pop()
  console.log(currentSlug, href)

  const isActive = currentSlug === href.split("/").pop();

  const renderIcon = useCallback(() => {
    if (icon.type === "icon") {
      return (
        <div
          className={cn("p-1", className, { active: isActive })}
          data-testid={`sidebar-button-${id}`}
        >
          <Icon
            name={icon.content}
            className={cn(
              "size-[1.5rem] shrink-0 drop-shadow-md text-chalk/80 transition-all duration-300 ease-out transform-gpu hover:text-warning group-hover:text-chalk group-hover:scale-105 dark:text-primary-700",
              {
                "active text-macd-blue": isActive,
              },
            )}
          />
        </div>
      );
    } else {
      return (
        <Image
          alt={label}
          src={icon.content}
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
        className={cn(
          "rounded-xl px-3 tracking-tight py-1 font-medium text-orange-50/80",
          "transition-all duration-300 ease-out",
          {"active text-macd-blue": isActive}
          )}
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
