import { ButtSex } from "@/ui/button/ripple";
import { FlexRow } from "@/ui/flex";
import {
  DocumentTextIcon,
  PaperAirplaneIcon,
  DocumentIcon,
  PencilSquareIcon,
  UserIcon,
  TruckIcon,
} from "@heroicons/react/24/outline";
import { Accordion, AccordionItem } from "@nextui-org/react";
import { FileSymlinkIcon } from "lucide-react";
import { type FC, use, useCallback, useMemo } from "react";
import { RequestViewerCtx } from "./ctx";
import { PdfObject } from "./object";
import { opts } from "@/utils/helpers";

import type { SelectRequest } from "@convex/requests/d";
import type { SelectAuto } from "@convex/autos/d";
import type { SelectAddress } from "@convex/address/d";
import type { SelectSubject } from "@convex/subjects/d";
import {
  excludeProps,
  type ITopPanel,
  RenderRow,
  RequestId,
  TopPanel,
} from "./components";
import type { ClassName, DualIcon } from "@/app/types";

type ReqFieldProps = Omit<
  SelectRequest,
  "metadata" | "policy_id" | "files" | "updates"
>;
type AutoFieldProps = Omit<SelectAuto, "metadata">;
type SubjectFieldProps = Omit<SelectSubject, "metadata" | "file">;
type AddressFieldProps = Omit<SelectAddress, "metadata">;

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

  const request_detail: IDetailItem[] = useMemo(
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

  const UpdateButton = useMemo(() => {
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

  const panelProps: ITopPanel = useMemo(
    () => ({
      service_type: vxrequest?.service_type,
      policy_coverage: vxrequest?.policy_coverage,
      status: vxrequest?.status,
      vxusers,
      vxund,
      vxusr,
      role,
      _creationTime: vxrequest?._creationTime,
    }),
    [
      vxrequest?.service_type,
      vxrequest?.policy_coverage,
      vxrequest?.status,
      vxusers,
      vxund,
      vxusr,
      role,
      vxrequest?._creationTime,
    ],
  );

  return (
    <div className="flex h-full w-full overflow-y-scroll bg-chalk py-6 dark:bg-void">
      <RequestId id={vxrequest?.request_id} />
      <div className="relative -top-6 w-full space-y-4 overflow-hidden rounded-xl">
        <TopPanel {...panelProps}>{UpdateButton}</TopPanel>
        <div className="flex h-[calc(84vh)] w-full justify-center space-y-6 overflow-hidden border-y-[0.33px] border-primary-300">
          <div className="grid w-full grid-cols-1 gap-x-4 md:grid-cols-6">
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
                // <DetailItem {...detail} key={detail.value} />
              ))}
              {/* <HyperList data={request_detail} component={} /> */}
            </Accordion>
            <AttachedFiles />
          </div>
        </div>
      </div>
    </div>
  );
};

const AttachedFiles = () => (
  <div className="col-span-2 h-[calc(84vh)] w-full border-l-[0.33px] border-primary-300 bg-steel/20 p-6">
    <FlexRow className="h-fit items-center space-x-1">
      <DocumentTextIcon className="size-4" />
      <h2 className="text-sm font-medium capitalize tracking-tight">
        Attached Files
      </h2>
    </FlexRow>
    <div className="min-h-[32rem]"></div>
  </div>
);

interface IDetailItem {
  value: string;
  icon: DualIcon;
  description?: string;
  fields: FC;
}
