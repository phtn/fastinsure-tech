"use client";
import { type ReactNode, useState } from "react";
import { type Links, Sidebar, SidebarBody, SidebarLink } from "@/ui/sidebar";
import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";
import { cn } from "@/lib/utils";
import {
  BanknotesIcon,
  CreditCardIcon,
  ReceiptRefundIcon,
  UsersIcon,
  RectangleGroupIcon,
  BuildingStorefrontIcon,
  ClipboardDocumentCheckIcon,
} from "@heroicons/react/24/solid";
import {
  PackageIcon,
  PencilLineIcon,
  ReceiptTextIcon,
  TruckIcon,
} from "lucide-react";
import { StatPanel, StatPanelContent } from "@/ui/stats";
import { BeakerIcon } from "@heroicons/react/24/solid";
import { useAuthCtx } from "@/app/ctx/auth";

interface DashboardProps {
  children?: ReactNode;
}
export const Dashboard = ({ children }: DashboardProps) => {
  const { user, signOut } = useAuthCtx();
  const links: Links[] = [
    {
      label: "Dashboard",
      href: "/admin",
      icon: { type: "icon", content: RectangleGroupIcon },
    },
    {
      label: "Customers",
      href: "#",
      icon: { type: "icon", content: UsersIcon },
    },
    {
      label: "Sales",
      href: "#",
      icon: { type: "icon", content: BanknotesIcon },
    },
    {
      label: "Orders",
      href: "#",
      icon: { type: "icon", content: ReceiptTextIcon },
    },
    {
      label: "Fulfillment",
      href: "#",
      icon: { type: "icon", content: ClipboardDocumentCheckIcon },
    },
    {
      label: "Deliveries",
      href: "#",
      icon: { type: "icon", content: TruckIcon },
    },
    {
      label: "Inventory",
      href: "/admin/inventory",
      icon: { type: "icon", content: PackageIcon },
    },
    {
      label: "Payments",
      href: "/admin/payments",
      icon: { type: "icon", content: CreditCardIcon },
    },
    {
      label: "Refunds",
      href: "#",
      icon: { type: "icon", content: ReceiptRefundIcon },
    },
    {
      label: "Storefront",
      href: "/",
      icon: { type: "icon", content: BuildingStorefrontIcon },
    },
    {
      label: "Blog Post",
      href: "#",
      icon: { type: "icon", content: PencilLineIcon },
    },
    {
      label: "Test Lab",
      href: "/admin/testlab/user",
      icon: { type: "icon", content: BeakerIcon },
    },
  ];
  const [open, setOpen] = useState(false);
  return (
    <div
      className={cn(
        "flex w-full flex-1 flex-col overflow-hidden bg-[url('/svg/mesh.svg')] bg-cover md:flex-row",
        "h-screen", // for your use case, use `h-screen` instead of `h-[60vh]`
        { "bg-right": open },
        //  bg-pink-100
      )}
    >
      <Sidebar open={open} setOpen={setOpen} animate={true}>
        <SidebarBody className="justify-between gap-10 bg-foreground/5 backdrop-blur-3xl">
          <div className="flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
            <>
              <Logo />
            </>
            <div className="mt-6 flex flex-col gap-2">
              {links.map((link, idx) => (
                <SidebarLink key={idx} link={link} />
              ))}
            </div>
          </div>
          <div className="" onClick={signOut}>
            <SidebarLink
              link={{
                label: user?.displayName ?? user?.email ?? "user",
                href: "#",
                icon: {
                  type: "image",
                  content: user?.photoURL ?? "/svg/f.svg",
                },
              }}
            />
          </div>
        </SidebarBody>
      </Sidebar>
      <div
        className={cn("bg-foreground/2 flex flex-1", {
          "bg-foreground/5": open,
        })}
      >
        <div className="flex h-full w-full flex-1 flex-col gap-2 rounded-tl-3xl bg-background p-2 dark:bg-foreground md:p-4">
          {children}
        </div>
      </div>
    </div>
  );
};
export const Logo = () => {
  return (
    <Link href="#" className="relative z-20 flex items-center space-x-2 py-1">
      <Image
        alt="admin-logo"
        src={"/svg/f.svg"}
        className="h-5 w-auto flex-shrink-0"
        width={0}
        height={0}
        unoptimized
        priority
      />
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="whitespace-pre px-4 font-jet text-xs font-medium tracking-widest text-foreground dark:text-background"
      >
        FastInsure Tech
      </motion.span>
    </Link>
  );
};
export const LogoIcon = () => {
  return (
    <Link
      href="#"
      className="relative z-20 flex items-center space-x-2 py-1 text-sm font-normal text-foreground"
    >
      <div className="h-5 w-6 flex-shrink-0 rounded-bl-sm rounded-br-lg rounded-tl-lg rounded-tr-sm bg-background dark:bg-foreground" />
    </Link>
  );
};

export const Overview = () => {
  const arrtwo = [6, 9];
  const arrfour = [1, 2, 3, 4];
  return (
    <>
      <div className="mb-4 flex w-full gap-4">
        {arrfour.map((i) => (
          <StatPanel key={i} title="Users" tag="users" icon={UsersIcon}>
            <StatPanelContent statValue={10} statKey="" />
          </StatPanel>
        ))}
      </div>

      <div className="flex flex-1 gap-2">
        {arrtwo.map((i) => (
          <div
            key={"second" + i}
            className="h-full w-full animate-pulse rounded-lg bg-gray-100 dark:bg-neutral-800"
          ></div>
        ))}
      </div>
    </>
  );
};
