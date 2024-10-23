import { useAuthCtx } from "@/app/ctx/auth";
import { useManager } from "@/lib/dev/code";
import { Action, ActionCard } from "@/ui/acard";
import { QrCodeIcon } from "@heroicons/react/24/outline";

export const CreateAgentCode = () => {
  const { user } = useAuthCtx();
  const { getAgentCode, loading } = useManager();
  const handleCreateAgentCode = async () => {
    const idToken = await user?.getIdToken();
    if (!idToken && !user) return;
    const params = { idToken, uid: user?.uid, email: user?.email };
    const result = await getAgentCode(params);

    console.log(result);
  };

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
  // const { user } = useAuthCtx();
  // const getIdToken = async () => {
  //   const idToken = await user?.getIdToken();
  //   console.log({ idToken, user });
  // };

  return (
    <ActionCard>
      <ActionCard.Icon icon={QrCodeIcon} />
      <ActionCard.Header>
        <ActionCard.Title>Get User Info</ActionCard.Title>
        <ActionCard.Subtext>On development mode only</ActionCard.Subtext>
      </ActionCard.Header>
      <Action>
        <Action.Btn
          onPress={() => console.log("Get User Info")}
          loading={false}
        >
          <Action.Label>GET</Action.Label>
        </Action.Btn>
      </Action>
    </ActionCard>
  );
};
