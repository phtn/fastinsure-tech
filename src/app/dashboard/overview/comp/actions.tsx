import { useAuthCtx } from "@/app/ctx/auth/auth";
import { type DualIcon } from "@/app/types";
import { type EmailContext } from "@/lib/email/schema";
import { useManager } from "@/lib/hooks/useManager";
import { Action, ActionCard, ActionLink } from "@/ui/action-card";
import { ButtSqx } from "@/ui/button/button";
import { copyFn, Err } from "@/utils/helpers";
import { BookOpenIcon, QrCodeIcon } from "@heroicons/react/24/outline";
import { Square2StackIcon } from "@heroicons/react/24/solid";
import { Spinner } from "@nextui-org/react";
import html2canvas from "html2canvas";
import { FileSymlinkIcon } from "lucide-react";
import { memo, type ReactNode, useCallback, useRef, useState } from "react";
import { useEmail } from "../../hooks/useEmail";
import { useRequest } from "../../hooks/useRequest";
import { QrCodegen } from "./qr-codegen";
import { ItemContent, QrDetails, Strong } from "./qr-details";
import { Qr } from "./qr-viewer";

export const CreateAgentCode = () => {
  const { user } = useAuthCtx();
  const { newAgentCode, loading, agentCode } = useManager();
  const [open, setOpen] = useState(false);

  const handleCreateAgentCode = useCallback(async () => {
    console.log(loading)
    await newAgentCode(user).then(() => {
      if (!loading){
        setOpen(true);
      }
    }).catch(Err);
  }, [newAgentCode, user, loading]);

  const handleToggleOpen = useCallback(() => setOpen((prev) => !prev), []);

  const codeRef = useRef<HTMLDivElement>(null);

  const [imageUrl, setImageUrl] = useState<string | null>(null);

   const generateImage = useCallback(async () => {
     if (imageUrl) {
       return imageUrl;
     }

     const options = {
       useCORS: true,
       logging: false,
       background: "#fff",
       removeContainer: true,
     };

     if (!codeRef.current) return null;
     const canvas = await html2canvas(codeRef.current, options);
     const dataUrl = canvas.toDataURL("image/png");
     setImageUrl(dataUrl)
     return dataUrl;
   }, [imageUrl]);

   const handleDownload = async () => {
     if (!codeRef.current) return;
     const image = await generateImage();
     if (image) {
       const link = document.createElement("a");
       link.href = image;
       link.download = `fast-${agentCode?.code}.png`;
       link.click();
     }
   };

   const handleShare = async () => {
     const image = await generateImage();
     if (image) {
       // Convert data URL to Blob
       const response = await fetch(image);
       const blob = await response.blob();
       const file = new File([blob], `fast-${agentCode?.code}.png`, {
         type: "image/png",
       });

       // Check if Web Share API is supported
       if (navigator.share) {
         try {
           await navigator.share({
             title: `FastInsure Activation Code`,
             text: "This code expires in 48 hours",
             files: [file],
           });
           console.log("Receipt shared successfully");
         } catch (error) {
           if (error instanceof Error && error.name === "AbortError") {
             console.log("User cancelled sharing");
           } else {
             console.log("Error sharing qr-code:", error);
           }
           console.log("Error sharing qr-code:", error);
         }
       } else {
         await handleDownload();
       }
     }
   };

   const {send} = useEmail()

   const handleSend = async (payload: EmailContext) => {
     if (agentCode?.url) {
       try {
         await send(payload).then(console.table);
         console.log("Email sent successfully");
       } catch (error) {
         console.log("Error sending email:", error);
       }
     }
   };

  const QrViewer = () => {
    return (
      <Qr open={open} onOpenChange={handleToggleOpen}>
        <Qr.Content title="Activation Code Generated" close={handleToggleOpen}>
          <Qr.Body>
            <Qr.Code ref={codeRef}>
              <QrCodegen url={agentCode?.url} />
            </Qr.Code>
            <Qr.Detail>
              <QrDetails
                key_code={agentCode?.code}
                expiry={agentCode?.expiry}
                downloadFn={handleDownload}
                shareFn={handleShare}
                sendFn={handleSend}
              />
            </Qr.Detail>
          </Qr.Body>

          <Instructions />
        </Qr.Content>
        <Qr.Footer>
          <FooterContent text={agentCode?.url} />
        </Qr.Footer>
      </Qr>
    );
  };

  // QrViewer.displayName = "QrViewer";

  return (
    <BasicAction
      title="Create Activation code"
      subtext="Generate a code for a new user."
      icon={QrCodeIcon}
      fn={handleCreateAgentCode}
      label="create"
      loading={loading}
    >
      <QrViewer />
    </BasicAction>
  );
};

// QrCodeIcon   Generate code for a new user.
interface BasicActionProps {
  title?: string;
  subtext?: string;
  icon: DualIcon;
  fn: VoidFunction;
  label: string;
  loading: boolean;
  children: ReactNode;
}
const BasicAction = (props: BasicActionProps) => (
  <ActionCard>
    <ActionCard.Icon icon={props.icon} />
    <ActionCard.Header>
      <ActionCard.Title>{props.title}</ActionCard.Title>
      <ActionCard.Subtext>{props.subtext}</ActionCard.Subtext>
    </ActionCard.Header>
    <Action>
      <Action.Btn onPress={props.fn} loading={props.loading}>
        <Action.Label>{props.loading ? <Spinner size="sm" color="secondary"/> : props.label}</Action.Label>
      </Action.Btn>
    </Action>
    {props.children}
  </ActionCard>
);
interface FooterContent {
  text: string | undefined;
}
const FooterContent = ({ text }: FooterContent) => {
  const copyText = () => text && copyFn({ name: "Activation URL", text });
  return (
    <Qr.Url url={text}>
      <ButtSqx size="md" iconStyle="fill-void/80" onClick={copyText} icon={Square2StackIcon} />
    </Qr.Url>
  );
};

