import { useAuthCtx } from "@/app/ctx/auth";
import { useManager } from "@/lib/hooks/useManager";
import { ActionCard, Action } from "@/ui/action-card";
import { QrCodeIcon } from "@heroicons/react/24/outline";
import { memo, useCallback, useState } from "react";
import { Qr } from "./qr-viewer";
import { Button } from "@nextui-org/react";
import { Square2StackIcon } from "@heroicons/react/24/solid";
import { QrDetails } from "./qr-details";
import { QrCodegen } from "./qr-codegen";
import { toggleState } from "@/utils/helpers";

export const CreateAgentCode = () => {
  const { user } = useAuthCtx();
  const { newAgentCode, loading, agentCode } = useManager();
  const [open, setOpen] = useState(false);

  const handleCreateAgentCode = useCallback(async () => {
    await newAgentCode(user);
    setOpen(true);
  }, [newAgentCode, user]);

  const handleToggleOpen = () => toggleState(setOpen);

  const QrViewer = memo(() => (
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
          <Button size="sm" variant="ghost" isIconOnly className="border-0">
            <Square2StackIcon className="size-5 text-foreground" />
          </Button>
        </Qr.Url>
      </Qr.Footer>
    </Qr>
  ));
  QrViewer.displayName = "Qr";

  return (
    <ActionCard>
      <ActionCard.Icon icon={QrCodeIcon} />
      <ActionCard.Header>
        <ActionCard.Title>Create Agent Code</ActionCard.Title>
        <ActionCard.Subtext>Create a new agent code</ActionCard.Subtext>
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

// export const HealthCheck = () => {
//   const { user } = useAuthCtx();
//   const handleHealthCheck = async () => {
//     const idToken = await user?.getIdToken();
//     if (!idToken) return;
//     await healthCheck();
//   };

//   return (
//     <ActionCard>
//       <ActionCard.Icon icon={QrCodeIcon} />
//       <ActionCard.Header>
//         <ActionCard.Title>Create Agent Code</ActionCard.Title>
//         <ActionCard.Subtext>Create a new agent code</ActionCard.Subtext>
//       </ActionCard.Header>
//       <Action>
//         <Action.Btn onPress={healthCheck}>
//           <Action.Label>Create</Action.Label>
//         </Action.Btn>
//       </Action>
//     </ActionCard>
//   );
// };

export const GetUserInfo = () => {
  const { user } = useAuthCtx();
  const getAccessToken = async () => {
    if (user) {
      console.log({
        // accessToken: user.accessToken,
        refreshToken: user.refreshToken,
      });
    }
  };

  return (
    <ActionCard>
      <ActionCard.Icon icon={QrCodeIcon} />
      <ActionCard.Header>
        <ActionCard.Title>Get User Info</ActionCard.Title>
        <ActionCard.Subtext>On development mode only</ActionCard.Subtext>
      </ActionCard.Header>
      <Action>
        <Action.Btn onPress={getAccessToken} loading={false}>
          <Action.Label>GET</Action.Label>
        </Action.Btn>
      </Action>
    </ActionCard>
  );
};
