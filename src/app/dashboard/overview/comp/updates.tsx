import { BigActionCard } from "@/ui/action-card";
import { FlexRow } from "@/ui/flex";
import { HyperList } from "@/ui/list";
import { FireIcon, ShieldCheckIcon } from "@heroicons/react/24/solid";
import { Card } from "@nextui-org/react";
import type { ReactNode } from "react";

export const UpdatesComponent = () => (
  <BigActionCard>
    <BigActionCard.Icon icon={FireIcon} />
    <div className="h-full">
      <BigActionCard.Header>
        <BigActionCard.Title>Updates</BigActionCard.Title>
        <BigActionCard.Subtext>
          Read blog posts from our team.
        </BigActionCard.Subtext>
      </BigActionCard.Header>
      <div className="flex h-72 w-96 items-start justify-start pr-4 pt-4 font-inst text-xs">
        <div className="size-full rounded-lg bg-chalk p-4 drop-shadow dark:bg-chalk/60"></div>
      </div>
    </div>
    <div className="h-full w-full flex-grow-0 overflow-scroll rounded-lg bg-void"></div>
  </BigActionCard>
);

interface ActivationProps {
  children?: ReactNode;
}
export const ActivationComponent = ({ children }: ActivationProps) => (
  <BigActionCard>
    <BigActionCard.Icon icon={ShieldCheckIcon} />
    <div className="h-full w-full space-y-4">
      <BigActionCard.Header>
        <BigActionCard.Title>Activation Guide</BigActionCard.Title>
        <BigActionCard.Subtext>
          Follow these steps to activate your account.
        </BigActionCard.Subtext>
      </BigActionCard.Header>

      <HyperList
        data={activation_steps}
        component={ActivationStep}
        container="space-y-6"
        itemStyle="w-fit rounded-xl"
      />
    </div>
    <div className="flex h-96 w-full items-start justify-start font-inst text-xs">
      <div className="h-40 w-fit rounded-2xl bg-steel/10 px-8 py-6 drop-shadow dark:bg-steel/20">
        {children}
      </div>
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
    className="h-fit w-fit space-y-2 overflow-scroll rounded-xl bg-steel/30 p-4 text-void shadow-sm dark:bg-steel/20 dark:text-secondary-700"
  >
    <FlexRow className="w-full items-center px-2 font-inst text-xl">
      <span className="font-semibold">Step {step.id + 1}:</span>
      <span>{step.title}</span>
    </FlexRow>
    <div className="ps-2">
      <p className="max-w-[45ch] font-inter text-sm text-adam dark:text-icon-dark">
        {step.content}
      </p>
    </div>
  </Card>
);
