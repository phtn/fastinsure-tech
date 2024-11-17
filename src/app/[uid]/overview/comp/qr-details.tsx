import { type DualIcon } from "@/app/types";
import {
  BookOpenIcon,
  ChevronLeftIcon,
  ClockIcon,
  InformationCircleIcon,
  QrCodeIcon,
} from "@heroicons/react/24/outline";
import { ChevronDoubleLeftIcon } from "@heroicons/react/24/solid";
import {
  Accordion,
  AccordionItem,
  type AccordionItemIndicatorProps,
} from "@nextui-org/react";
import type { PropsWithChildren, ReactElement, ReactNode } from "react";
import moment from "moment";

interface QrDetailsProps {
  key_code: string | undefined;
  expiry: number | undefined;
}
export const QrDetails = (props: QrDetailsProps) => {
  const date = Date.now() - (props?.expiry ?? 0);
  const expiry = `expires ${moment().from(date)}`;

  const validity = moment().calendar(date, {
    sameDay: function () {
      return moment().diff(date, "hours") > 12
        ? "[Today] h:mm a"
        : "[In about] h [hours]";
    },
    nextDay: "[Tomorrow] h:mm a", // if the date is tomorrow
    nextWeek: "LLLL", // within the next week
    sameElse: "MM/DD/YYYY h:mm a",
  });

  return (
    <Accordion
      className="group"
      itemClasses={{
        title: "text-sm font-semibold font-inst",
        trigger:
          "border-b-[0.33px] data-[open]:rounded-md data-[open]:bg-zinc-100/40 border-foreground/20 hover:rounded-md group-hover:border-background px-3 transition-all duration-300 ease-out hover:bg-foreground/10",
        base: "h-fit",
      }}
      showDivider={false}
    >
      {detail_data.map((item) => (
        <AccordionItem
          key={item.id}
          aria-label={item.title}
          startContent={
            <item.startContent className="size-5 text-foreground/60" />
          }
          indicator={
            item.id === "code"
              ? indicator(false, props.key_code)
              : item.id === "expiry"
                ? indicator(false, expiry)
                : item.indicator
          }
          title={item.title}
          subtitle={item.id === "expiry" ? validity : null}
        >
          {item.content}
        </AccordionItem>
      ))}
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
          <ChevronLeftIcon className="size-4 text-foreground/80" />
        )
    : ({ isOpen }: AccordionItemIndicatorProps) =>
        isOpen ? (
          <DoubleLeft />
        ) : (
          <p className="rounded-lg bg-foreground/70 px-2 py-1 text-sm font-medium text-background drop-shadow-sm">
            {value}
          </p>
        );
};

const ItemContent = ({ children }: PropsWithChildren) => (
  <div className="w-fit px-3 text-sm leading-5 text-foreground/80">
    {children}
  </div>
);

const Strong = (props: { text: string }) => (
  <span className="font-semibold text-foreground">{props.text}</span>
);

interface TQrDetail {
  id: string;
  title: string;
  subtitle?: string;
  indicator: ({ isOpen }: AccordionItemIndicatorProps) => ReactElement;
  content: ReactNode;
  startContent: DualIcon;
}
const detail_data: TQrDetail[] = [
  {
    id: "instructions",
    title: "Instructions",
    startContent: InformationCircleIcon,
    indicator: indicator(true),
    content: (
      <ItemContent>
        <div className="my-2 font-inter font-light tracking-tight text-primary-400">
          You have successfully created an agent code!
        </div>
        <ol className="list-inside list-decimal space-y-3">
          <li className="pb-2">
            <span className="whitespace-nowrap font-medium text-foreground">
              Retrieve Generated Code Details:
            </span>
            <ul className="mt-2 list-outside list-disc space-y-1 rounded-lg bg-primary-100/50 py-4 pl-6">
              <li>
                The <Strong text="Agent Code" /> (a unique identifier for
                activation).
              </li>
              <li>
                An <Strong text="Activation URL Link" /> that the agent will use
                to start the activation process.
              </li>
              <li>
                A <Strong text="QR Code" /> visually representing the activation
                URL link. This can be downloaded and shared with the agent.
              </li>
            </ul>
          </li>
          <li className="pb-2">
            <span className="font-inst font-semibold text-slate-300">
              Agent Activation:
            </span>
            <ul className="mt-2 list-outside list-disc space-y-1 rounded-lg bg-foreground/10 py-4 pl-6">
              <li>
                Remind the agent to visit the activation page using the provided
                <Strong text=" URL Link." />
              </li>
              <li>
                The agent will be prompted to enter the{" "}
                <Strong text="Agent Code." /> They must complete activation
                within 48 hours of code generation.
              </li>
            </ul>
          </li>
          <li className="pb-2">
            <span className="font-inst font-semibold text-slate-300">
              Monitor Activation Status:
            </span>
            <ul className="mt-2 list-outside list-disc space-y-1 rounded-lg bg-foreground/10 py-4 pl-6">
              <li>
                <span>
                  You can track the status of agent activations within your
                  dashboard. Click the QR icon from the sidebar to open the{" "}
                  <Strong text="Agent Code Table." />
                </span>
              </li>
            </ul>
          </li>
        </ol>
      </ItemContent>
    ),
  },
  {
    id: "code",
    title: "Agent Code",
    subtitle: "Valid until 2023-01-01",
    startContent: QrCodeIcon,
    indicator: indicator(false),
    content: (
      <ItemContent>
        This is the generated code: <strong>1234567890</strong>
      </ItemContent>
    ),
  },
  {
    id: "expiry",
    title: "Valid Until",
    subtitle: "Valid until 2023-01-01",
    startContent: ClockIcon,
    indicator: indicator(false, "1234567890"),
    content: (
      <ItemContent>
        This is the generated code: <strong>1234567890</strong>
      </ItemContent>
    ),
  },
  {
    id: "reference",
    title: "References",
    subtitle: "View previous codes",
    startContent: BookOpenIcon,
    indicator: indicator(true),
    content: (
      <ItemContent>
        This is the generated code: <strong>1234567890</strong>
      </ItemContent>
    ),
  },
];
