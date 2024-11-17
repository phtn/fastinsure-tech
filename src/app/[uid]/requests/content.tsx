"use client";

import { Button, Link, Tab, Tabs } from "@nextui-org/react";
import { PlusIcon } from "@heroicons/react/24/outline";
import { CircleHelpIcon } from "lucide-react";
import { guid } from "@/utils/helpers";

export const RequestsDefaultContent = () => {
  return (
    <main className="relative px-4 py-1">
      <div className="h-96">
        <Content />
      </div>
      <div className="absolute -top-10 right-4 z-50 flex items-center space-x-4">
        <Button
          variant="solid"
          color="primary"
          size="md"
          radius="sm"
          className="w-fit"
          as={Link}
          href={`/dashboard/requests/create/${guid()}`}
        >
          <PlusIcon className="size-4" />
          <p className="font-inter text-xs font-medium tracking-tight">
            Create New Request
          </p>
        </Button>
        <Button
          size="md"
          radius="sm"
          variant="flat"
          color="default"
          className="group w-fit"
        >
          <p className="font-inter text-xs font-medium tracking-tighter">
            Support
          </p>
          <CircleHelpIcon className="size-4 stroke-[1.5px]" />
        </Button>
      </div>
    </main>
  );
};

const Content = () => (
  <Tabs size="md" color="primary" variant="underlined">
    <Tab key={"all"} title="All">
      <div className="size-56 bg-primary" />
    </Tab>
    <Tab key={"submitted"} title="Submitted">
      <div className="size-10 bg-primary" />
    </Tab>
    <Tab key={"completed"} title="Completed">
      <div className="size-10 bg-primary" />
    </Tab>
  </Tabs>
);
