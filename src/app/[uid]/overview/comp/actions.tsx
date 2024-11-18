import { useAuthCtx } from "@/app/ctx/auth";
import { useManager } from "@/lib/hooks/useManager";
import { ActionCard, Action } from "@/ui/action-card";
import { QrCodeIcon } from "@heroicons/react/24/outline";
import { type ReactNode, useCallback, useState } from "react";
import { Qr } from "./qr-viewer";
import { Button } from "@nextui-org/react";
import { Square2StackIcon } from "@heroicons/react/24/solid";
import { QrDetails } from "./qr-details";
import { QrCodegen } from "./qr-codegen";
import { copyFn, toggleState } from "@/utils/helpers";
import { FileSymlinkIcon } from "lucide-react";
import { type DualIcon } from "@/app/types";

export const CreateAgentCode = () => {
  const { user } = useAuthCtx();
  const { newAgentCode, loading, agentCode } = useManager();
  const [open, setOpen] = useState(false);

  const handleCreateAgentCode = useCallback(async () => {
    await newAgentCode(user);
    setOpen(true);
  }, [newAgentCode, user]);

  const handleToggleOpen = () => toggleState(setOpen);

  const QrViewer = () => {
    const handleCopyUrl = (text: string) => () =>
      copyFn({ name: "Activation URL", text });
    return (
      <Qr open={open} onOpenChange={handleToggleOpen}>
        <Qr.Content title="Agent Code Generated" close={handleToggleOpen}>
          <Qr.Body>
            <Qr.Code>
              <QrCodegen url={agentCode?.data.url} />
            </Qr.Code>
            <Qr.Detail>
              <QrDetails
                key_code={agentCode?.data.code}
                expiry={agentCode?.data.expiry}
              />
            </Qr.Detail>
          </Qr.Body>
        </Qr.Content>
        <Qr.Footer>
          <Qr.Url url={agentCode?.data.url}>
            <Button
              size="sm"
              variant="ghost"
              isIconOnly
              className="border-0"
              onPress={handleCopyUrl(agentCode?.data.url ?? "")}
            >
              <Square2StackIcon className="size-5 text-primary-600" />
            </Button>
          </Qr.Url>
        </Qr.Footer>
      </Qr>
    );
  };

  QrViewer.displayName = "Qr";

  return (
    <ActionCard>
      <ActionCard.Icon icon={QrCodeIcon} />
      <ActionCard.Header>
        <ActionCard.Title>Create User Code</ActionCard.Title>
        <ActionCard.Subtext>Generate code for a new user.</ActionCard.Subtext>
      </ActionCard.Header>
      <Action>
        <Action.Btn onPress={handleCreateAgentCode} loading={loading}>
          <Action.Label>Create</Action.Label>
        </Action.Btn>
      </Action>
      <QrViewer />
    </ActionCard>
  );
};

interface SpecialActionProps {
  title?: string;
  subtext?: string;
  icon: DualIcon;
  children: ReactNode;
}
export const SpecialAction = ({
  title,
  subtext,
  icon,
  children,
}: SpecialActionProps) => {
  return (
    <ActionCard>
      <ActionCard.Icon icon={icon} />
      <ActionCard.Header>
        <ActionCard.Title>{title}</ActionCard.Title>
        <ActionCard.Subtext>{subtext}</ActionCard.Subtext>
      </ActionCard.Header>
      {children}
    </ActionCard>
  );
};

export const CreateRequest = (props: {
  createRequest: VoidFunction;
  loading: boolean;
}) => {
  return (
    <ActionCard>
      <ActionCard.Icon icon={FileSymlinkIcon} />
      <ActionCard.Header>
        <ActionCard.Title>Create Request</ActionCard.Title>
        <ActionCard.Subtext>New policy request</ActionCard.Subtext>
      </ActionCard.Header>
      <Action>
        <Action.Btn onPress={props.createRequest} loading={props.loading}>
          <Action.Label>Create</Action.Label>
        </Action.Btn>
      </Action>
    </ActionCard>
  );
};
