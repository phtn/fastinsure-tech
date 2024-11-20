import { VisuallyHidden } from "@nextui-org/react";
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
        <Drawer.Content className="fixed bottom-14 left-0 right-0 z-[70] mt-28 flex h-fit flex-col rounded-t-xl bg-transparent px-[5.5rem] outline-none">
          <VisuallyHidden>
            <Drawer.Title>QR Viewer</Drawer.Title>
            <Drawer.Description>
              Shows a dialog box with QR code
            </Drawer.Description>
          </VisuallyHidden>
          {children}
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
};

const Handle = ({ close }: { close: VoidFunction }) => (
  <div
    onClick={close}
    aria-hidden
    className="my-1 h-1.5 w-8 flex-shrink-0 cursor-pointer rounded-full bg-amber-600 transition-colors duration-300 ease-in hover:bg-warning"
  />
);

interface ContentProps {
  children: ReactNode;
  title: string;
  close: VoidFunction;
}

const Content = ({ children, title, close }: ContentProps) => (
  <div className="w-fit rounded-t-xl border-[0.33px] border-b-0 border-double border-foreground/80 bg-background">
    <div className="">
      <div className="mx-[0.66px] mt-[0.33px] flex h-16 items-start justify-between rounded-t-[11.33px] border-b-[0.33px] border-foreground/10 bg-foreground/80 p-3">
        <p className="px-2 py-1.5 font-semibold tracking-tight text-background/80">
          {title}
        </p>
        <Handle close={close} />
      </div>
      <div className="px-4">{children}</div>
    </div>
  </div>
);

const Body = ({ children }: PropsWithChildren) => (
  <div className="flex w-fit items-start justify-between text-foreground">
    {children}
  </div>
);

const Code = ({ children }: PropsWithChildren) => (
  <div className="relative mx-1 my-6 flex h-64 w-72 items-center justify-center border-y-[0.33px] border-foreground/20">
    {children}
  </div>
);

const Detail = ({ children }: PropsWithChildren) => (
  <div className="h-[19rem] w-[30rem] space-y-2 overflow-auto py-4">
    {children}
  </div>
);

const Footer = ({ children }: PropsWithChildren) => (
  <div className="w-[50.55rem] rounded-b-lg border-[0.33px] border-double border-foreground/80 bg-background/80 p-4 backdrop-blur-3xl dark:border-t-[0.33px] dark:border-t-foreground/30 dark:bg-background/50">
    <div className="mx-auto flex items-center justify-between">{children}</div>
  </div>
);

interface UrlProps {
  url: string | undefined;
  children: ReactNode;
}
const Url = ({ url, children }: UrlProps) => (
  <div className="mx-auto flex w-full items-center justify-between gap-2">
    <div className="flex w-fit items-center gap-1 overflow-auto whitespace-nowrap">
      <Link
        href={url ?? ""}
        className="font-mono text-xs font-light text-foreground/80 decoration-foreground hover:underline hover:underline-offset-4"
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
