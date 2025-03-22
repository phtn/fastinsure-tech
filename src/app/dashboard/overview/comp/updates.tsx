import { BigActionCard } from "@/ui/action-card";
import { FlexRow } from "@/ui/flex";
import { HyperList } from "@/ui/list";
import { Card } from "@nextui-org/react";

export const UpdatesComponent = () => (
  <div className="w-full">
  <BigActionCard>
    <div>
      <BigActionCard.Header>
        <BigActionCard.Title>Updates</BigActionCard.Title>
        <BigActionCard.Subtext>
          Read blog posts from our team.
        </BigActionCard.Subtext>
      </BigActionCard.Header>
      <div className="flex size-96 items-start justify-start pt-4 font-inst text-xs">
        <div className="size-full rounded-lg bg-chalk p-4 drop-shadow dark:bg-chalk/60">
        </div>
      </div>
    </div>
  </BigActionCard>
  </div>
);

export const ActivationComponent = () => (
  <BigActionCard>
    <div className="h-full px-4 w-full space-y-4">
      <span className="text-3xl tracking-tighter mb-2">Steps to activate your account</span>

      <HyperList
        data={activation_steps}
        component={ActivationStep}
        container="space-y-6 pt-4"
        itemStyle="w-fit rounded-xl"
      />
    </div>

  </BigActionCard>
);

interface ActivationStepData {
  id: number;
  title: string;
  content: string;
  extra?: string;
}
const activation_steps: ActivationStepData[] = [
  {
    id: 0,
    title: "Get an activation code.",
    content:
      "If you haven't already, ask your manager to generate one for you. Activation codes are valid for 48 hours from the time it was created.",
  },
  {
    id: 1,
    title: "Enter your activation code.",
    content: "Enter your activation code and hit Activate. ",
  },
];

const ActivationStep = (step: ActivationStepData) => (
  <Card
    radius="lg"
    className="h-fit w-fit space-y-4 overflow-scroll rounded-xl bg-steel/10 p-4 text-void shadow-sm dark:bg-steel/20 dark:text-secondary-700"
  >
    <FlexRow className="w-full items-center px-2 font-inst text-lg">
      <span className="font-semibold">Step {step.id + 1}:</span>
      <span>{step.title}</span>
    </FlexRow>
    <div className="ps-2 pb-3">
      <p className="max-w-[45ch] font-inter text-sm text-adam dark:text-icon-dark">
        {step.content}
      </p>
    </div>
  </Card>
);