interface SpecialActionProps {
  title?: string;
  subtext?: string;
  icon: DualIcon;
  href: string;
  label: string;
  loading: boolean;
}
export const SpecialAction = ({
  title,
  subtext,
  icon,
  href,
  label,
  loading,
}: SpecialActionProps) => {
  return (
    <ActionCard>
      <ActionCard.Icon icon={icon} />
      <ActionCard.Header>
        <ActionCard.Title>{title}</ActionCard.Title>
        <ActionCard.Subtext>{subtext}</ActionCard.Subtext>
      </ActionCard.Header>
      <Action>
        <ActionLink.BtnLink href={href} loading={loading}>
          <Action.Label>{label}</Action.Label>
        </ActionLink.BtnLink>
      </Action>
    </ActionCard>
  );
};

export const CreateRequest = () => {
  const create = useRequest();
  const handleCreate = useCallback(() => {
    create.request();
  }, [create]);

  return (
    <ActionCard>
      <ActionCard.Icon icon={FileSymlinkIcon} />
      <ActionCard.Header>
        <ActionCard.Title>Create Request</ActionCard.Title>
        <ActionCard.Subtext>New policy request</ActionCard.Subtext>
      </ActionCard.Header>
      <Action>
        <Action.Btn onPress={handleCreate} loading={create.loading}>
          <Action.Label>{create.loading ? <Spinner size="sm" color="secondary"/> : "Create"}</Action.Label>
        </Action.Btn>
      </Action>
    </ActionCard>
  );
};

export const Documentation = (props: {
  fn: VoidFunction;
  loading: boolean;
}) => {
  return (
    <ActionCard>
      <ActionCard.Icon icon={BookOpenIcon} />
      <ActionCard.Header>
        <ActionCard.Title>Read Documentation</ActionCard.Title>
        <ActionCard.Subtext>Need help?</ActionCard.Subtext>
      </ActionCard.Header>
      <Action>
        <Action.Btn onPress={props.fn} loading={props.loading}>
          <Action.Label>View Docs</Action.Label>
        </Action.Btn>
      </Action>
    </ActionCard>
  );
};

export const GenericAction = (props: {
  fn: VoidFunction;
  loading: boolean;
  icon: DualIcon;
  title: string;
  subtext?: string;
  label: string;
}) => {
  return (
    <ActionCard>
      <ActionCard.Icon icon={props.icon} />
      <ActionCard.Header>
        <ActionCard.Title>{props.title}</ActionCard.Title>
        <ActionCard.Subtext>{props.subtext}</ActionCard.Subtext>
      </ActionCard.Header>
      <Action>
        <Action.Btn onPress={props.fn} loading={props.loading}>
          <Action.Label>{props.label}</Action.Label>
        </Action.Btn>
      </Action>
    </ActionCard>
  );
};

export const Instructions = memo(() => {
  return (
    <div className="h-[20rem] pb-20 overflow-y-scroll w-[48rem]">
      <ItemContent>
        <div className="my-4 flex h-6 rounded-sm px-2 items-center w-fit bg-macd-blue font-inter font-bold text-white text-sm tracking-tight">
          Instructions:
        </div>
        <ol className="list-inside list-decimal space-y-3">
          <li className="pb-2">
            <span className="whitespace-nowrap font-inst font-semibold text-primary">
              Retrieving Activation Code Details:
            </span>
            <ul className="mt-2 list-outside list-disc space-y-1 rounded-lg bg-primary-100/50 py-4 pl-6">
              <li>
                Copy the <Strong text="Agent Code" /> (a unique identifier for
                activation).
              </li>
              <li>
                Activation <Strong text="Expires" /> in 48 hours.
              </li>
              <li>
                The <Strong text="Activation URL" /> can be shared with the agent to start the activation process.
              </li>
              <li>
                The <Strong text="QR Code" /> can be downloaded and shared with the agent.
              </li>
            </ul>
          </li>
          <li className="pb-2">
            <span className="whitespace-nowrap font-inst font-semibold text-primary">
              Activation Process:
            </span>
            <ul className="mt-2 list-outside list-disc space-y-1 rounded-lg bg-primary-100/50 py-4 pl-6">
              <li>
                The agent have to follow the link to the activation page using the provided
                <Strong text=" URL" />
              </li>
              <li>
                The agent will be prompted to enter the {" "}
                <Strong text="6 letter Agent Code " /> for verification.
              </li>
              <li>
                After the <Strong text=" code for verification" />, the agent will be redirected to FastInsure home page to create an account.
              </li>
              <li>
                Agents may <Strong text=" Sign up using their email or through Google " /> to complete the activation process.
              </li>
              <li>
                <Strong text="Activation Code Expires" /> within 48 hours.
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
                  You can monitor and track the status of all agent activations within your
                  dashboard. Click the QR icon from the sidebar to open the{" "}
                  <Strong text="Agent Code Table." />
                </span>
              </li>
            </ul>
          </li>
        </ol>
      </ItemContent>
    </div>
  );
});
Instructions.displayName = "Instructions";
