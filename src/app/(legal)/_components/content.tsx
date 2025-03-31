"use client";

import { Icon } from "@/lib/icon";
import { cn } from "@/lib/utils";
import { ButtSqx } from "@/ui/button/button";
import { HyperList } from "@/ui/list";
import { copyFn } from "@/utils/helpers";
import { useToggle } from "@/utils/hooks/useToggle";
import Link from "next/link";
import { useCallback} from "react";
import { Brand, Toc } from "./toc";
import type {
  BodyProps,
  ContentProps,
  FooterProps,
  HeaderProps,
  ImportantMessageProps,
  Section,
} from "./types";
import { Image } from "@nextui-org/react";

export const Content = ({
  company,
  footer,
  important_message,
  sections,
  title,
}: ContentProps) => {
  const { open, toggle } = useToggle();

  return (
    <div className="bg-white font-inter transition-colors duration-300 md:min-h-screen">
      <Toc
        sections={sections}
        footer={{ ...footer, company }}
        isOpen={open}
        toggleFn={toggle}
      />
      <Header company={company} title={title} toggle={toggle} />
      <main className="md:container md:mx-auto h-[90vh] md:max-w-4xl w-screen overflow-y-scroll md:p-2 lg:px-8">
        <Body sections={sections} message={important_message} />
        <Footer company={company} {...footer} />
      </main>
    </div>
  );
};

const Header = ({ company, title, toggle }: HeaderProps) => {
  const handlePrint = useCallback(() => window.print(), [])
  return (
    <div className="mx-auto w-full flex md:max-w-4xl items-center justify-between border-b-[0.33px] border-primary-200 p-1.5 sm:px-4 md:p-2 lg:px-8">
      <h1 className="w-full items-end p-4 md:flex text-primary leading-none md:space-x-3 whitespace-nowrap text-lg font-medium capitalize tracking-tight md:text-2xl">
        <Brand name={company} gap={1} className="pb-05 md:pb-0" />
        <span className=" text-xs uppercase font-extrabold md:text-lg text-chalk border bg-primary px-1.5 py-0.5 rounded-sm">{title}</span>
      </h1>
      <section className="flex w-fit items-center space-x-2 pe-2 sm:space-x-6 md:space-x-6 md:pe-2">
        <ButtSqx
          size="sm"
          id="content-list"
          className="mr-1 animate-enter group-hover/list:flex"
          onClick={toggle}
          iconStyle="text-primary group-hover/btn:text-primary"
          shadow="text-macd-gray/15"
          icon="left-to-right-list-number"
        />
        <ButtSqx
          className="mr-1 animate-enter group-hover/list:flex"
          onClick={handlePrint}
          iconStyle="text-primary group-hover/btn:text-primary"
          shadow="text-macd-gray/15"
          icon="printer"
        />

      </section>
    </div>
  )
};

const Body = (props: BodyProps) => (
  <div className="container mx-auto">
    <ImportantMessage message={props.message} />
    <HyperList
      data={props.sections}
      component={Article}
      keyId="keyId"
      container="pt-8 space-y-14 px-1 scroll-smooth"
    />
  </div>
);

const ImportantMessage = ({ message }: ImportantMessageProps) => (
  <div className="my-8 md:max-w-4xl">
    <div className="md:mx-2 h-6 w-fit md:rounded-t-[4px] bg-primary px-3 py-1 text-[11px] font-semibold uppercase text-blue-100">
      important to read
    </div>
    <section
      className={cn(
        "md:mx-2 flex space-x-2 md:rounded-lg md:rounded-tl-none border border-sky-400 bg-sky-50 md:p-6 px-2 py-8 text-justify font-inter shadow-sm",
      )}
    >
      <div className="md:flex hidden size-8 flex-shrink-0 items-start justify-center p-1">
        <Icon
          name="information-circle"
          className="size-5 stroke-0 text-macd-blue"
        />
      </div>
      <p className="md:text-sm text-xs font-light leading-loose md:leading-6 text-blue-950">{message}</p>
    </section>
  </div>
);

const Article = ({ id, title, content, keyId }: Section) => {
  const handleCopyContent = useCallback(async () => {
    await copyFn({ name: title, text: `${title} - ${content}` });
  }, [content, title]);
  return (
    <section
      id={id}
      className={cn(
        "space-y-2 rounded-lg border-[0.33px] border-white bg-white py-2 text-justify font-inter",
        "group-hover/list:border-primary-300/60 group-hover/list:shadow-md",
        "transition-all duration-300",
      )}
    >
      <div
        className={cn(
          "flex h-4 w-full items-center justify-between border-b-[0.33px] border-white px-2 py-5",
          "group-hover/list:border-primary-300/80",
        )}
      >
        <h2
          className={cn(
            "flex items-center space-x-2 text-xl font-semibold tracking-tighter text-primary-900",
            "transition-transform duration-400 ease-out group-hover/list:translate-x-1",
          )}
        >
          <span className="text-[16px] font-light opacity-80">
            {keyId + 1}.
          </span>
          <span>{title}</span>
        </h2>
        <ButtSqx
          className="mr-1 hidden animate-enter group-hover/list:flex"
          onClick={handleCopyContent}
          iconStyle="text-primary group-hover/btn:text-primary"
          shadow="text-macd-gray/15"
          icon="copy-01"
        />
      </div>
      <p className="p-4 leading-loose tracking-tight text-primary-700">
        {content}
      </p>
    </section>
  );
};

const Footer = ({ company, label, href }: FooterProps) => (
  <footer className="flex items-end justify-between px-2 py-6 h-64 text-center text-xs capitalize leading-none tracking-tighter text-primary">
    <div className="grid grid-cols-3 w-full py-8">

      <div className="h-10 items-center ps-3 capitalize border-r-[0.33px] gap-1.5 border-b-[0.33px] border-macd-gray/60 flex">
        <Image alt="FastInsure Logomark" src="/svg/logo_dark.svg" className="size-6" radius="none" />
        <Brand name={company} gap={0} className="flex-col items-start justify-center" />
      </div>

      <div className="h-10 items-center border-r-[0.33px] border-b-[0.33px] border-macd-gray/60 flex justify-center">
        <p className="font-">February 17, 2025</p>
      </div>

      <div className="h-10 items-center justify-end flex border-b-[0.33px] border-macd-gray/60">
        <p className="font- text-left md:w-20 w-24">Resources</p>
      </div>


      <div className="h-10 md:ps-3 items-center text-xs md:justify-start justify-center flex border-r-[0.33px] border-macd-gray/60">
        <span>&copy;{new Date().getFullYear() } - {new Date().getFullYear() + 1}</span>
      </div>

      <div className="h-10 border-r-[0.33px] border-macd-gray/60 items-center flex justify-center">
        <p className="text-xs tracking-tighter opacity-80">
          Last updated
        </p>
      </div>

      <Link
        href={href}
        className="flex items-center justify-end gap-1 text-macl-blue hover:underline"
      >
        <span className="md:w-20 w-full text-center md:text-left">{label}</span>
      </Link>
    </div>
  </footer>
);
