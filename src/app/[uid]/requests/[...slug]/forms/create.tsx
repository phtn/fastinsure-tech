"use client";

import { type DualIcon } from "@/app/types";
import { FastFieldGroup, FastFile, FastLight } from "@/ui/input";
import { RadioGroupCard } from "@/ui/radio";
import { opts } from "@/utils/helpers";
import {
  ArrowRightCircleIcon,
  DevicePhoneMobileIcon,
  PaperAirplaneIcon,
  SparklesIcon,
  UserIcon,
} from "@heroicons/react/24/outline";
import { Button, Spinner } from "@nextui-org/react";
import type {
  InsertRequest,
  PolicyCoverage,
  PolicyType,
  ServiceType,
} from "convex/requests/d";
import {
  CarFrontIcon,
  CatIcon,
  CrossIcon,
  PlaneTakeoffIcon,
  RotateCcwIcon,
} from "lucide-react";
import { usePathname } from "next/navigation";
import { type HTMLInputTypeAttribute, memo, useCallback } from "react";
import {
  CardGroup,
  FormHeader,
  HiddenCanvas,
  ImageViewer,
  Row,
  ScanButton,
  ScanDetail,
  ScanResults,
  SpecialGroup,
  Wrapper,
} from "./components";
import { useFile } from "./useFile";
import { useForm } from "./useForm";
import { useScanner } from "./useScanner";

function RequestComponent() {
  const { initializeRequest } = useForm();
  const { handleScanDocument, loading, result, elapsed } = useScanner();
  const {
    imageData,
    clearFile,
    inputRef,
    handleFileChange,
    rawDocument,
    format,
    size,
  } = useFile();
  const pathname = usePathname();
  const request_id = pathname.split("/")[4];

  const ViewOptions = useCallback(() => {
    const withImage = typeof imageData !== "undefined";
    const options = opts(
      <ImageViewer imageData={imageData} clearFile={clearFile} />,
      <FastFile
        ref={inputRef}
        onChange={handleFileChange}
        className="[22.4rem] -mt-[1px] h-96"
      />,
    );
    return <>{options.get(withImage)}</>;
  }, [clearFile, imageData, handleFileChange, inputRef]);

  const ResultOptions = useCallback(() => {
    const options = opts(
      <ScanResults entities={result} />,
      <div className="text-xs">
        {loading ? (
          <Spinner size="sm" color="primary" />
        ) : (
          "Scan Results will be shown here."
        )}
      </div>,
    );
    return <>{options.get(!!result)}</>;
  }, [result, loading]);

  return (
    <Wrapper>
      <FormHeader isLoading={false} isValid={true} title="New Request Form" />
      <form action={initializeRequest} className="w-full">
        <CardGroup title="Policy Type">
          <RadioGroupCard
            name="policy_type"
            items={request_policy_types}
            horizontal
          />
        </CardGroup>
        {/* <HSeparator /> */}
        <section className="grid w-full grid-cols-5">
          <div className="col-span-3 w-full">
            <div className="flex w-full items-center">
              <CardGroup title="Policy Coverage">
                <RadioGroupCard
                  name="policy_coverage"
                  items={request_policy_coverage}
                  horizontal
                />
              </CardGroup>
              <CardGroup title="Service Type">
                <RadioGroupCard
                  name="service_type"
                  items={request_service_type}
                  horizontal
                />
              </CardGroup>
            </div>
            <CardGroup title="Assured Info">
              <div className="space-y-8">
                <FastFieldGroup items={assured_name} group="Full name" />
                <FastFieldGroup
                  items={assured_contact}
                  group="Contact details"
                />
              </div>
            </CardGroup>

            <CardGroup title="">
              {init_request_fields.map((field) => (
                <Row
                  key={field.name}
                  title={field.title}
                  description={field.description}
                >
                  <div className="w-full">
                    <FastLight
                      required={field.required}
                      value={field.name === "request_id" ? request_id : ""}
                      placeholder={field.placeholder}
                      {...field}
                    />
                  </div>
                </Row>
              ))}
            </CardGroup>
          </div>
          <SpecialGroup
            title="Document Scanner"
            subtext="This feature is currently unavailable."
          >
            <ViewOptions />
            <div className="flex items-center justify-between px-2">
              <ScanDetail format={format} size={size} elapsed={elapsed} />
              <ScanButton
                imageData={imageData}
                loading={loading}
                onPress={handleScanDocument(rawDocument)}
              />
            </div>
            <div className="h-96 w-full overflow-scroll rounded-md border-[0.33px] border-primary-200 p-4">
              <ResultOptions />
              <HiddenCanvas />
            </div>
          </SpecialGroup>
        </section>
        <div className="px-4">
          <Button
            size="md"
            radius="sm"
            variant="solid"
            color="primary"
            className="w-fit dark:bg-background dark:text-foreground/80"
            type="submit"
          >
            <p className="font-inter font-medium tracking-tight">
              Submit Request
            </p>
            <PaperAirplaneIcon className="size-4" />
          </Button>
        </div>
      </form>
    </Wrapper>
  );
}
export const RequestForm = memo(RequestComponent);

