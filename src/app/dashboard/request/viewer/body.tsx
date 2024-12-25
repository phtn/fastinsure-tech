import type { ClassName, DualIcon } from "@/app/types";
import { cn } from "@/lib/utils";
import { ButtSex } from "@/ui/button/ripple";
import { FlexRow } from "@/ui/flex";
import { type SelectUser } from "@convex/users/d";
import {
  ArrowPathRoundedSquareIcon,
  CheckCircleIcon,
  ClockIcon,
  DocumentTextIcon,
  PaperAirplaneIcon,
  RectangleStackIcon,
  SparklesIcon,
  DocumentIcon,
  PencilSquareIcon,
  UserIcon,
  TruckIcon,
} from "@heroicons/react/24/outline";
import { PencilIcon } from "@heroicons/react/24/solid";
import { Accordion, AccordionItem, Avatar } from "@nextui-org/react";
import { FileSymlinkIcon } from "lucide-react";
import moment from "moment";
import { type FC, use, useCallback, useMemo, useState } from "react";
import { RequestViewerCtx } from "./ctx";
import { PdfObject } from "./object";
import type { SelectRequest } from "@convex/requests/d";
import type { SelectAuto } from "@convex/autos/d";
import type { SelectAddress } from "@convex/address/d";
import type { SelectSubject } from "@convex/subjects/d";
import { opts, toggleState } from "@/utils/helpers";

interface DetailItem {
  value: string;
  icon: DualIcon;
  description?: string;
  fields: FC;
}

type ReqFieldProps = Omit<
  SelectRequest,
  "metadata" | "policy_id" | "files" | "updates"
>;
type AutoFieldProps = Omit<SelectAuto, "metadata">;
type SubjectFieldProps = Omit<SelectSubject, "metadata" | "file">;
type AddressFieldProps = Omit<SelectAddress, "metadata">;

