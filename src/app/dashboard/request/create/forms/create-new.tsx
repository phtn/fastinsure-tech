"use client";

import { cn } from "@/lib/utils";
import { ButtSex } from "@/ui/button/index";
import { type ButtonProps } from "@/ui/button/ripple";
import { FlexRow } from "@/ui/flex";
import { FastField, FastFile } from "@/ui/input";
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
import { useFile } from "@request/hooks/useFile";
import { type SubmitType, useForm } from "@request/hooks/useForm";
import { useGeolocator } from "@request/hooks/useGeolocator";
import { useScanner } from "@request/hooks/useScanner";
import { useSearchParams } from "next/navigation";
import {
  type ChangeEvent,
  memo,
  type MouseEvent,
  type ReactNode,
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
import { useCreateRequest } from "../ctx";
import {
  CardGroup,
  HiddenCanvas,
  ImageViewer,
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
  auto_fields_I,
  auto_fields_II,
  auto_fields_III,
  auto_fields_IV,
  autoFields,
  hidden_fields,
  resultFields,
} from "./fields";
import {
  AddressFields,
  AssuredInfoFields,
  AutoFields,
  CoverageAndServiceFields,
  PolicyTypeFields,
} from "./groups";
import { ConfirmButton } from "@/ui/button";
import { CircleSlash2, ScanIcon } from "lucide-react";

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
//
export const CreateNew = () => {
  const searchParams = useSearchParams();
  const request_id = searchParams.get("rid");

  const { register, setValue } = useHookForm<FieldValues>(defaultValues);
  const { getLocation } = useGeolocator();
  const { handleScanDocument, loading, result, elapsed, runningTime } = useScanner();
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
  const [, actionFn, pending] = useActionState(submitAction, {});

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
      setSubmitType(type);
    },
    [setSubmitType],
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

  const ViewOptions = useMemo(() => {
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

  const ResultOptions = useMemo(() => {
    const options = opts(
      <ScanResults entities={result} />,
      <div
        className={cn(
          "flex h-96 w-full items-center justify-center space-x-3 bg-primary-100/20 font-inst text-sm opacity-80",
          {
            "animate-pulse": loading,
          },
        )}
      >
        <ScanIcon className="size-5" />
        <span>
          {loading ? "Awaiting scan results..." : "Scan Results Area."}
        </span>
      </div>,
    );
    return <>{options.get(!!result)}</>;
  }, [loading, result]);

  const ScannerSection = useMemo(() => {
    return (
      <div className="flex items-center justify-between">
        <ScanDetail
          format={format}
          size={size}
          elapsed={runningTime ?? elapsed}
          ents={result?.length}
        />
        <ScanButton
          loading={loading}
          imageData={imageData}
          result={result !== null}
          onPress={handleScanDocument(rawDocument)}
        />
      </div>
    );
  }, [
    elapsed,
    format,
    handleScanDocument,
    imageData,
    loading,
    rawDocument,
    runningTime,
    result,
    size,
  ]);

  const HiddenFieldsGroup = useMemo(() => {
    return (
      <HiddenInputGroup
        request_id={request_id}
        register={register}
        setValue={setValue}
      />
    );
  }, [register, request_id, setValue]);

  return (
    <main className="flex h-[calc(93vh)] w-full sm:w-[calc(97vw)] overflow-scroll border justify-center border-t-[0.33px] border-primary-200/50 bg-chalk py-6 px-1 sm:p-6 dark:bg-void">
      <form action={actionFn}>
        <TopActionsPanel
          submitType={submitType}
          onHover={handleSetSubmitType}
          pending={pending}
        />
        <section className="grid h-fit w-full grid-cols-1 md:grid-cols-6 gap-y-4 gap-1 xl:gap-4">
          <div className="col-span-4">
            <div className="flex h-fit w-full flex-col justify-center rounded-2xl sm:rounded-[2rem] border-2 border-secondary bg-primary-50 pb-4 shadow-lg shadow-primary-400/50 dark:border-secondary-400/80 dark:bg-primary-200">
              <PolicyTypeFields />
              <CoverageAndServiceFields />
              <AssuredInfoFields register={register} />
            </div>
            <AddressFields
              register={register}
              changeFn={handlePostalCodeChange}
            />
            <AutoFields register={register} />
            {HiddenFieldsGroup}
          </div>
          <div className="md:col-span-2">
            <SpecialGroup
              title="Document Scanner"
              subtext="Currently optimized to scan Certificate of Registration."
            >
              <div className="space-y-12">
              {ViewOptions}
              {ScannerSection}
              <ResultsWrapper
                withResult={result !== null}
                applyFn={applyResults}
              >
                {ResultOptions}
                <HiddenCanvas />
              </ResultsWrapper>
              </div>
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
  const { ids, generateIDs } = useCreateRequest()
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

const Underwriter = () => {
  const { pending, underwriters, underwriter_id, onUnderwriterSelect } =
    useCreateRequest()

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
      className="z-[200] w-40 xl:w-16rem] rounded-lg border-[0.33px] border-steel bg-goddess placeholder:text-xs placeholder:tracking-tight dark:bg-transparent"
      selectedKeys={[underwriter_id]}
      onChange={onUnderwriterSelect}
      renderValue={(options: SelectedItems<HyperSelectOption>) =>
        options.map((option) => (
          <FlexRow key={option.data?.id} className="items-center capitalize">
            <section className="flex items-center space-x-1">
              <div
                className={cn(
                  "hidden md:flex size-5 items-center justify-center rounded-full border-[0.33px] border-indigo-500 bg-chalk uppercase text-indigo-500 shadow-inner drop-shadow-sm",
                )}
              >
                <span className="text-sm font-extrabold capitalize">u</span>
              </div>
              <Image
                isBlurred
                className="size-5 aspect-auto shrink-0"
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
                "hidden md:flex size-5 items-center justify-center space-x-2 md:space-x-4 rounded-full bg-indigo-400/20 uppercase text-indigo-500 drop-shadow-sm",
              )}
            >
              <span className="text-xs font-bold capitalize">u</span>
            </div>
            <Image
              isBlurred
              className="size-5 aspect-square flex-shrink-0"
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
export const UnderwriterSelect = memo(Underwriter);

interface ITopActionsPanel {
  onHover: (type: SubmitType) => () => void;
  submitType: "save" | "submit";
  pending: boolean;
}
const TopActionsPanelComponent = ({
  onHover,
  pending,
  submitType,
}: ITopActionsPanel) => {
  const saveDisabled = submitType === "save";
  const submitDisabled = submitType === "submit";
  return (
    <FlexRow className="absolute top-0 z-[250] sm:-left-0 md:-left-4 lg:-left-4 xl:-left-4 h-16 px-2 md:px-4 w-full justify-end flex items-center space-x-3">
      <UnderwriterSelect />
      <section className="flex items-center space-x-0.5 md:space-x-1.5">
        <SButton
          fn={onHover("save")}
          end={ArrowDownOnSquareIcon}
          loading={pending && saveDisabled}
          disabled={saveDisabled}
        >
          <SButtonLabel label={pending ? "Saving data...." : "Save"} />
        </SButton>
        <SButton
          inverted
          fn={onHover("submit")}
          end={PaperAirplaneIcon}
          disabled={submitDisabled}
          loading={pending}
        >
          <SButtonLabel label={pending ? "Submitting...." : "Submit"} />
        </SButton>
      </section>
    </FlexRow>
  );
}; //, [handleSetSubmitType, pending, submitType]);
const TopActionsPanel = memo(TopActionsPanelComponent);
