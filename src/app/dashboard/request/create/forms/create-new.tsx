"use client";

import { cn } from "@/lib/utils";
import { ConfirmButton } from "@/ui/button";
import { ButtSex } from "@/ui/button/index";
import { FlexRow } from "@/ui/flex";
import {
  FastField,
  FastFieldGroup,
  FastFieldGroupII,
  FastFieldGroupIII,
  FastFile,
} from "@/ui/input";
import { RadioGroupCard } from "@/ui/radio";
import type { HyperSelectOption } from "@/ui/select";
import { opts } from "@/utils/helpers";
import { ArrowDownOnSquareIcon } from "@heroicons/react/24/outline";
import { PaperAirplaneIcon } from "@heroicons/react/24/solid";
import {
  Image,
  Select,
  type SelectedItems,
  SelectItem,
} from "@nextui-org/react";
import { CircleSlash2 } from "lucide-react";
import { useSearchParams } from "next/navigation";
import {
  type ChangeEvent,
  type MouseEvent,
  type ReactNode,
  use,
  useActionState,
  useCallback,
  useEffect,
  useMemo,
} from "react";
import {
  type FieldValues,
  type UseFormRegister,
  type UseFormSetValue,
  useForm as useHookForm,
} from "react-hook-form";
import { CreateRequestCtx } from "../ctx";
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
  hidden_fields,
  request_policy_coverage,
  request_policy_types,
  request_service_type,
  resultFields,
} from "./fields";
import { useFile } from "@request/hooks/useFile";
import { type SubmitType, useForm } from "@request/hooks/useForm";
import { useGeolocator } from "@request/hooks/useGeolocator";
import { useScanner } from "@request/hooks/useScanner";
import { type ButtonProps } from "@/ui/button/ripple";

const defaultValues = {
  ...assured_contact,
  ...address_fields_I,
  ...address_fields_II,
  ...auto_fields_I,
  ...auto_fields_II,
  ...auto_fields_III,
  ...auto_fields_IV,
};
export type InsertValues = typeof defaultValues;
export const CreateNew = () => {
  const searchParams = useSearchParams();
  const request_id = searchParams.get("rid");

  const { register, setValue } = useHookForm<FieldValues>(defaultValues);
  const { getLocation } = useGeolocator();
  const { handleScanDocument, loading, result, elapsed } = useScanner();
  const {
    imageData,
    clearFile,
    inputRef,
    handleFileChange,
    rawDocument,
    selectedFile,
    format,
    size,
  } = useFile();

  const { submitAction, submitType, setSubmitType } = useForm(selectedFile);
  const [_, actionFn, pending] = useActionState(submitAction, {});

  const handlePostalCodeChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const location = getLocation(e.target.value);
      if (location) Object.entries(location).map(([k, v]) => setValue(k, v));
      setValue("country", "PH");
    },
    [getLocation, setValue],
  );

  const handleSetSubmitType = useCallback(
    (type: SubmitType) => () => {
      console.log(submitType);
      setSubmitType(type);
    },
    [setSubmitType, submitType],
  );

  const applyResults = useCallback(
    (e: MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      const filteredList = result
        ?.filter(({ type }) => resultFields.includes(type))
        .sort(
          (a, b) => resultFields.indexOf(a.type) - resultFields.indexOf(b.type),
        );

      if (!filteredList || filteredList.length === 0) {
        return;
      }
      const values = filteredList.map(({ mentionText }) => mentionText);

      autoFields.forEach((k, i) => {
        setValue(k, values[i]);
      });
    },
    [result, setValue],
  );

  const clearAllFields = useCallback(() => {
    autoFields.forEach((k) => setValue(k, ""));
  }, [setValue]);

  const ViewOptions = useCallback(() => {
    const withImage = typeof imageData !== "undefined";
    const options = opts(
      <ImageViewer imageData={imageData} clearFile={clearFile} />,
      <FastFile
        ref={inputRef}
        onChange={handleFileChange}
        className="-mt-[1px] h-96"
      />,
    );
    return <>{options.get(withImage)}</>;
  }, [clearFile, imageData, handleFileChange, inputRef]);

  const ResultOptions = useCallback(() => {
    const options = opts(
      <ScanResults entities={result} />,
      <div
        className={cn(
          "flex h-96 w-full items-center justify-center bg-primary-100/20 font-inst text-xs opacity-80",
          {
            "animate-pulse": loading,
          },
        )}
      >
        {loading ? "Awaiting scan results..." : "Scan Results here."}
      </div>,
    );
    return <>{options.get(!!result)}</>;
  }, [loading, result]);

  const saveDisabled = useMemo(() => submitType === "save", [submitType]);
  const submitDisabled = useMemo(() => submitType === "submit", [submitType]);

  return (
    <main className="flex h-[calc(93vh)] w-full overflow-y-scroll border-t-[0.33px] border-primary-200/50 bg-chalk p-6 dark:bg-void">
      <form action={actionFn} className="w-full">
        <FlexRow className="absolute -top-4 right-0 z-[250] h-24 w-fit items-center space-x-6 xl:space-x-36">
          <UnderwriterSelect />
          <section className="flex items-center space-x-4 px-10">
            <SButton
              fn={handleSetSubmitType("save")}
              end={ArrowDownOnSquareIcon}
              loading={pending && saveDisabled}
              disabled={saveDisabled}
            >
              <SButtonLabel
                label={pending ? "Saving data...." : "Save as draft"}
              />
            </SButton>
            <SButton
              inverted
              fn={handleSetSubmitType("submit")}
              end={PaperAirplaneIcon}
              disabled={submitDisabled}
              loading={pending && submitDisabled}
            >
              <SButtonLabel
                label={
                  pending && submitDisabled
                    ? "Submitting...."
                    : "Submit Request"
                }
              />
            </SButton>
          </section>
        </FlexRow>
        <section className="grid w-full grid-cols-6 gap-6 bg-background">
          <div className="col-span-4">
            <div className="flex h-[30rem] w-full flex-col justify-center rounded-[2rem] border-2 border-secondary bg-primary-50 pb-4 shadow-2xl shadow-primary-400/50 dark:border-secondary-400/80 dark:bg-primary-200 dark:shadow-secondary-500/40">
              <div className="flex w-full overflow-x-scroll">
                <NewCardGroup title="Policy Type">
                  <RadioGroupCard
                    name="policy_type"
                    items={request_policy_types}
                    orientation="horizontal"
                  />
                </NewCardGroup>
              </div>
              <div className="flex w-full overflow-x-scroll">
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
            <div className="py-8">
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
                    description="( weight unit in kilograms )"
                  />
                </div>
              </NewCardGroup>
            </div>
            <HiddenInputGroup
              request_id={request_id}
              register={register}
              setValue={setValue}
            />
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
        <div className="flex h-20 w-full items-center p-8">
          <ConfirmButton
            label="clear all fields"
            icon={CircleSlash2}
            confirmFn={clearAllFields}
          />
        </div>
        <div className="h-24" />
      </form>
    </main>
  );
};

