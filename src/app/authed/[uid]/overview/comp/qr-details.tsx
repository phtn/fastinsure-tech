import {
  ArrowTopRightOnSquareIcon,
  CheckBadgeIcon,
  ChevronLeftIcon,
  ClockIcon,
  InformationCircleIcon,
} from "@heroicons/react/24/outline";
import { ChevronDoubleLeftIcon } from "@heroicons/react/24/solid";
import {
  Accordion,
  AccordionItem,
  type AccordionItemIndicatorProps,
} from "@nextui-org/react";

export const QrDetails = () => {
  const defaultContent =
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.";

  return (
    <Accordion
      className="group"
      itemClasses={{
        title: "text-sm font-medium font-inst",
        trigger:
          "border-b-[0.33px] border-foreground/10 hover:rounded-md group-hover:border-background px-3 transition-all duration-300 ease-out hover:bg-foreground/10",
        base: "h-fit",
      }}
      showDivider={false}
    >
      <AccordionItem
        key="instruct"
        aria-label="Instructions"
        // className="rounded-md px-3 text-sm transition-all duration-300 ease-out hover:bg-foreground/10"
        startContent={
          <InformationCircleIcon className="size-5 text-foreground/40" />
        }
        indicator={indicator(true)}
        title="Instructions"
      >
        {defaultContent}
      </AccordionItem>
      <AccordionItem
        key="url"
        aria-label="Url"
        startContent={
          <ArrowTopRightOnSquareIcon className="size-5 text-foreground/40" />
        }
        indicator={indicator(true)}
        title="Url"
      >
        {defaultContent}
      </AccordionItem>
      <AccordionItem
        key="expiry"
        aria-label="Expiration"
        startContent={<ClockIcon className="size-5 text-foreground/40" />}
        subtitle={
          <p className="text-xs text-foreground/50">Valid until 2023-01-01</p>
        }
        indicator={indicator(false, "48 hours")}
        title="Expiration"
      >
        {defaultContent}
      </AccordionItem>
      <AccordionItem
        key="code_list"
        aria-label="Code List"
        startContent={<CheckBadgeIcon className="size-5 text-foreground/40" />}
        indicator={indicator(true)}
        title="Code List"
      >
        {defaultContent}
      </AccordionItem>
    </Accordion>
  );
};

const indicator = (icons: boolean, value?: string | number) => {
  const DoubleLeft = () => (
    <ChevronDoubleLeftIcon className="size-4 text-foreground/50" />
  );

  return icons
    ? ({ isOpen }: AccordionItemIndicatorProps) =>
        isOpen ? (
          <DoubleLeft />
        ) : (
          <ChevronLeftIcon className="size-4 text-foreground/50" />
        )
    : ({ isOpen }: AccordionItemIndicatorProps) =>
        isOpen ? (
          <DoubleLeft />
        ) : (
          <p className="text-sm font-semibold">{value}</p>
        );
};
