import Link from "next/link";
import type { PropsWithChildren, ReactNode, RefObject } from "react";
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
        <Drawer.Content className="fixed bottom-24 left-0 right-0 z-[100] mt-28 flex h-fit flex-col rounded-t-xl bg-transparent px-[5.5rem] outline-none">
          <Drawer.Title className="hidden">QR Viewer</Drawer.Title>
          <Drawer.Description className="hidden">
            Shows a dialog box with QR code
          </Drawer.Description>
          {children}
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
};

const Handle = ({ close }: { close: VoidFunction }) => (
  <div className="relative group mt-1 pt-2 size-6">
   <div
    onClick={close}
    aria-hidden
    className="h-1 w-5 absolute -rotate-45 flex-shrink-0 cursor-pointer rounded-full bg-amber-600"
    />
  <div
    onClick={close}
    aria-hidden
    className="h-1 w-5 absolute rotate-45 flex-shrink-0 cursor-pointer rounded-full bg-amber-500 drop-shadow-sm transition-colors duration-300 ease-in group-hover:bg-warning"
  />
  </div>
);

interface ContentProps {
  children: ReactNode;
  title: string;
  close: VoidFunction;
}

const Content = ({ children, title, close }: ContentProps) => (
  <div className="w-fit rounded-t-xl border-[0.33px] border-b-0 border-double border-foreground/80 bg-background">
    <div className="">
      <div className="mx-[0.66px] mt-[0.33px] flex h-12 items-start justify-between rounded-t-[11.33px] border-b-[0.33px] border-foreground/10 bg-foreground/80 p-2">
        <p className="px-2 py-1.5 font-semibold tracking-tight text-background">
          {title}
        </p>
        <Handle close={close} />
      </div>
      <div className="px-4">{children}</div>
    </div>
  </div>
);

const Body = ({ children }: PropsWithChildren) => (
  <div className="flex h-[20rem] w-fit items-start justify-between text-foreground">
    {children}
  </div>
);

interface CodeProps {
  children: ReactNode;
  ref?: RefObject<HTMLDivElement | null>;
}

const Code = ({ children, ref}: CodeProps) => (
  <div ref={ref} className="relative mx-1 my-6 flex h-64 w-72 items-center justify-center border-y-[0.33px] border-foreground/20">
    {children}
  </div>
);

const Detail = ({ children }: PropsWithChildren) => (
  <div className="h-full w-[30rem] space-y-2 overflow-auto py-4">
    {children}
  </div>
);

const Footer = ({ children }: PropsWithChildren) => (
  <div className="w-[50.55rem] rounded-b-lg border-[0.33px] border-double border-primary-700 bg-chalk ps-4 backdrop-blur-3xl dark:border-t-[0.33px] dark:border-t-foreground/30 dark:bg-background">
    <div className="mx-auto flex items-center justify-between">{children}</div>
  </div>
);

interface UrlProps {
  url: string | undefined;
  children: ReactNode;
}
const Url = ({ url, children }: UrlProps) => (
  <div className="mx-auto flex w-full items-center justify-between">
    <div className="flex w-fit items-center overflow-auto whitespace-nowrap">
      <Link
        href={url ?? ""}
        target="_blank"
        className="font-mono text-xs font-light text-primary decoration-macd-blue hover:underline hover:underline-offset-2"
      >
        {url}
      </Link>
    </div>
    <div className="flex items-center justify-end">{children}</div>
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
