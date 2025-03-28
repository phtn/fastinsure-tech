import { cn } from "@/lib/utils";
import { type PropsWithChildren } from "react";
import { type DialogProps, Drawer } from "vaul";

const Component = (props: DialogProps) => {
  return (
    <Drawer.Root
      {...props}
    >
      <Drawer.Portal>
        <Drawer.Overlay className="fixed inset-0" />
        <Drawer.Content className="fixed bottom-24 right-3 top-6 z-[100] flex h-fit w-fit flex-col rounded-3xl bg-transparent px-3 outline-none">
          <Drawer.Title className="hidden">title</Drawer.Title>
          <Drawer.Description className="hidden">
            Description
          </Drawer.Description>
          {props.children}
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
};

const Handle = ({ close }: { close: VoidFunction }) => (
  <div
    onClick={close}
    aria-hidden
    className="my-1 h-1.5 w-4 flex-shrink-0 cursor-pointer rounded-full bg-amber-600 transition-colors duration-300 ease-in hover:bg-warning"
  />
);

const Body = ({ children }: PropsWithChildren) => (
  <div className="flex w-full items-start justify-between overflow-hidden border-0 border-steel border-b-[0.1] bg-chalk text-foreground dark:border-god dark:bg-steel">
    {children}
  </div>
);

interface FooterProps {
  variant?: 'goddess' | 'god' ;
}

const Footer = ({ children, variant }: PropsWithChildren<FooterProps>) => (
  <div className={cn("w-full rounded-b-lg border-t-[0.33px] border-macd-gray/80 bg-god px-2 py-1 backdrop-blur-2xl dark:border-t-[0.33px] dark:border-steel dark:bg-background", {"bg-goddess": variant === 'goddess', "bg-god": variant === 'god'})}>
    <div className="mx-auto flex items-center justify-between">{children}</div>
  </div>
);

type TSideVaul = typeof Component & {
  Handle: typeof Handle;
  Body: typeof Body;
  Footer: typeof Footer;
};

const SideVaul: TSideVaul = Object.assign(Component, {
  Handle,
  Body,
  Footer,
});

export { SideVaul };
