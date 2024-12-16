import { useAuthCtx } from "@/app/ctx/auth/auth";
import { useManager } from "@/lib/hooks/useManager";
import { ActionCard, Action, ActionLink } from "@/ui/action-card";
import { BookOpenIcon, QrCodeIcon } from "@heroicons/react/24/outline";
import { type ReactNode, useCallback, useMemo, useState } from "react";
import { Qr } from "./qr-viewer";
import { Button } from "@nextui-org/react";
import { Square2StackIcon } from "@heroicons/react/24/solid";
import { QrDetails } from "./qr-details";
import { QrCodegen } from "./qr-codegen";
import { copyFn, Err, toggleState } from "@/utils/helpers";
import { FileSymlinkIcon } from "lucide-react";
import { type DualIcon } from "@/app/types";
import { useRequest } from "../../hooks/useRequest";

export const CreateAgentCode = () => {
  const { user } = useAuthCtx();
  const { newAgentCode, loading, agentCode } = useManager();
  const [open, setOpen] = useState(false);

  const handleCreateAgentCode = useCallback(async () => {
    await newAgentCode(user).then(setOpen).catch(Err);
  }, [newAgentCode, user]);

  const handleToggleOpen = useCallback(() => toggleState(setOpen), []);

  const url = useMemo(
    () =>
      agentCode?.url + `&exp=$` + (Date.now() + (agentCode?.expiry ?? 0)) + `$`,
    [agentCode?.url, agentCode?.expiry],
  );

  const QrViewer = () => {
    return (
      <Qr open={open} onOpenChange={handleToggleOpen}>
        <Qr.Content title="Activation Code Generated" close={handleToggleOpen}>
          <Qr.Body>
            <Qr.Code>
              <QrCodegen url={url} />
            </Qr.Code>
            <Qr.Detail>
              <QrDetails
                key_code={agentCode?.code}
                expiry={agentCode?.expiry}
              />
            </Qr.Detail>
          </Qr.Body>
        </Qr.Content>
        <Qr.Footer>
          <FooterContent text={url} />
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
        <Action.Label>{props.label}</Action.Label>
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
      <Button
        size="sm"
        isIconOnly
        variant="flat"
        className="border-0 dark:hover:bg-zinc-900"
        onPress={copyText}
      >
        <Square2StackIcon className="size-5 text-primary-700" />
      </Button>
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

  return (
    <ActionCard>
      <ActionCard.Icon icon={FileSymlinkIcon} />
      <ActionCard.Header>
        <ActionCard.Title>Create Request</ActionCard.Title>
        <ActionCard.Subtext>New policy request</ActionCard.Subtext>
      </ActionCard.Header>
      <Action>
        <Action.Btn onPress={create.request} loading={create.loading}>
          <Action.Label>Create</Action.Label>
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