export const ContentBody = () => {
  const {
    vxrequest,
    vxauto,
    vxaddress,
    vxsubject,
    underwriters,
    vxusers,
    submitRequest,
    loading,
    role,
  } = use(RequestViewerCtx)!;
  const vxund = underwriters?.find((u) => u.uid === vxrequest?.underwriter_id);
  const vxusr = vxusers?.find((u) => u.uid === vxrequest?.agent_id);

  const excludedKeys = useMemo(
    () => [
      "metadata",
      "policy_id",
      "files",
      "updates",
      "_id",
      "agent_id",
      "underwriter_id",
      "file",
    ],
    [],
  );
  const cleanReq = useMemo(
    () => excludeProps(vxrequest, excludedKeys),
    [vxrequest, excludedKeys],
  );
  const cleanAddress = useMemo(
    () => excludeProps(vxaddress, excludedKeys),
    [vxaddress, excludedKeys],
  );
  const cleanSubject = useMemo(
    () => excludeProps(vxsubject, excludedKeys),
    [vxsubject, excludedKeys],
  );
  const cleanAuto = useMemo(
    () => excludeProps(vxauto, excludedKeys),
    [vxauto, excludedKeys],
  );
  const reqfields = useMemo(
    () => cleanReq && Object.fromEntries(cleanReq),
    [cleanReq],
  );
  const ReqFields = useCallback(
    () => <Fields title="Request Info" fields={reqfields as ReqFieldProps} />,
    [reqfields],
  );
  const ReqFieldsPDF = useCallback(
    () => (
      <Fields title="Request Info" fields={reqfields as ReqFieldProps} pdf />
    ),
    [reqfields],
  );

  const autofields = useMemo(
    () => cleanAuto && Object.fromEntries(cleanAuto),
    [cleanAuto],
  );
  const AutoFields = useCallback(
    () => <Fields title="Vehicle Info" fields={autofields as AutoFieldProps} />,
    [autofields],
  );
  const AutoFieldsPDF = useCallback(
    () => (
      <Fields title="Vehicle Info" fields={autofields as AutoFieldProps} pdf />
    ),
    [autofields],
  );

  const addresssfields = useMemo(
    () => cleanAddress && Object.fromEntries(cleanAddress),
    [cleanAddress],
  );
  const AddressFields = useCallback(
    () => (
      <Fields title="Address" fields={addresssfields as AddressFieldProps} />
    ),
    [addresssfields],
  );
  const AddressFieldsPDF = useCallback(
    () => (
      <Fields
        title="Assured Address"
        fields={addresssfields as AddressFieldProps}
        pdf
      />
    ),
    [addresssfields],
  );

  const subjectfields = useMemo(
    () => cleanSubject && Object.fromEntries(cleanSubject),
    [cleanSubject],
  );
  const SubjectFields = useCallback(
    () => (
      <Fields title="Basic Info" fields={subjectfields as SubjectFieldProps} />
    ),
    [subjectfields],
  );
  const SubjectFieldsPDF = useCallback(
    () => (
      <Fields
        title="Assured Basic Info"
        fields={subjectfields as SubjectFieldProps}
        pdf
      />
    ),
    [subjectfields],
  );

  const AssuredFields = useCallback(
    () => (
      <div>
        <SubjectFields />
        <AddressFields />
      </div>
    ),
    [SubjectFields, AddressFields],
  );

  const PDF = useCallback(
    () => (
      <PdfObject
        address={AddressFieldsPDF}
        auto={AutoFieldsPDF}
        request={ReqFieldsPDF}
        subject={SubjectFieldsPDF}
        title="Policy Request Info"
        description=""
        id={vxrequest?.request_id}
      />
    ),
    [
      AddressFieldsPDF,
      AutoFieldsPDF,
      ReqFieldsPDF,
      SubjectFieldsPDF,
      vxrequest?.request_id,
    ],
  );

  const request_detail: DetailItem[] = useMemo(
    () => [
      {
        value: "Request Info",
        description: "View all request fields.",
        fields: ReqFields,
        icon: FileSymlinkIcon,
      },
      {
        value: "Assured Info",
        icon: UserIcon,
        fields: AssuredFields,
      },
      {
        value: "Vehicle Info",
        icon: TruckIcon,
        fields: AutoFields,
      },
      {
        value: "Download PDF",
        icon: DocumentIcon,
        fields: PDF,
      },
    ],
    [AutoFields, ReqFields, AssuredFields, PDF],
  );

  const draft = useMemo(
    () => vxrequest?.status === "draft",
    [vxrequest?.status],
  );

  const UpdateButton = useCallback(() => {
    const options = opts(
      <ButtSex
        size="lg"
        inverted
        end={PaperAirplaneIcon}
        onClick={submitRequest}
        loading={loading}
      >
        <span className="px-6">Submit Request</span>
      </ButtSex>,
      <ButtSex size="lg" inverted end={PencilSquareIcon}>
        <span className="px-6">Update Request</span>
      </ButtSex>,
    );
    return <>{options.get(draft)}</>;
  }, [draft, submitRequest, loading]);

  return (
    <div className="flex h-full w-full overflow-y-scroll bg-chalk p-6 dark:bg-void">
      <FlexRow className="absolute right-6 top-5 z-40 h-fit w-full items-center justify-end">
        <h2
          id="request-id"
          className="text:adam font-jet text-sm dark:text-steel"
        >
          Request ID: {vxrequest?.request_id}
        </h2>
      </FlexRow>
      <div className="relative -top-6 w-full space-y-4 overflow-hidden rounded-xl">
        <FlexRow className="h-fit w-full items-center justify-between">
          <FlexRow className="h-fit items-center">
            <PolicyPill type={vxrequest?.service_type} label="issuance" />
            <PolicyPill
              type={vxrequest?.policy_coverage}
              label="policy coverage"
            />
            <CreatedAt created={vxrequest?._creationTime} />
            <UserPill vx={vxusr} label="created by" />
            <UserPill
              vx={
                role === "underwriter"
                  ? vxund
                  : vxusers?.find((u) => u.role === "supervisor")
              }
              label={role === "underwriter" ? "supervisor" : "underwriter"}
            />
            <Status status={vxrequest?.status} />
          </FlexRow>
          <UpdateButton />
        </FlexRow>
        <div className="h-[calc(81vh)] space-y-6 overflow-hidden rounded-xl border-[0.33px] border-primary-300">
          <div className="grid h-[calc(81vh)] w-full grid-cols-1 gap-x-4 md:grid-cols-6">
            <Accordion className="col-span-4 h-[calc(84vh)] w-full overflow-y-scroll p-6">
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
                  title={
                    <h2 className="font-medium tracking-tight">
                      {detail.value}
                    </h2>
                  }
                  subtitle={
                    <p className="text-xs opacity-60">{detail.description}</p>
                  }
                >
                  {detail.fields({})}
                </AccordionItem>
              ))}
            </Accordion>
            <div className="col-span-2 h-[calc(81vh)] w-full rounded-xl rounded-l-none border-l-[0.33px] border-primary-300 bg-steel/20 p-6">
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

