import type { PropsWithChildren, ReactNode } from "react";
import { Drawer } from "vaul";

interface ComponentProps {
  open: boolean;
  onOpenChange: VoidFunction;
  children: ReactNode;
  direction?: "bottom" | "top" | "left" | "right";
}
const Component = ({
  direction,
  children,
  open,
  onOpenChange,
}: ComponentProps) => {
  return (
    <Drawer.Root
      open={open}
      onOpenChange={onOpenChange}
      direction={direction}
      dismissible={false}
    >
      <Drawer.Portal>
        <Drawer.Overlay className="fixed inset-0" />
        <Drawer.Content className="fixed bottom-24 right-3 top-6 z-[100] flex h-fit w-fit flex-col rounded-3xl bg-transparent px-3 outline-none">
          <Drawer.Title className="hidden">title</Drawer.Title>
          <Drawer.Description className="hidden">
            Description
          </Drawer.Description>
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
    className="my-1 h-1.5 w-4 flex-shrink-0 cursor-pointer rounded-full bg-amber-600 transition-colors duration-300 ease-in hover:bg-warning"
  />
);

const Body = ({ children }: PropsWithChildren) => (
  <div className="flex w-full items-start justify-between overflow-hidden border-[0.33px] border-b-0 border-steel/80 bg-chalk text-foreground dark:bg-steel">
    {children}
  </div>
);

const Footer = ({ children }: PropsWithChildren) => (
  <div className="w-[28rem] rounded-b-lg border-[0.33px] bg-god px-4 py-2 backdrop-blur-3xl dark:border-t-[0.33px] dark:border-t-foreground/30 dark:bg-background">
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
