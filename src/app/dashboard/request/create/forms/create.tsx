"use client";

import { FastFieldGroup, FastFieldGroupII, FastFile } from "@/ui/input";
import { RadioGroupCard } from "@/ui/radio";
import { opts } from "@/utils/helpers";
import { PaperAirplaneIcon } from "@heroicons/react/24/solid";
import { Button, Input } from "@nextui-org/react";

import { type ChangeEvent, memo, type MouseEvent, useCallback } from "react";
import {
  CardGroup,
  exampleResult,
  FormHeader,
  HiddenCanvas,
  ImageViewer,
  ResultsWrapper,
  ScanButton,
  ScanDetail,
  ScanResults,
  SpecialGroup,
  Wrapper,
} from "./components";
import { useFile } from "./useFile";
import { type SubmitType, useForm } from "./useForm";
import { useScanner } from "./useScanner";
import { cn } from "@/lib/utils";
import {
  address_fields_I,
  address_fields_II,
  assured_contact,
  assured_name,
  auto_fields_I,
  auto_fields_II,
  auto_fields_III,
  auto_fields_IV,
  autoFields,
  request_policy_coverage,
  request_policy_types,
  request_service_type,
  resultFields,
} from "./fields";
import { useSearchParams } from "next/navigation";
import { useForm as useHookForm } from "react-hook-form";
import { useGeolocator } from "./useGeolocator";

function RequestComponent() {
  const searchParams = useSearchParams();
  const request_id = searchParams.get("rid");
  const { setSubmitType, saveAsDraft, generateIDs } = useForm();
  const ids = generateIDs(request_id);
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

  const { register, reset } = useHookForm();

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

  const applyResults = useCallback(() => {
    const filteredList = exampleResult
      ?.filter(({ type }) => resultFields.includes(type))
      .sort(
        (a, b) => resultFields.indexOf(a.type) - resultFields.indexOf(b.type),
      );
    const values = filteredList.map(({ mentionText }) => mentionText);

    type ResetValues = Record<(typeof autoFields)[number], string>;
    const resetValues = autoFields.reduce<ResetValues>((acc, key, idx) => {
      const value = values[idx];
      if (value !== undefined) {
        acc[key] = value;
      }
      return acc;
    }, {} as ResetValues);
    reset(resetValues);
  }, [reset]);

  const ResultOptions = useCallback(() => {
    const options = opts(
      <ScanResults entities={exampleResult} />,
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
    // return <>{options.get(!!result)}</>;
    return <>{options.get(true)}</>;
  }, [loading]);

  const handleSetSubmitType = useCallback(
    (type: SubmitType) => () => {
      setSubmitType(type);
    },
    [setSubmitType],
  );

  const { getLocation } = useGeolocator();

  const handlePostalCodeChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const location = getLocation(e.target.value);
      console.table(location);
      reset({
        line_2: location?.line_2,
        city: location?.city,
        state: location?.state,
      });
    },
    [getLocation, reset],
  );

  return (
    <Wrapper>
      <FormHeader isLoading={false} isValid={true} title="New Request Form" />
      <form action={saveAsDraft} className="w-full">
        <CardGroup title="Policy Type">
          <RadioGroupCard
            name="policy_type"
            items={request_policy_types}
            orientation="horizontal"
          />
        </CardGroup>
        {/* <HSeparator /> */}
        <section className="grid w-full grid-cols-6">
          <div className="col-span-4 w-full">
            <div className="flex w-full items-center">
              <CardGroup title="Policy Coverage">
                <RadioGroupCard
                  name="policy_coverage"
                  items={request_policy_coverage}
                  orientation="horizontal"
                />
              </CardGroup>
              <CardGroup title="Service Type">
                <RadioGroupCard
                  name="service_type"
                  items={request_service_type}
                  orientation="horizontal"
                />
              </CardGroup>
            </div>
            <CardGroup title="Assured Info">
              <div className="space-y-8">
                <FastFieldGroup
                  register={register}
                  items={assured_name}
                  group="Full name"
                />
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
            </CardGroup>
            <CardGroup title="Vehicle Info">
              <div className="space-y-8">
                <FastFieldGroupII
                  register={register}
                  listOne={auto_fields_I}
                  listTwo={auto_fields_II}
                  group="Registration"
                />
                <FastFieldGroupII
                  register={register}
                  listOne={auto_fields_III}
                  listTwo={auto_fields_IV}
                  group="Body"
                />
              </div>
            </CardGroup>
            <div className="">
              <CardGroup title="Hidden Info">
                <div className="space-y-8">
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
          <SpecialGroup
            title="Document Scanner"
            subtext="This feature is currently unavailable."
          >
            <ViewOptions />
            <div className="flex items-center justify-between px-2">
              <ScanDetail format={format} size={size} elapsed={elapsed} />
              <ScanButton
                loading={loading}
                imageData={imageData}
                result={result !== null}
                onPress={handleScanDocument(rawDocument)}
              />
            </div>
            <ResultsWrapper
              withResult={exampleResult !== null}
              applyFn={applyResults}
            >
              <ResultOptions />
              <HiddenCanvas />
            </ResultsWrapper>
          </SpecialGroup>
        </section>
        <div className="flex h-24 items-center space-x-4 px-4">
          <SubmitButton
            fn={handleSetSubmitType("save")}
            label="Save as draft"
          />
          <Button
            size="md"
            radius="sm"
            variant="solid"
            color="primary"
            className="w-fit"
            type="submit"
            onMouseEnter={handleSetSubmitType("submit")}
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

interface SubmitButtonProps {
  label: string;
  fn: (e: MouseEvent<HTMLButtonElement>) => void;
}
const SubmitButton = ({ fn, label }: SubmitButtonProps) => (
  <Button
    size="md"
    radius="sm"
    variant="solid"
    color="primary"
    className="w-fit"
    onMouseEnter={fn}
    type="submit"
  >
    <p className="font-inter font-medium tracking-tight">{label}</p>
  </Button>
);
export const RequestForm = memo(RequestComponent);