const CreatedAt = ({ created }: { created: number | undefined }) => {
  const [toggle, setToggle] = useState(false);
  const handleToggle = useCallback(() => toggleState(setToggle), [setToggle]);
  return (
    <ButtSex size="lg" start={ClockIcon} onClick={handleToggle}>
      <div className="w-40 text-left">
        {toggle ? (
          <p className="">{moment(created).format("lll")}</p>
        ) : (
          <p>
            {moment(created).format("dddd")}
            <span className="px-2 dark:text-adam">⏺</span>

            <span className="lowercase">{moment(created).fromNow()}</span>
          </p>
        )}
        <p className="font-jet text-[11px] font-normal lowercase drop-shadow-sm dark:text-warning-300">
          {toggle ? "created on" : "created on"}
        </p>
      </div>
    </ButtSex>
  );
};

// Helper function to format values
const formatValue = (value: string | number): string => {
  return typeof value === "number"
    ? moment(value).format("MMMM Do YYYY, h:mm:ss a")
    : String(value);
};

// Component for rendering a row
const RenderRow: FC<{
  keyName: string;
  value: string | number;
  className: ClassName;
}> = ({ keyName, value, className }) => (
  <div
    key={keyName}
    style={{ display: "flex", alignItems: "center", height: "36px" }}
    className={`flex items-center px-4 odd:bg-primary-100/30 ${className}`}
  >
    <div
      className={`flex w-36 items-center font-jet text-adam dark:text-steel ${className}`}
    >
      {keyName}
    </div>
    <div
      className={`flex w-fit items-center font-jet font-medium ${className}`}
    >
      {formatValue(value)}
    </div>
  </div>
);

const Fields: FC<{
  title: string;
  fields:
    | ReqFieldProps
    | AutoFieldProps
    | AddressFieldProps
    | SubjectFieldProps;
  pdf?: boolean;
}> = ({ title, fields, pdf = false }) => {
  const entries = fields ? Object.entries(fields) : [];

  // Filter and map entries into rows
  const renderFilteredRows = (rowClass: ClassName) => {
    return entries
      .filter(
        ([_, value]) => typeof value !== "string" || typeof value !== "number",
      )
      .map(([key, value]) => (
        <RenderRow key={key} keyName={key} value={value} className={rowClass} />
      ));
  };

  return (
    <div className="mb-4">
      <div className="overflow-hidden rounded-xl border-[0.33px] border-primary-300 dark:border-adam/60">
        <div
          style={{ paddingBottom: pdf ? 10 : 0 }}
          className="flex h-[39px] w-full items-center bg-void px-4 font-medium tracking-tight text-chalk dark:bg-adam/60 dark:text-warning-300"
        >
          {title}
        </div>
        {renderFilteredRows(pdf ? "h-6 text-xs items-center" : "h-10 text-sm")}
      </div>
    </div>
  );
};

const excludeProps = <T,>(o: T | null, keys: string[]) =>
  o && Object.entries(o).filter(([k, _]) => !keys.includes(k));
