import { ButtSex } from "@/ui/button/ripple";
import {
  PaperAirplaneIcon,
  UserIcon,
  TruckIcon,
  DocumentArrowDownIcon,
} from "@heroicons/react/24/outline";
import { Accordion, AccordionItem } from "@nextui-org/react";
import { FileSymlinkIcon } from "lucide-react";
import { type FC, use, useCallback, useMemo } from "react";
import { RequestViewerCtx } from "./ctx";
import { PdfObject } from "./pdf";
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
import { AttachedFiles } from "./fileviewer";
import { ArrowUpCircleIcon } from "@heroicons/react/24/solid";
import { FileUpload } from "./fileuploader";

export type ReqFieldProps = Omit<
  SelectRequest,
  "metadata" | "policy_id" | "files" | "updates"
>;
export type AutoFieldProps = Omit<SelectAuto, "metadata">;
export type SubjectFieldProps = Omit<SelectSubject, "metadata" | "file">;
export type AddressFieldProps = Omit<SelectAddress, "metadata">;

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
    <div className="mb-4 bg-steel/5 backdrop-blur-2xl">
      <div className="overflow-hidden rounded-md border-[0.33px] border-primary-300 dark:border-adam/60">
        <div
          style={{ paddingBottom: pdf ? 10 : 0 }}
          className="flex h-[39px] w-full items-center bg-steel/50 px-4 font-medium tracking-tight text-void"
        >
          {title}
        </div>
        {renderFilteredRows(pdf ? "h-6 text-xs items-center" : "h-10 text-sm")}
      </div>
    </div>
  );
};

interface IDetailItem {
  value: string;
  icon: DualIcon;
  description?: string;
  component: FC;
}

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
    pending,
    role,
    attachedFiles,
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

  const addressfields = useMemo(
    () => cleanAddress && Object.fromEntries(cleanAddress),
    [cleanAddress],
  );
  const AddressFields = useCallback(
    () => (
      <Fields title="Address" fields={addressfields as AddressFieldProps} />
    ),
    [addressfields],
  );
  const AddressFieldsPDF = useCallback(
    () => (
      <Fields
        title="Assured Address"
        fields={addressfields as AddressFieldProps}
        pdf
      />
    ),
    [addressfields],
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

  const PDFViewer = useCallback(
    () => (
      <PdfObject
        address={AddressFieldsPDF}
        auto={AutoFieldsPDF}
        request={ReqFieldsPDF}
        subject={SubjectFieldsPDF}
        subjectData={subjectfields as SubjectFieldProps}
        addressData={addressfields as AddressFieldProps}
        autoData={autofields as AutoFieldProps}
        requestData={reqfields as ReqFieldProps}
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
      addressfields,
      autofields,
      subjectfields,
      reqfields,
    ],
  );

  const request_detail: IDetailItem[] = useMemo(
    () => [
      {
        value: "Request Info",
        description: "View all request fields.",
        component: ReqFields,
        icon: FileSymlinkIcon,
      },
      {
        value: "Assured Info",
        icon: UserIcon,
        component: AssuredFields,
      },
      {
        value: "Vehicle Info",
        icon: TruckIcon,
        component: AutoFields,
      },
      {
        value: "Downloads",
        icon: DocumentArrowDownIcon,
        component: PDFViewer,
      },
    ],
    [AutoFields, ReqFields, AssuredFields, PDFViewer],
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
        <span className="px-3">Submit Request</span>
      </ButtSex>,
      <ButtSex size="md" inverted end={ArrowUpCircleIcon}>
        <span className="px-3 text-sm">Update Request</span>
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
    <div className="h-full w-full overflow-y-scroll bg-chalk from-void via-slate-900/80 to-void py-6 dark:bg-gradient-to-tl">
      <RequestId id={vxrequest?.request_id} />

      <div className="absolute right-1.5 top-1.5 z-50 flex items-center space-x-1">
        <FileUpload />
        {UpdateButton}
      </div>
      <div className="pointer-events-none absolute top-0 z-[100] h-16 w-full bg-gradient-to-l from-void/20 via-transparent to-transparent"></div>
      <div className="relative -top-6 w-full overflow-hidden">
        <TopPanel {...panelProps} />
        <div className="flex h-[calc(84vh)] w-full justify-center overflow-hidden border-y-[0.33px] border-primary-300">
          <div className="grid w-full grid-cols-1 gap-x-4 md:grid-cols-6">
            <Accordion className="col-span-4 h-[calc(84vh)] w-full overflow-y-scroll">
              {request_detail.map((detail) => (
                <AccordionItem
                  classNames={{
                    trigger: "h-24 px-4",
                    content: "px-4",
                  }}
                  key={detail.value}
                  aria-label={detail.value}
                  startContent={
                    <detail.icon className="size-6 stroke-1 text-adam dark:text-steel" />
                  }
                  title={
                    <h2 className="font-medium tracking-tight">
                      {detail.value}
                    </h2>
                  }
                  subtitle={
                    <p className="text-sm opacity-60">{detail.description}</p>
                  }
                >
                  <detail.component />
                </AccordionItem>
              ))}
            </Accordion>
            <AttachedFiles pending={pending} attachedFiles={attachedFiles} />
          </div>
        </div>
      </div>
    </div>
  );
};
