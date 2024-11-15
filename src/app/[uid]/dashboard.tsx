"use client";
import { type ReactNode, useState } from "react";
import { type Links, Sidebar, SidebarBody, SidebarLink } from "@/ui/sidebar";
import Link from "next/link";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import {
  BanknotesIcon,
  CreditCardIcon,
  ReceiptRefundIcon,
  UsersIcon,
  BuildingStorefrontIcon,
  ClipboardDocumentCheckIcon,
  Squares2X2Icon,
  UserIcon,
} from "@heroicons/react/24/solid";
import {
  PackageIcon,
  PencilLineIcon,
  ReceiptTextIcon,
  TruckIcon,
} from "lucide-react";
import { BeakerIcon } from "@heroicons/react/24/solid";
import { useAuthCtx } from "@/app/ctx/auth";
import { Button, Image } from "@nextui-org/react";

interface DashboardProps {
  children?: ReactNode;
}
export const Dashboard = ({ children }: DashboardProps) => {
  const { user, signOut } = useAuthCtx();
  const links: Links[] = [
    {
      label: "Overview",
      href: "/dashboard",
      icon: { type: "icon", content: Squares2X2Icon },
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
        "flex w-full flex-1 flex-col overflow-hidden bg-background bg-[url('/svg/mesh.svg')] bg-cover md:flex-row",
        "h-screen", // for your use case, use `h-screen` instead of `h-[60vh]`
        { "bg-right": open },
        //  bg-pink-100
      )}
    >
      <Sidebar open={open} setOpen={setOpen}>
        <SidebarBody className="justify-between gap-10 bg-foreground backdrop-blur-3xl dark:bg-background">
          <div className="flex w-fit flex-1 flex-col overflow-y-auto overflow-x-scroll">
            <div className="flex w-fit space-x-4 whitespace-nowrap">
              <Logo open={open} />
            </div>
            <div className="mt-6 flex flex-col gap-2">
              {links.map((link, idx) => (
                <SidebarLink key={idx} link={link} />
              ))}
            </div>
          </div>
          <section className="flex items-center space-x-4 whitespace-nowrap">
            <SidebarLink
              link={{
                label: user?.email ?? "user",
                href: "#",
                icon: {
                  type: user?.photoURL ? "image" : "icon",
                  content: user?.photoURL ?? UserIcon,
                },
              }}
            />
            <Button
              onPress={signOut}
              size="sm"
              variant="ghost"
              color="secondary"
              className={cn("hidden w-16 border-[0.33px]", { flex: open })}
            >
              Sign out
            </Button>
          </section>
        </SidebarBody>
      </Sidebar>
      <div className={cn("flex flex-1 bg-foreground dark:bg-background", {})}>
        <div className="_dark:bg-background relative flex h-full w-full flex-1 flex-col gap-2 rounded-tl-3xl border-l-[0.33px] border-foreground/15 bg-background p-2 md:p-4">
          {children}
        </div>
      </div>
    </div>
  );
};
export const Logo = (props: { open: boolean }) => {
  return (
    <Link
      href="/"
      className="relative z-20 flex h-fit flex-shrink-0 items-center space-x-2 py-1"
    >
      <Image
        alt="admin-logo"
        src={"/svg/f.svg"}
        className="aspect-square flex-shrink-0 bg-foreground/20 px-0.5"
        width={28}
        height={28}
      />
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className={cn(
          "whitespace-nowrap px-4 font-jet text-xs tracking-widest text-primary-600",
          { hidden: !props.open },
        )}
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