const HiddenInputGroup = (props: {
  request_id: string | null;
  setValue: UseFormSetValue<FieldValues>;
  register: UseFormRegister<FieldValues>;
}) => {
  const { request_id, setValue, register } = props;
  const { ids, generateIDs } = use(CreateRequestCtx)!;
  useEffect(() => {
    if (request_id) generateIDs(request_id);
  }, [generateIDs, request_id]);

  const setValues = useCallback(() => {
    if (ids) {
      Object.entries(ids).map(([k, v]) => setValue(k, v));
    }
  }, [setValue, ids]);

  useEffect(() => {
    setValues();
  }, [setValues]);

  return (
    <div className="hidden">
      <CardGroup title="Hidden Info">
        <div className="space-y-8">
          {hidden_fields.map((field) => (
            <FastField
              key={field.name}
              {...register(field.name, {
                required: field.required,
              })}
            />
          ))}
        </div>
      </CardGroup>
    </div>
  );
};

interface SButtonProps extends ButtonProps {
  fn: (e: MouseEvent<HTMLButtonElement>) => void;
  children?: ReactNode;
}
const SButton = ({ fn, children, inverted }: SButtonProps) => (
  <ButtSex inverted={inverted} size="sm" type="submit" onMouseEnter={fn}>
    {children}
  </ButtSex>
);

const SButtonLabel = (props: { label: string }) => (
  <p className="font-inter font-medium tracking-tight">{props.label}</p>
);

const UnderwriterSelect = () => {
  const { pending, underwriters, underwriter_id, onUnderwriterSelect } =
    use(CreateRequestCtx)!;

  return (
    <Select
      size="sm"
      variant="flat"
      color="primary"
      isLoading={pending}
      aria-label="underwriters"
      items={underwriters ?? []}
      defaultSelectedKeys={[underwriters?.[0]?.id ?? ""]}
      placeholder="Select underwriter"
      className="z-[200] w-[16rem] rounded-lg border-[0.33px] border-steel bg-goddess placeholder:text-xs placeholder:tracking-tight dark:bg-transparent"
      selectedKeys={[underwriter_id]}
      onChange={onUnderwriterSelect}
      renderValue={(options: SelectedItems<HyperSelectOption>) =>
        options.map((option) => (
          <FlexRow key={option.data?.id} className="items-center capitalize">
            <section className="flex items-center space-x-1">
              <div
                className={cn(
                  "flex size-5 items-center justify-center rounded-full border-[0.33px] border-indigo-500 bg-chalk uppercase text-indigo-500 shadow-inner drop-shadow-sm",
                )}
              >
                <span className="text-sm font-extrabold capitalize">u</span>
              </div>
              <Image
                isBlurred
                className="size-5"
                alt={`avatar-of-${option.data?.value}`}
                src={option.data?.photo_url}
              />
            </section>
            <span className={cn("truncate font-inst font-medium")}>
              {option.data?.value}
            </span>
          </FlexRow>
        ))
      }
    >
      {(
        option, // SELECTED ITEM
      ) => (
        <SelectItem
          key={option.id}
          textValue={option.value}
          className="group bg-adam placeholder:text-xs data-[hover=true]:bg-steel/10 data-[selected=true]:bg-steel/50 dark:bg-transparent"
          classNames={{
            wrapper: "",
            base: "py-2 data-[focus=false]:text-steel data-[selected=true]:bg-steel data-[open=true]:bg-steel ",
          }}
        >
          <FlexRow className="items-center capitalize">
            <div
              className={cn(
                "flex size-5 items-center justify-center space-x-4 rounded-full bg-indigo-400/20 uppercase text-indigo-500 drop-shadow-sm",
              )}
            >
              <span className="text-xs font-bold capitalize">u</span>
            </div>
            <Image
              isBlurred
              className="size-5"
              alt={`avatar-of-${option.value}`}
              src={option.photo_url}
            />
            <span
              className={cn(
                "truncate font-inst font-medium text-icon-dark data-[focus=false]:text-void",
              )}
            >
              {option.value}
            </span>
          </FlexRow>
        </SelectItem>
      )}
    </Select>
  );
};
