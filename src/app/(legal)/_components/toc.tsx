import { cn } from "@/lib/utils";
import { HyperList } from "@/ui/list";
import Link from "next/link";
import type { TocProps, Section, FooterProps } from "./types";
import { ButtSqx } from "@/ui/button/button";
import { Icon } from "@/lib/icon";
import type { ClassName } from "@/app/types";
import { Image } from "@nextui-org/react";

export const Toc = ({ sections, isOpen, toggleFn, footer }: TocProps) => {
  return (
    <div
      className={cn(
        "fixed z-50 h-fit min-w-[340px] -translate-x-96 overflow-hidden rounded-e-md bg-primary",
        "transition-all duration-300",
        {
          "translate-x-0": isOpen,
        },
      )}
    >
      <div
        className={"flex w-full justify-between py-0.5 border-b-[0.33px] border-gray-600 bg-coal pe-3"}
      >
        <div className="flex items-center h-20 text-white gap-3 ps-5">
          <Image alt="FastInsure Logomark" src="/svg/f_v2.svg" className="size-8" radius="none" />
          <div className="font-inst font-medium drop-shadow-lg dark:text-foreground/60 xl:text-lg">
            <Brand name={"FastInsure Technologies"} className="flex-col items-start text-sm -space-y-0.5 text-chalk" />
          </div>
        </div>
        <div className="size-20 flex items-center justify-end">
        <ButtSqx
          icon="arrow-left-01"
          onClick={toggleFn}
          iconStyle="text-sky-400 group-hover/btn:text-sky-300"
          shadow="text-army/10"
        />
        </div>
      </div>
      <Contents sections={sections} />
      <TocFooter {...footer} />
    </div>
  );
};

const Contents = (props: { sections: Section[] }) => (
  <div className="space-y-4 overflow-y-auto bg-coal px-2 py-6">
    <h2 className="mb-4 ps-3 font-inter font-semibold tracking-tighter text-chalk">
      Table of Contents
    </h2>
    <nav className="space-y-1">
      <HyperList data={props.sections} component={SectionItem} keyId="keyId" />
    </nav>
  </div>
);

const SectionItem = (section: Section) => (
  <a
    key={section.id}
    href={`#${section.id}`}
    className="flex space-x-2 group/toc rounded-xl p-2 text-xs text-primary-300 transition-colors duration-300 hover:bg-indigo-100/5"
  >
    <div className="relative flex size-8 items-center justify-center">
      <Icon name="squircle" className="absolute size-7 transition-all duration-300 ease-in-out group-hover/toc:opacity-0 group-hover/toc:scale-50  text-army/60 opacity-15" />
      <p className="absolute text-xs font-medium text-chalk/60 group-hover/toc:text-sky-300 transition-colors duration-300">
        {section.keyId + 1}
      </p>
    </div>
    <div className="flex items-center font-inter font-medium tracking-tight text-indigo-50">
      {section.title}
    </div>
  </a>
);

const TocFooter = ({ label, href, company }: FooterProps) => (
  <div className="flex h-12 w-full items-center justify-between gap-2 border-t-[0.33px] border-gray-600 px-4 text-xs capitalize tracking-tight text-primary-400">
    <div className="flex text-chalk/80">
      <Link href={"/"}>
        <Brand name={company} gap={1} />
      </Link>
    </div>
    <Link
      href={href}
      className="flex items-center gap-2 text-sky-300 underline-offset-4 hover:underline"
    >
      {label}
      <Icon name="square-arrow-up-right" className="size-4" />
    </Link>
  </div>
);

interface BrandProps {
  name?: string
  gap?: number
  className?: ClassName
}
export const Brand = ({ name="", gap=0, className }: BrandProps ) => (
  <div className={cn("flex items-center tracking-tighter", `gap-${gap}`, className)}>
    <span className="text-normal font-bold ">
      {name.split(" ").shift()}
    </span>
    <span className="text-normal tracking-tighter font-light">
      {name.split(" ").pop()}
    </span>
  </div>
);
