import { type DualIcon } from "@/app/types";
import { copyFn, Err, Ok } from "@/utils/helpers";
import {
  ArrowDownTrayIcon,
  ChevronDoubleDownIcon,
  ChevronLeftIcon,
  ClockIcon,
  EnvelopeIcon,
  PaperAirplaneIcon,
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
  useState,
  type PropsWithChildren,
  type ReactElement,
  type ReactNode,
} from "react";

import { onError } from "@/app/ctx/toasts";
import { EmailContextSchema, type EmailContext } from "@/lib/email/schema";
import { ButtSex } from "@/ui/button/ripple";
import { FastField } from "@/ui/input";
import { format, formatDistanceToNow } from "date-fns";

interface QrDetailsProps {
  key_code: string | undefined;
  expiry: number | undefined;
  downloadFn: VoidFunction;
  shareFn: VoidFunction;
  sendFn: (payload: EmailContext) => Promise<void>;
}
export const QrDetails = (props: QrDetailsProps) => {
  const {sendFn, shareFn, downloadFn, key_code} = props
  const { expiry, validity } = useMemo(
    () => calcExpiryAndValidity(props.expiry),
    [props.expiry],
  );

  const handleCopyCode = useCallback(
    (text: string) => () => copyFn({ name: text, text }),
    [],
  );
  const [sending, setSending] = useState(false)

  const handleSubmit = useCallback(
    async (data: FormData) => {
      setSending(true)
      const validated = EmailContextSchema.safeParse({
        type: "activation",
        email: data.get("email") as string,
        name: "Donald Trump",
        subject: "FastInsure Activation Code",
      })
      if (validated.error) {
        console.log("Validation failed:", validated.error);
        setSending(false)
        onError("Email validation failed")
        return
      }
      const payload = {
        type: validated.data.type,
        name: validated.data.name,
        email: validated.data.email,
        subject: validated.data.subject,
        text: key_code,
      } as EmailContext
      if (validated.success){
        await sendFn(payload).then(Ok(setSending, "Email sent!")).catch(Err(setSending))
      }
    },
    [sendFn, key_code],
  );

  const SendEmail = useCallback(() => (
    <GenericContent>
      <form action={handleSubmit} className="flex space-x-2">
        <FastField clearable name="email" icon={EnvelopeIcon} placeholder="Email" className="w-[20rem] border-[0.33px] drop-shadow-sm bg-white border-gray-400/40 rounded-lg h-10" />
        <ButtSex className="w-20" inverted type="submit" disabled={sending}>{sending ? "Sending..." : 'Send'}</ButtSex>
      </form>
    </GenericContent>
  ), [sending, handleSubmit])

  const RenderContent = useCallback(({id}: {id: string}) => {
    switch(id) {
      case "code":
        return <CodeContent>
          <p>{key_code}</p>
          <div>
            <Button
              size="sm"
              radius="none"
              className="h-9 rounded-e-md border-[0.33px] border-primary font-inter font-medium"
              variant="solid"
              color="primary"
              onPress={handleCopyCode(key_code!)}
            >
              <span>copy</span>
              <Square2StackIcon className="size-5 text-primary-50" />
            </Button>
          </div>
        </CodeContent>;
        case "expiry":
        return <ExpiryContent>This activation code expires in {expiry}</ExpiryContent>;
      case "download":
        return <GenericContent>
          <ButtSex onClick={downloadFn}>Download</ButtSex>
          <ButtSex onClick={shareFn} inverted>Share</ButtSex>
        </GenericContent>;
      case "send":
        return <SendEmail />;
      default:
        return null;
    }
  }, [expiry, handleCopyCode, downloadFn, shareFn, key_code, SendEmail])


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
          "bg-gradient-to-r from-primary-100/5 via-slate-200/50 to-slate-100/5",
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
          <RenderContent id={item.id} />
        </AccordionItem>
      ))}
    </Accordion>
  );
};

const calcExpiryAndValidity = (millis: number | undefined) => {

  const expiry = formatDistanceToNow(Number(millis))
  const validity = format(Number(millis), 'MMMM do, yyyy · h:mm a')

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

const GenericContent = ({ children }: PropsWithChildren) => (
  <div className="ms-10 my-1 flex h-10 w-fit items-center">
    <div className="flex h-9 items-center space-x-3 py-2 font-semibold">
      {children}
    </div>
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

export const ItemContent = ({ children }: PropsWithChildren) => (
  <div className="w-fit px-3 space-y-2 text-sm leading-5 text-foreground/80">
    {children}
  </div>
);

export const Strong = (props: { text: string }) => (
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
    id: "code",
    title: "Activation Code",
    subtitle: "QR code generated",
    startContent: QrCodeIcon,
    indicator: indicator(false),
    animateIndicator: true,
  },
  {
    id: "expiry",
    title: "Valid Until",
    subtitle: "Valid until",
    startContent: ClockIcon,
    animateIndicator: true,
    indicator: indicator(false, 0),
    content: (
      <ItemContent>
        This is the generated code: <strong>1234567890</strong>
      </ItemContent>
    ),
  },
  {
    id: "download",
    title: "Download QR Code",
    subtitle: "Download the QR code",
    startContent: ArrowDownTrayIcon,
    indicator: indicator(true),
    animateIndicator: false,
    content: (
      <div className="space-y-3">
        <div className="text-xs space-x-2 font-light">
          <span>{1}</span>
          <Strong text="Activation Code:"/>
          <span>A code generated by the group manager.</span>
        </div>
      </div>
    ),
  },
  {
      id: "send",
      title: "Send to Email",
      subtitle: "Send link to email",
      startContent: PaperAirplaneIcon,
      indicator: indicator(true),
      animateIndicator: false,
      content: (
        <ItemContent>
          <div className="text-xs space-x-2 font-light">
            <span>{1}</span>
            <Strong text="Activation Code:"/>
            <span>A code generated by the group manager.</span>
          </div>
        </ItemContent>
      ),
    },
];
