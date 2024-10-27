"use client";

import { CursorArrowRaysIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import type { PropsWithChildren, ReactNode } from "react";
import { Drawer } from "vaul";

interface ComponentProps {
  open: boolean;
  onOpenChange: VoidFunction;
  children: ReactNode;
}
const Component = ({ children, open, onOpenChange }: ComponentProps) => {
  return (
    <Drawer.Root open={open} onOpenChange={onOpenChange}>
      <Drawer.Portal>
        <Drawer.Overlay className="fixed inset-0 bg-foreground/10" />
        <Drawer.Content className="fixed bottom-14 left-0 right-0 mt-28 flex h-fit flex-col rounded-t-xl bg-transparent px-[5.5rem] outline-none">
          {children}
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
};

const Handle = () => (
  <div
    aria-hidden
    className="my-1 h-1.5 w-8 flex-shrink-0 cursor-pointer rounded-full bg-amber-600"
  />
);

interface ContentProps {
  children: ReactNode;
  title: string;
}

const Content = ({ children, title }: ContentProps) => (
  <div className="w-fit rounded-t-xl border-[0.33px] border-b-0 border-double border-foreground/80 bg-background">
    <div className="">
      <div className="mx-[0.66px] mb-4 mt-[0.33px] flex h-16 items-start justify-between rounded-t-[11.33px] border-b-[0.33px] border-foreground/10 bg-foreground/80 p-3">
        <p className="px-2 py-1.5 font-semibold tracking-tight text-background/80">
          {title}
        </p>
        <Handle />
      </div>
      <div className="p-4">{children}</div>
    </div>
  </div>
);

const Body = ({ children }: PropsWithChildren) => (
  <div className="flex w-fit items-center justify-between text-foreground">
    {children}
  </div>
);

const Code = ({ children }: PropsWithChildren) => (
  <div className="relative flex h-64 w-72 items-center justify-center rounded-md border-[0px] border-foreground/20">
    {children}
  </div>
);

const Detail = ({ children }: PropsWithChildren) => (
  <div className="flex h-64 w-[30rem] flex-col overflow-auto p-3">
    {children}
  </div>
);

const Footer = ({ children }: PropsWithChildren) => (
  <div className="w-[50.05rem] rounded-b-lg border-[0.33px] border-t-0 border-double border-foreground/80 bg-background/50 p-4 backdrop-blur-3xl">
    <div className="mx-auto flex items-center justify-between">{children}</div>
  </div>
);

interface UrlProps {
  url: string | undefined;
  children: ReactNode;
}
const Url = ({ url, children }: UrlProps) => (
  <div className="mx-auto flex w-full items-center justify-between">
    <div className="flex items-center gap-2 whitespace-nowrap border">
      <CursorArrowRaysIcon className="size-5 text-foreground" />
      <Link
        href={url ?? ""}
        className="font-mono text-xs decoration-foreground/40 hover:underline hover:underline-offset-4"
      >
        {url}
      </Link>
    </div>
    <div className="flex items-center justify-end gap-2">{children}</div>
  </div>
);

type TQr = typeof Component & {
  Handle: typeof Handle;
  Content: typeof Content;
  Body: typeof Body;
  Code: typeof Code;
  Detail: typeof Detail;
  Footer: typeof Footer;
  Url: typeof Url;
};

const Qr: TQr = Object.assign(Component, {
  Handle,
  Content,
  Body,
  Code,
  Detail,
  Footer,
  Url,
});

export { Qr };
