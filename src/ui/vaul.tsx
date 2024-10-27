"use client";

import { Drawer } from "vaul";

export const AgentQrViewer = () => {
  return (
    <Drawer.Root modal={false}>
      <Drawer.Trigger className="relative flex h-10 flex-shrink-0 items-center justify-center gap-2 overflow-hidden rounded-full bg-white px-4 text-sm font-medium shadow-sm transition-all hover:bg-[#FAFAFA] dark:bg-[#161615] dark:text-white dark:hover:bg-[#1A1A19]">
        Open Drawer
      </Drawer.Trigger>
      <Drawer.Portal>
        <Drawer.Overlay className="fixed inset-0 bg-black/40" />
        <Drawer.Content className="fixed bottom-0 left-0 right-0 mt-24 flex h-fit flex-col rounded-t-[10px] border-t border-gray-200 bg-gray-100 outline-none">
          <div className="flex-1 rounded-t-[10px] bg-white p-4">
            <div className="mx-auto mb-8 h-1.5 w-12 flex-shrink-0 rounded-full bg-gray-300" />
            <div className="mx-auto max-w-md">
              <Drawer.Title className="mb-4 font-medium text-gray-900">
                What does non-modal mean?
              </Drawer.Title>
              <p className="mb-2 text-gray-600">
                The default behavior for the drawer is to restrict interactions
                to the dialog itself. This means that you can&apos;t interact
                with other content on the page.
              </p>
              <p className="mb-2 text-gray-600">
                But sometimes you want to allow those interactions. Setting
                `modal` to `false` will let you scroll the page, click on other
                elements, etc.
              </p>
            </div>
          </div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
};
