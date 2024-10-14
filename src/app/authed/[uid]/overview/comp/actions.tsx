import { useHealthCheck } from "@/lib/dev/health";
import { Action, ActionCard } from "@/ui/acard";
import { QrCodeIcon } from "@heroicons/react/24/outline";

export const CreateAgentCode = () => {
  const { healthCheck } = useHealthCheck();
  return (
    <ActionCard>
      <ActionCard.Icon icon={QrCodeIcon} />
      <ActionCard.Header>
        <ActionCard.Title>Create Agent Code</ActionCard.Title>
        <ActionCard.Subtext>Create a new agent code</ActionCard.Subtext>
      </ActionCard.Header>
      <Action>
        <Action.Btn onPress={healthCheck}>
          <Action.Label>Create</Action.Label>
        </Action.Btn>
      </Action>
    </ActionCard>
  );
};
