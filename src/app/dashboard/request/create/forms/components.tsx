import { type DualIcon } from "@/app/types";
import { type SpecialEntity } from "@/lib/docai/resource";
import { cn } from "@/lib/utils";
import { InputFieldName } from "@/ui/input";
import { ArrowUturnLeftIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { Button, Image } from "@nextui-org/react";
import { FileSymlinkIcon, ScanIcon, ScanTextIcon } from "lucide-react";
import type { MouseEvent, PropsWithChildren, ReactNode } from "react";

export const Wrapper = ({ children }: PropsWithChildren) => (
  <div
    className={cn(
      "mt-1.5 h-[calc(92vh)]",
      "overflow-scroll rounded-xl border-[0.33px] border-primary-400",
      "bg-chalk",
      "dark:bg-primary/10",
      "pb-44",
    )}
  >
    {children}
  </div>
);

const FormTitle = (props: { title?: string }) => (
  <div className="flex min-w-28 items-center justify-between space-x-4 whitespace-nowrap">
    <p className="font-arc font-semibold tracking-tight text-foreground">
      {props.title}
    </p>
  </div>
);

interface FormHeaderProps {
  isLoading: boolean;
  isValid: boolean;
  children?: ReactNode;
  title?: string;
  icon?: DualIcon;
}
export const FormHeader = (props: FormHeaderProps) => {
  return (
    <div className="flex w-full items-center gap-2 border-b-[0.33px] border-primary-500 bg-primary-600/30 px-4 py-3.5 backdrop-blur-xl">
      <FileSymlinkIcon className="size-4 stroke-[2px]" />
      <FormTitle title={props.title} />
      {props.children}
    </div>
  );
};

interface RowProps {
  children: ReactNode;
  title: string;
  description?: string;
}

export const Row = ({ children }: RowProps) => (
  <section className="flex w-full px-4">
    <div className="md:w-[calc(50vw-200px)]">{children}</div>
  </section>
);

interface CardGroup {
  children: ReactNode;
  title: string;
  subtext?: string;
}

export const CardGroup = ({ children, title }: CardGroup) => (
  <div className="w-full space-y-4 border-b-[0.33px] border-primary-300 bg-primary-100/50 px-4 py-8 backdrop-blur-xl dark:bg-primary-100/40">
    <p className="font-inter font-medium tracking-tighter">{title}</p>
    {children}
  </div>
);
export const NewCardGroup = ({ children, title }: CardGroup) => (
  <div className="w-full space-y-2 rounded-lg p-6">
    <p className="font-inter font-medium tracking-tighter dark:text-icon-dark">
      {title}
    </p>
    {children}
  </div>
);

export const SpecialGroup = ({ children, title, subtext }: CardGroup) => (
  <div className="col-span-2 h-full w-full space-y-[22px] px-4 py-6 drop-shadow-sm backdrop-blur-xl">
    <header className="flex items-start gap-3">
      <ScanTextIcon className="size-6 stroke-1" />
      <section className="space-y-1 leading-none">
        <p className="font-inter font-medium tracking-tight">{title}</p>
        <p className="font-arc text-xs font-normal tracking-wide text-primary-600">
          {subtext}
        </p>
      </section>
    </header>
    {children}
  </div>
);

interface ImageViewerProps {
  imageData: string | undefined;
  clearFile: VoidFunction;
}
export const ImageViewer = ({ imageData, clearFile }: ImageViewerProps) => (
  <div className="-mt-[1px] h-[22.4rem] w-full overflow-hidden rounded-lg border-[0.33px] border-primary-300 bg-primary-50 dark:border-primary-400">
    <div className="group relative flex size-full cursor-pointer items-center overflow-hidden rounded-md">
      <Image
        src={imageData}
        alt="file-to-scan"
        className="relative top-0 rounded-md scale-90"
      />
      <Button
        isIconOnly
        size="sm"
        color="primary"
        variant={`solid`}
        onPress={clearFile}
        className="absolute right-1 top-1 z-50 hidden size-6 items-center rounded-full border group-hover:flex"
      >
        <XMarkIcon className={"size-4 text-background"} />
      </Button>
    </div>
  </div>
);

export const HSeparator = () => (
  <div
    className={cn(
      "my-16 -ml-6 flex h-[0.33px] w-full",
      "bg-gradient-to-r from-primary-400 via-primary-300/50 to-transparent",
      "rounded-full",
    )}
  />
);

export const HiddenCanvas = () => (
  <div className="hidden space-y-4 p-4">
    <canvas id="grayscale-canvas" className="h-auto w-full" />
  </div>
);

interface ScanResultsProps {
  entities: SpecialEntity[] | null;
}
export const ScanResults = ({ entities }: ScanResultsProps) => {
  return (
    <div className="relative z-[40]">
      {entities?.map((entity, index) => (
        <InputFieldName
          key={index}
          index={index}
          icon={ScanIcon}
          className="w-full"
          label={entity.type}
          defaultValue={entity.mentionText}
          type="text"
        />
      ))}
      <div className="h-20 w-full" />
    </div>
  );
};

interface ScanDetailProps {
  elapsed: number;
  format: string | undefined;
  size: number | undefined;
  ents: number | undefined;
}
export const ScanDetail = ({
  elapsed,
  ents,
  format,
  size,
}: ScanDetailProps) => (
  <div className="border-[0.33px]a grid h-12 w-full grid-cols-4 border-primary/20 px-2 text-xs font-light">
    <DetailItem value={size ? `${size?.toFixed(2)}mb` : null} label={"size"} />
    <DetailItem value={format} label={"format"} />
    <DetailItem value={elapsed ? `${elapsed}s` : null} label={"elapsed"} />
    <DetailItem value={ents ? `${ents}` : null} label={"items"} />
  </div>
);

const DetailItem = (props: {
  value: string | number | null | undefined;
  label?: string;
}) => (
  <div
    className={cn(
      "flex items-center justify-start border-primary-300",
      "font-jet",
    )}
  >
    {props.value ? (
      <div className="animate-enter space-y-1.5 leading-none">
        <p className="font-medium">{props.value}</p>
        <p className="text-[10px] font-light tracking-tight">{props.label}</p>
      </div>
    ) : null}
  </div>
);

interface ScanButtonProps {
  loading: boolean;
  imageData: string | undefined;
  result: boolean;
  onPress: VoidFunction;
}
export const ScanButton = ({
  imageData,
  loading,
  result,
  onPress,
}: ScanButtonProps) => (
  <div className="pl-2">
    <Button
      size="md"
      radius="sm"
      color="primary"
      isLoading={loading}
      disabled={!imageData || result}
      variant={imageData ? "solid" : "flat"}
      className={cn("w-36 font-inter font-medium tracking-tight", {
        "cursor-not-allowed bg-primary-100 text-primary-400":
          loading || !imageData || result,
      })}
      onPress={onPress}
    >
      {loading ? "Scanning..." : "Scan document"}
    </Button>
  </div>
);

interface ResultsWrapperProps {
  children: ReactNode;
  withResult: boolean;
  applyFn: (e: MouseEvent<HTMLButtonElement>) => void;
}
export const ResultsWrapper = ({
  children,
  withResult,
  applyFn,
}: ResultsWrapperProps) => (
  <div className="relative">
    <div
      className={cn(
        "absolute bottom-0 z-[50] hidden h-20 w-full items-center justify-end px-4",
        {
          flex: withResult,
        },
      )}
    >
      {/* <div className="relative bottom-0 right-0 flex h-20 items-center justify-end px-4"> */}
      <Button
        variant="solid"
        size="md"
        radius="sm"
        color="primary"
        className="relative z-[60] font-medium tracking-tight"
        onClick={applyFn}
      >
        <ArrowUturnLeftIcon className="size-4" />
        Apply Scan Results
      </Button>
      {/* </div> */}
    </div>
    <div
      className={cn(
        "h-48 w-full overflow-scroll rounded-lg border-[0.33px] border-primary-200 bg-background font-medium",
        { "relative h-[100vh]": withResult },
      )}
    >
      {children}
    </div>
  </div>
);

export const exampleResult: SpecialEntity[] = [
  {
    type: "orDate",
    mentionText: "08/08/2013",
    confidence: 1,
  },
  {
    type: "fieldOffice",
    mentionText: "Novaliches District Office",
    confidence: 1,
  },
  {
    type: "encumberedTo",
    mentionText: "Porta",
    confidence: 1,
  },
  {
    type: "chassisNo",
    mentionText: "MNB.JXXARJJCY39718",
    confidence: 1,
  },
  {
    type: "cylinders",
    mentionText: "4",
    confidence: 1,
  },
  {
    type: "plateNo",
    mentionText: "WXO117",
    confidence: 1,
  },
  {
    type: "shippingWt",
    mentionText: "1050",
    confidence: 1,
  },
  {
    type: "agency",
    mentionText: "DEPARTMENT OF TRANSPORTATION\nLAND TRANSPORTATION OFFICE",
    confidence: 1,
  },
  {
    type: "contactDetails",
    mentionText: "000-000-000-000",
    confidence: 1,
  },
  {
    type: "grossWt",
    mentionText: "1495",
    confidence: 1,
  },
  {
    type: "crDate",
    mentionText: "05/20/2021",
    confidence: 1,
  },
  {
    type: "mvFileNo",
    mentionText: "1364-00000126768",
    confidence: 1,
  },
  {
    type: "denomination",
    mentionText: "CAR LIGHT",
    confidence: 1,
  },
  {
    type: "firstReg",
    mentionText: "000201344548086",
    confidence: 1,
  },
  {
    type: "bodyType",
    mentionText: "HATCHBACK",
    confidence: 1,
  },
  {
    type: "amt",
    mentionText: "5,897.18",
    confidence: 1,
  },
  {
    type: "fuel",
    mentionText: "GAS",
    confidence: 1,
  },
  {
    type: "series",
    mentionText: "FIESTA 5 DR MID",
    confidence: 1,
  },
  {
    type: "netCapacity",
    mentionText: "445",
    confidence: 1,
  },
  {
    type: "address",
    mentionText:
      "b7L9 SUNFLOWERS Province) ST CAPITOL PRK HMSY KALOOKAN CITY NCR THIRD DISTRICT NATIONAL CAPITAL",
    confidence: 1,
  },
  {
    type: "pistonDisplacement",
    mentionText: "ORTA 1400",
    confidence: 1,
  },
  {
    type: "netWt",
    mentionText: "1050",
    confidence: 1,
  },
  {
    type: "engineNo",
    mentionText: "M6JBCY39718*",
    confidence: 1,
  },
  {
    type: "country",
    mentionText: "Republic of the Philippines",
    confidence: 1,
  },
  {
    type: "ownersName",
    mentionText: "MARLON JOAKIM R TABLIZO",
    confidence: 1,
  },
  {
    type: "crNo",
    mentionText: "392552311",
    confidence: 1,
  },
  {
    type: "documentType",
    mentionText: "CERTIFICATE OF REGISTRATION",
    confidence: 1,
  },
  {
    type: "make",
    mentionText: "Ford",
    confidence: 1,
  },
];

export const exampleObject: Record<string, string>[] = [
  {
    orDate: "08/08/2013",
  },
  {
    country: "Republic of the Philippines",
  },
  {
    engineNo: "M6JBCY39718*",
  },
  {
    crNo: "392552311",
  },
  {
    address:
      "b7L9 SUNFLOWERS Province) ST CAPITOL PRK HMSY KALOOKAN CITY NCR THIRD DISTRICT NATIONAL CAPITAL",
  },
  {
    pistonDisplacement: "ORTA 1400",
  },
  {
    shippingWt: "1050",
  },
  {
    make: "Ford",
  },
  {
    bodyType: "HATCHBACK",
  },
  {
    firstReg: "000201344548086",
  },
  {
    chassisNo: "MNB.JXXARJJCY39718",
  },
  {
    grossWt: "1495",
  },
  {
    ownersName: "MARLON JOAKIM R TABLIZO",
  },
  {
    contactDetails: "000-000-000-000",
  },
  {
    amt: "5,897.18",
  },
  {
    documentType: "CERTIFICATE OF REGISTRATION",
  },
  {
    netCapacity: "445",
  },
  {
    cylinders: "4",
  },
  {
    denomination: "CAR LIGHT",
  },
  {
    plateNo: "WXO117",
  },
  {
    encumberedTo: "Porta",
  },
  {
    mvFileNo: "1364-00000126768",
  },
  {
    fieldOffice: "Novaliches District Office",
  },
  {
    crDate: "05/20/2021",
  },
  {
    agency: "DEPARTMENT OF TRANSPORTATION\nLAND TRANSPORTATION OFFICE",
  },
  {
    netWt: "1050",
  },
  {
    fuel: "GAS",
  },
  {
    series: "FIESTA 5 DR MID",
  },
];
