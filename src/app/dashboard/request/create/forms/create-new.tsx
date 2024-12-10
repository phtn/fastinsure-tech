"use client";

import { RadioGroupCard } from "@/ui/radio";
import {
  CardGroup,
  HiddenCanvas,
  ImageViewer,
  NewCardGroup,
  ResultsWrapper,
  ScanButton,
  ScanDetail,
  ScanResults,
  SpecialGroup,
} from "./components";
import {
  address_fields_I,
  address_fields_II,
  assured_contact,
  assured_name,
  auto_fields_I,
  auto_fields_II,
  auto_fields_III,
  auto_fields_IV,
  auto_fields_V,
  auto_fields_VI,
  autoFields,
  request_policy_coverage,
  request_policy_types,
  request_service_type,
  resultFields,
} from "./fields";
import {
  FastFieldGroup,
  FastFieldGroupII,
  FastFieldGroupIII,
  FastFile,
} from "@/ui/input";
import { type FieldValues, useForm as useHookForm } from "react-hook-form";
import {
  type ChangeEvent,
  type MouseEvent,
  ReactNode,
  useCallback,
} from "react";
import { useGeolocator } from "./useGeolocator";
import { Button, Input } from "@nextui-org/react";
import { useSearchParams } from "next/navigation";
import { type SubmitType, useForm } from "./useForm";
import { opts } from "@/utils/helpers";
import { cn } from "@/lib/utils";
import { useFile } from "./useFile";
import { useScanner } from "./useScanner";
import { useAuthCtx } from "@/app/ctx/auth";
import { PaperAirplaneIcon } from "@heroicons/react/24/solid";
import { ClassName, DualIcon } from "@/app/types";
import {
  ArrowDownRightIcon,
  ArrowDownTrayIcon,
  InboxArrowDownIcon,
} from "@heroicons/react/24/outline";
import { ButtSqx } from "@/ui/button/button";
import { CircleSlash2 } from "lucide-react";
import { ConfirmButton } from "@/ui/button";

