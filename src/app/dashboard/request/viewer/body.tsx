import { type DualIcon } from "@/app/types";
import { cn } from "@/lib/utils";
import { ButtSex } from "@/ui/button/ripple";
import { FlexRow } from "@/ui/flex";
import { TooltipNode } from "@/ui/tooltip";
import { type SelectUser } from "@convex/users/d";
import {
  ArrowPathRoundedSquareIcon,
  CheckCircleIcon,
  ClockIcon,
  DocumentTextIcon,
  PaperAirplaneIcon,
  RectangleStackIcon,
  SparklesIcon,
} from "@heroicons/react/24/outline";
import { PencilIcon } from "@heroicons/react/24/solid";
import { Accordion, AccordionItem, Avatar } from "@nextui-org/react";
import { FileSymlinkIcon } from "lucide-react";
import moment from "moment";
import { type FC, use, useCallback, useMemo } from "react";
import { RequestViewerCtx } from "./ctx";

interface DetailItem {
  value: string;
  icon: DualIcon;
  description?: string;
  fields: FC;
}

export const ContentBody = () => {
  const { vxrequest, underwriters, vxusers } = use(RequestViewerCtx)!;
  const vxund = underwriters?.find((u) => u.uid === vxrequest?.underwriter_id);
  const vxusr = vxusers?.find((u) => u.uid === vxrequest?.agent_id);

  const RequestFields: FC = useCallback(() => {
    const requestEntries = vxrequest && Object.entries(vxrequest);
    const list = requestEntries?.map(([k, v]) => ({ k, v }));
    return (
      <>
        {list
          ?.filter(
            (e) =>
              typeof e.v !== "string" ||
              typeof e.v !== "number" ||
              e.k !== "files",
          )
          .map(({ k, v }) => (
            <FlexRow
              key={k}
              className="h-10 items-center space-y-2 px-4 odd:bg-primary-100/30"
            >
              <div className="w-36 font-jet text-sm text-adam dark:text-steel">
                {k}
              </div>
              <div className="flex w-fit items-center font-jet text-sm font-medium dark:text-secondary-400">
                {v as string}
              </div>
            </FlexRow>
          ))}
      </>
    );
  }, [vxrequest]);

  const request_detail: DetailItem[] = useMemo(
    () => [
      {
        value: "request",
        description: "View all request fields.",
        fields: RequestFields,
        icon: FileSymlinkIcon,
      },
      {
        value: "assured",
        icon: FileSymlinkIcon,
        fields: RequestFields,
      },
      {
        value: "auto",
        icon: FileSymlinkIcon,
        fields: RequestFields,
      },
    ],
    [RequestFields],
  );

  return (
    <div className="flex h-[calc(93vh)] w-full overflow-y-scroll bg-chalk p-6 dark:bg-void">
      <FlexRow className="absolute right-4 top-5 h-fit w-full items-center justify-end">
        {/* <h1 className="pb-3 font-semibold tracking-tight text-adam dark:text-steel">
          Policy Request Details
        </h1> */}
        <TooltipNode
          id="request-id"
          title="Request ID"
          description="- used as reference no."
        >
          <h2 id="request-id" className="text:adam font-jet dark:text-steel">
            {vxrequest?.request_id}
          </h2>
        </TooltipNode>
      </FlexRow>
      <div className="relative -top-6 w-full space-y-4 rounded-xl">
        <FlexRow className="h-fit w-fit items-center">
          <PolicyPill type={vxrequest?.service_type} label="issuance" />
          <PolicyPill
            type={vxrequest?.policy_coverage}
            label="policy coverage"
          />
          <CreatedAt created={vxrequest?._creationTime} />
          <UserPill vx={vxusr} label="create by" />
          <UserPill vx={vxund} label="underwriter" />
          <Status status={vxrequest?.status} />
          <ButtSex size="md" inverted end={PaperAirplaneIcon}>
            {vxrequest?.status === "draft" ? "Submit Request" : "Update"}
          </ButtSex>
        </FlexRow>
        <div className="space-y-6 rounded-xl border-[0.33px] border-primary-300">
          <div className="grid w-full grid-cols-1 gap-x-4 md:grid-cols-6">
            <Accordion
              defaultExpandedKeys={["request"]}
              className="col-span-4 h-[calc(75vh)] w-full overflow-y-scroll p-6"
            >
              {request_detail.map((detail) => (
                <AccordionItem
                  classNames={{
                    trigger: "h-20",
                  }}
                  key={detail.value}
                  aria-label={detail.value}
                  startContent={
                    <detail.icon className="size-7 stroke-1 text-secondary dark:text-steel" />
                  }
                  title={<h2 className="capitalize">{detail.value} info</h2>}
                  subtitle={
                    <p className="text-xs opacity-60">{detail.description}</p>
                  }
                >
                  {detail.fields({})}
                </AccordionItem>
              ))}
            </Accordion>
            <div className="col-span-2 h-[calc(82vh)] w-full rounded-xl rounded-l-none border-l-[0.33px] border-primary-300 bg-steel/20 p-6">
              <FlexRow className="h-fit items-center space-x-1 border-b border-steel/60 pb-3">
                <PencilIcon className="size-4 text-secondary -rotate-12" />
                <h2 className="text-sm font-semibold capitalize tracking-tight text-adam dark:text-steel">
                  Add Notes
                </h2>
              </FlexRow>
              <div className="min-h-[32rem]"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const UserPill = (props: { vx: SelectUser | undefined; label: string }) => {
  return (
    <ButtSex size="lg">
      <Avatar
        src={props.vx?.photo_url}
        className={cn("mr-4 shrink-0 border border-warning-300", {
          "border-indigo-400": props.label === "underwriter",
        })}
        size="sm"
      />
      <div className="w-full text-left">
        <p>{props.vx?.nickname}</p>
        <p
          className={cn(
            "font-jet text-[11px] font-normal lowercase drop-shadow-sm dark:text-secondary-300",
            { "dark:text-indigo-300": props.label === "underwriter" },
          )}
        >
          {props.label}
        </p>
      </div>
    </ButtSex>
  );
};

const Status = (props: { status: string | undefined }) => {
  return (
    <ButtSex
      size="lg"
      start={
        props.status === "draft"
          ? DocumentTextIcon
          : props.status === "submitted"
            ? PaperAirplaneIcon
            : CheckCircleIcon
      }
    >
      <div className="w-full text-left">
        <p>{props.status}</p>
        <p className="font-jet text-[11px] font-normal lowercase drop-shadow-sm dark:text-secondary-300">
          status
        </p>
      </div>
    </ButtSex>
  );
};

const PolicyPill = (props: { type: string | undefined; label: string }) => {
  return (
    <ButtSex
      size="lg"
      start={
        props.label === "issuance"
          ? props.type === "new"
            ? SparklesIcon
            : ArrowPathRoundedSquareIcon
          : RectangleStackIcon
      }
    >
      <div className="w-full text-left">
        <p>{props.type}</p>
        <p className="font-jet text-[11px] font-normal lowercase drop-shadow-sm dark:text-pink-200">
          {props.label}
        </p>
      </div>
    </ButtSex>
  );
};

const CreatedAt = (props: { created: number | undefined }) => {
  return (
    <ButtSex size="lg" start={ClockIcon}>
      <div className="w-full text-left">
        <p>{moment(props.created).calendar()}</p>
        <p className="font-jet text-[11px] font-normal lowercase drop-shadow-sm dark:text-warning-300">
          created at
        </p>
      </div>
    </ButtSex>
  );
};
