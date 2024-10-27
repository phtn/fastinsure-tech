import { useAuthCtx } from "@/app/ctx/auth";
import { useManager } from "@/lib/hooks/useManager";
import { ActionCard, Action } from "@/ui/action-card";
import { QrCodeIcon } from "@heroicons/react/24/outline";
import { memo, useState } from "react";
import { Qr } from "./qr-viewer";
import { Button } from "@nextui-org/react";
import { Square2StackIcon } from "@heroicons/react/24/solid";
import { QrDetails } from "./qr-details";
import { QrCodegen } from "./qr-codegen";

export const CreateAgentCode = () => {
  const { user } = useAuthCtx();
  const { newAgentCode, loading, agentCode } = useManager();
  const [open, setOpen] = useState(false);
  const handleCreateAgentCode = async () => {
    const idToken = await user?.getIdToken();
    if (!idToken && !user) return;
    const params = { idToken, uid: user?.uid, email: user?.email };
    await newAgentCode(params);

    if (agentCode) {
      setOpen(true);
    }
  };

  const QrViewer = memo(() => (
    <Qr open={open} onOpenChange={() => setOpen(!open)}>
      <Qr.Content title="Agent Code Generated">
        <Qr.Body>
          <Qr.Code>
            <QrCodegen key={agentCode?.data.key} />
          </Qr.Code>
          <Qr.Detail>
            <QrDetails />
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