export const CreateNew = () => {
  const { vxuser } = useAuthCtx();
  const { register, reset, setValue } = useHookForm<FieldValues>({
    ...assured_contact,
    ...address_fields_I,
    ...address_fields_II,
    ...auto_fields_I,
    ...auto_fields_II,
    ...auto_fields_III,
    ...auto_fields_IV,
  });
  const { getLocation } = useGeolocator();
  const searchParams = useSearchParams();
  const { setSubmitType, saveAsDraft, generateIDs } = useForm();
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

  const request_id = searchParams.get("rid");
  const ids = generateIDs(request_id);

  const handlePostalCodeChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const location = getLocation(e.target.value);
      reset({
        line_2: location?.line_2,
        city: location?.city,
        state: location?.state,
        country: "PH",
      });
    },
    [getLocation, reset],
  );

  const handleSetSubmitType = useCallback(
    (type: SubmitType) => () => {
      setSubmitType(type);
    },
    [setSubmitType],
  );

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

  const applyResults = useCallback(
    (e: MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      const filteredList = result
        ?.filter(({ type }) => resultFields.includes(type))
        .sort(
          (a, b) => resultFields.indexOf(a.type) - resultFields.indexOf(b.type),
        );

      if (!filteredList || filteredList.length === 0) {
        console.warn("No filtered List");
        return;
      }
      const values = filteredList.map(({ mentionText }) => mentionText);

      // type ResetValues = Record<(typeof autoFields)[number], string>;
      // const resetValues = autoFields.reduce<ResetValues>((acc, key, idx) => {
      //   const value = values[idx];
      //   if (value !== undefined) {
      //     // console.table({ key, value });
      //     // setValue(key, value);
      //     acc[key] = value;
      //   }
      //   return acc;
      // }, {} as ResetValues);

      autoFields.forEach((k, i) => {
        console.log(k, values[i]);
        setValue(k, values[i]);
      });
    },
    [result, setValue],
  );

  const clearAllFields = useCallback(() => {
    autoFields.forEach((k) => setValue(k, ""));
  }, [setValue]);

  const ResultOptions = useCallback(() => {
    const options = opts(
      <ScanResults entities={result} />,
      <div
        className={cn(
          "flex h-48 w-full items-center justify-center font-inst text-xs opacity-80",
          {
            "animate-pulse": loading,
          },
        )}
      >
        {loading ? "Awaiting scan results..." : "Scan Results here."}
      </div>,
    );
    return <>{options.get(!!result)}</>;
    // return <>{options.get(true)}</>;
  }, [loading, result]);

  const setVal = useCallback(
    (e: MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      setValue("plate_no", "xxxddd");
    },
    [setValue],
  );

  return (
    <div className="flex h-[calc(93vh)] w-full overflow-y-scroll border-t-[0.33px] border-primary-200/50 bg-primary-100/50 p-6 dark:bg-void">
      <form className="w-full">
        <div className="absolute -top-4 right-0 z-[250] flex h-24 items-center space-x-4 px-12">
          <ButtSqx icon={ArrowDownRightIcon} size="sm" onClick={setVal} />
          <SButton
            fn={handleSetSubmitType("save")}
            className="border border-primary-400 bg-primary-100"
          >
            <SButtonLabel label="Save as draft" />
            <ArrowDownTrayIcon className="size-4" />
          </SButton>
          <SButton
            variant="solid"
            color="primary"
            fn={handleSetSubmitType("save")}
          >
            <SButtonLabel label="Submit Request" />
          </SButton>
        </div>
        <section className="grid w-full grid-cols-6 gap-6">
          <div className="col-span-4">
            <div className="flex h-[30rem] w-full flex-col justify-center rounded-[2rem] border-2 border-secondary bg-primary-50 shadow-2xl shadow-primary-400/50 dark:border-secondary-400/80 dark:bg-primary-200 dark:shadow-secondary-500/40">
              <NewCardGroup title="Policy Type">
                <RadioGroupCard
                  name="policy_type"
                  items={request_policy_types}
                  orientation="horizontal"
                />
              </NewCardGroup>
              <div className="flex">
                <NewCardGroup title="Policy Coverage">
                  <RadioGroupCard
                    name="policy_coverage"
                    items={request_policy_coverage}
                    orientation="horizontal"
                  />
                </NewCardGroup>
                <NewCardGroup title="Service Type">
                  <RadioGroupCard
                    name="service_type"
                    items={request_service_type}
                    orientation="horizontal"
                  />
                </NewCardGroup>
              </div>

              <NewCardGroup title="Assured Basic Info">
                <FastFieldGroup
                  register={register}
                  items={assured_name}
                  group="Full name"
                />
              </NewCardGroup>
            </div>
            <div className="py-6">
              <NewCardGroup title="Assured Contact Info">
                <div className="space-y-8">
                  <FastFieldGroup
                    register={register}
                    items={assured_contact}
                    group="Contact details"
                  />
                  <FastFieldGroupII
                    register={register}
                    listOne={address_fields_I}
                    listTwo={address_fields_II}
                    changeFn={handlePostalCodeChange}
                    changeField="postal_code"
                    group="Address"
                  />
                </div>
              </NewCardGroup>
            </div>
            <div className="py-2">
              <NewCardGroup title="Motor Vehicle Info">
                <div className="space-y-8">
                  <FastFieldGroupIII
                    register={register}
                    listOne={auto_fields_I}
                    listTwo={auto_fields_II}
                    group="Registration"
                  />
                  <FastFieldGroupIII
                    register={register}
                    listOne={auto_fields_III}
                    listTwo={auto_fields_IV}
                    group="Body"
                  />
                  <FastFieldGroupIII
                    register={register}
                    listOne={auto_fields_V}
                    listTwo={auto_fields_VI}
                    group="Denomination"
                  />
                </div>
              </NewCardGroup>
            </div>
            <div className="hidden">
              <CardGroup title="Hidden Info">
                <div className="space-y-8">
                  <Input
                    label="group_code"
                    name="group_code"
                    defaultValue={vxuser?.group_code}
                  />
                  <Input
                    label="request_id"
                    name="request_id"
                    defaultValue={request_id ?? undefined}
                  />
                  <Input
                    label="address_id"
                    name="address_id"
                    defaultValue={ids?.address_id ?? undefined}
                  />
                  <Input
                    label="vehicle_id"
                    name="vehicle_id"
                    defaultValue={ids?.vehicle_id ?? undefined}
                  />
                  <Input
                    label="subject_id"
                    name="subject_id"
                    defaultValue={ids?.subject_id ?? undefined}
                  />
                </div>
              </CardGroup>
            </div>
          </div>
          <div className="col-span-2">
            <SpecialGroup
              title="Document Scanner"
              subtext="This feature is currently unavailable."
            >
              <ViewOptions />
              <div className="flex items-center justify-between px-2">
                <ScanDetail
                  format={format}
                  size={size}
                  elapsed={elapsed}
                  ents={result?.length}
                />
                <ScanButton
                  loading={loading}
                  imageData={imageData}
                  result={result !== null}
                  onPress={handleScanDocument(rawDocument)}
                />
              </div>
              <ResultsWrapper
                withResult={result !== null}
                applyFn={applyResults}
              >
                <ResultOptions />
                <HiddenCanvas />
              </ResultsWrapper>
            </SpecialGroup>
          </div>
        </section>
        <div className="flex h-28 w-full items-center p-8">
          <ConfirmButton
            label="clear all fields"
            icon={CircleSlash2}
            confirmFn={clearAllFields}
          />
        </div>
      </form>
    </div>
  );
};

interface SButtonProps {
  fn: (e: MouseEvent<HTMLButtonElement>) => void;
  variant?: "flat" | "solid";
  color?: "primary" | "secondary" | "warning";
  children?: ReactNode;
  className?: ClassName;
}
const SButton = ({ fn, variant, color, children, className }: SButtonProps) => (
  <Button
    size="sm"
    radius="sm"
    variant={variant}
    color={color}
    className={cn("w-fit", className)}
    onMouseEnter={fn}
    type="submit"
  >
    {children}
  </Button>
);

const SButtonLabel = (props: { label: string }) => (
  <p className="font-inter font-medium tracking-tight">{props.label}</p>
);