export interface RadioFields<K, T> {
  title: K;
  icon: DualIcon;
  name: keyof T;
  description?: string;
  type: HTMLInputTypeAttribute;
  disabled?: boolean;
}

const request_service_type: RadioFields<ServiceType, InsertRequest>[] = [
  {
    title: "new",
    icon: SparklesIcon,
    name: "service_type",
    type: "radio",
    description: "New Policy",
  },
  {
    title: "renewal",
    icon: RotateCcwIcon,
    name: "service_type",
    type: "radio",
    description: "Policy renewal",
  },
];

const request_policy_coverage: RadioFields<PolicyCoverage, InsertRequest>[] = [
  {
    title: "compulsory",
    icon: CarFrontIcon,
    name: "policy_coverage",
    type: "radio",
    description: "CTPL Coverage",
  },
  {
    title: "comprehensive",
    icon: CarFrontIcon,
    name: "policy_coverage",
    type: "radio",
    description: "Full Coverage",
  },
];

const request_policy_types: RadioFields<PolicyType, InsertRequest>[] = [
  {
    title: "auto",
    icon: CarFrontIcon,
    name: "policy_type",
    type: "radio",
    description: "Motor vehicles",
  },
  {
    title: "personal",
    icon: UserIcon,
    name: "policy_type",
    type: "radio",
    description: "Personal accidents",
    disabled: true,
  },
  {
    title: "travel",
    icon: PlaneTakeoffIcon,
    name: "policy_type",
    type: "radio",
    description: "Travel Insurance",
    disabled: true,
  },
  {
    title: "health",
    icon: CrossIcon,
    name: "policy_type",
    type: "radio",
    description: "Health Insurance",
    disabled: true,
  },
  {
    title: "device",
    icon: DevicePhoneMobileIcon,
    name: "policy_type",
    type: "radio",
    description: "Phone Insurance",
    disabled: true,
  },
  {
    title: "pet",
    icon: CatIcon,
    name: "policy_type",
    type: "radio",
    description: "Pet Insurance",
    disabled: true,
  },
];

export interface RequestFields {
  title: string;
  description?: string;
  disabled?: boolean;
  icon: DualIcon;
  required?: boolean;
  hidden?: boolean;
  name: keyof InsertRequest;
  onChange?: VoidFunction;
  placeholder?: string;
  hint?: string;
  type: HTMLInputTypeAttribute;
}

const assured_name: RequestFields[] = [
  {
    title: "first",
    description: "Assured first given name.",
    icon: ArrowRightCircleIcon,
    name: "assured_firstname",
    placeholder: "First name",
    required: true,
    type: "text",
  },
  {
    title: "middle",
    description: "Assured middle name.",
    icon: ArrowRightCircleIcon,
    name: "assured_middlename",
    placeholder: "Middle name",
    required: false,
    type: "text",
  },
  {
    title: "last",
    description: "Assured last given name.",
    icon: ArrowRightCircleIcon,
    name: "assured_lastname",
    placeholder: "Last name",
    required: true,
    type: "text",
  },
];

const assured_contact: RequestFields[] = [
  {
    title: "email",
    description: "Assured email address.",
    icon: ArrowRightCircleIcon,
    name: "assured_email",
    placeholder: "Email address",
    required: false,
    type: "email",
  },
  {
    title: "phone",
    description: "Assured phone number.",
    icon: ArrowRightCircleIcon,
    name: "assured_phone",
    placeholder: "Phone number",
    required: false,
    type: "number",
  },
];
const init_request_fields: RequestFields[] = [
  {
    title: "Request ID",
    description: "This field is auto-generated.",
    icon: ArrowRightCircleIcon,
    required: true,
    hidden: true,
    name: "request_id",
    placeholder: "Request ID",
    hint: "This field is auto-generated.",
    type: "text",
  },

  {
    title: "Agent Email",
    description: "Agent's Email address.",
    icon: ArrowRightCircleIcon,
    required: false,
    hidden: true,
    name: "agent_email",
    placeholder: "Agent email address",
    type: "email",
  },
  {
    title: "Group ID",
    description: "This field is auto-generated.",
    icon: ArrowRightCircleIcon,
    required: true,
    hidden: true,
    name: "group_code",
    placeholder: "Group ID",
    type: "text",
  },
];
