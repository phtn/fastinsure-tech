import { type DualIcon } from "@/app/types";
import {
  BookOpenIcon,
  ChevronDoubleDownIcon,
  ChevronLeftIcon,
  ClockIcon,
  InformationCircleIcon,
  QrCodeIcon,
} from "@heroicons/react/24/outline";
import {
  ChevronDoubleLeftIcon,
  ExclamationTriangleIcon,
  Square2StackIcon,
} from "@heroicons/react/24/solid";
import {
  Accordion,
  AccordionItem,
  Button,
  type AccordionItemIndicatorProps,
} from "@nextui-org/react";
import {
  useCallback,
  useMemo,
  type PropsWithChildren,
  type ReactElement,
  type ReactNode,
} from "react";
import moment from "moment";
import { CircleCheckBigIcon } from "lucide-react";
import { copyFn } from "@/utils/helpers";

interface QrDetailsProps {
  key_code: string | undefined;
  expiry: number | undefined;
}
export const QrDetails = (props: QrDetailsProps) => {
  const { expiry, validity } = useMemo(
    () => calcExpiryAndValidity(props.expiry),
    [props.expiry],
  );

  const handleCopyCode = useCallback(
    (text: string) => () => copyFn({ name: text, text }),
    [],
  );

  return (
    <Accordion
      className="group mt-3"
      itemClasses={{
        title:
          "text-sm font-medium font-inter tracking-tight dark:data-[open]:text-primary-700",
        subtitle: "text-xs tracking-tighter font-light",
        trigger:
          "border-b-[0.33px] data-[open]:rounded-md data-[open]:bg-zinc-100/40 dark:data-[open]:text-primary-400 dark:data-[open]:bg-zinc-950 border-primary-300/50 hover:rounded-md group-hover:border-background px-3 transition-all duration-300 ease-out hover:bg-primary-100/40",

        base: "h-fit",
        content:
          "bg-gradient-to-r from-primary-100/5 via-primary-100/30 to-primar-100/5",
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
          disableIndicatorAnimation={item.animateIndicator}
          indicator={renderIndicator(
            item.id,
            props.key_code,
            expiry,
            item.indicator,
          )}
          title={item.title}
          subtitle={item.id === "expiry" ? validity : null}
        >
          {item.id === "code" ? (
            <CodeContent>
              <p>{props.key_code}</p>
              <div>
                <Button
                  size="sm"
                  radius="none"
                  className="h-9 rounded-e-md border-[0.33px] border-primary font-inter font-medium"
                  variant="solid"
                  color="primary"
                  onPress={handleCopyCode(props.key_code!)}
                >
                  <span>copy</span>
                  <Square2StackIcon className="size-5 text-primary-50" />
                </Button>
              </div>
            </CodeContent>
          ) : item.id === "expiry" ? (
            <ExpiryContent>This activation code {expiry}</ExpiryContent>
          ) : (
            item.content
          )}
        </AccordionItem>
      ))}
    </Accordion>
  );
};

const calcExpiryAndValidity = (millis: number | undefined) => {
  const date = Date.now() - (millis ?? 0);
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
  return { validity, expiry };
};

const renderIndicator = (
  id: string,
  key_code: string | undefined,
  expiry: string,
  indicate: ({ isOpen }: AccordionItemIndicatorProps) => ReactElement,
) =>
  id === "code"
    ? indicator(false, key_code)
    : id === "expiry"
      ? indicator(false, expiry)
      : indicate;

const CodeContent = ({ children }: PropsWithChildren) => (
  <div className="font-arc mx-10 my-1 flex h-10 w-fit items-center">
    <div className="flex h-9 items-center space-x-6 rounded-md border border-primary-500 bg-primary-50 py-2 pl-4 font-semibold tracking-widest drop-shadow-lg">
      {children}
    </div>
  </div>
);
const ExpiryContent = ({ children }: PropsWithChildren) => (
  <div className="font-arc mx-10 my-3 flex h-10 w-fit items-center space-x-4 rounded-md border border-primary-300 bg-primary-50 px-4 text-sm font-medium text-primary drop-shadow-lg">
    <ExclamationTriangleIcon className="size-5 stroke-void/80 text-warning" />
    <span>{children}</span>
  </div>
);

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
          <ChevronDoubleDownIcon className="size-4 text-foreground/50" />
        ) : (
          <p className="rounded-md bg-primary-100/5 px-2 py-1 text-xs tracking-wide text-primary-800 drop-shadow-sm">
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
  content?: ReactNode | string;
  startContent: DualIcon;
  animateIndicator: boolean;
}
const detail_data: TQrDetail[] = [
  {
    id: "instructions",
    title: "Instructions",
    startContent: InformationCircleIcon,
    indicator: indicator(true),
    animateIndicator: false,
    content: (
      <ItemContent>
        <div className="font-arc my-4 flex w-full items-center justify-center space-x-2 rounded-md bg-primary px-4 py-3 font-bold leading-none text-primary-50">
          <p>You have successfully created an agent code!</p>
          <CircleCheckBigIcon className="size-4 text-background" />
        </div>
        <div className="text-primar mb-3 flex h-10 items-center font-inter text-xs tracking-tight">
          Good to know:
        </div>
        <ol className="list-inside list-decimal space-y-3">
          <li className="pb-2">
            <span className="whitespace-nowrap font-inst font-semibold text-primary">
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
            <span className="whitespace-nowrap font-inst font-semibold text-primary">
              Agent Activation:
            </span>
            <ul className="mt-2 list-outside list-disc space-y-1 rounded-lg bg-primary-100/50 py-4 pl-6">
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
            <span className="whitespace-nowrap font-inst font-semibold text-primary">
              Monitor Activation Status:
            </span>
            <ul className="mt-2 list-outside list-disc space-y-1 rounded-lg bg-primary-100/50 py-4 pl-6">
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
    title: "Activation Code",
    subtitle: "Valid until 2023-01-01",
    startContent: QrCodeIcon,
    indicator: indicator(false),
    animateIndicator: true,
  },
  {
    id: "expiry",
    title: "Valid Until",
    subtitle: "Valid until 2023-01-01",
    startContent: ClockIcon,
    animateIndicator: true,
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
    animateIndicator: false,
    content: (
      <ItemContent>
        <span className="text-xs font-light">
          We&apos;re working on completing our documentation:{" "}
          <strong>wo_id:890</strong>
        </span>
      </ItemContent>
    ),
  },
];
