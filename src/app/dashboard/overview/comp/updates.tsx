import { BigActionCard } from "@/ui/action-card";
import Json from "@/ui/json";
import { FireIcon } from "@heroicons/react/24/solid";

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
    <div className="h-full w-full flex-grow-0 overflow-scroll rounded-lg bg-void">
      <Json src={{}} theme="ashes" />
    </div>
  </BigActionCard>
);
