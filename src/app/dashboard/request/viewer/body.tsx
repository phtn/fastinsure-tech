import { ButtSex } from "@/ui/button/ripple";
import { FlexRow } from "@/ui/flex";
import { type ReactNode, use } from "react";
import { RequestViewerCtx } from "./ctx";
import { Accordion, AccordionItem } from "@nextui-org/react";

export const ContentBody = () => {
  const { vxrequest } = use(RequestViewerCtx)!;
  return (
    <div className="flex h-[calc(93vh)] w-full overflow-y-scroll border-t-[0.33px] border-primary-200/50 bg-chalk p-6 dark:bg-void">
      <FlexRow className="absolute -top-4 right-0 z-[250] h-24 w-fit items-center space-x-6 xl:space-x-36">
        <ButtSex>
          <span className="text-[10px] font-normal">
            <span className="font-bold">underwriter Id</span>:{" "}
            {vxrequest?.request_id}
          </span>
        </ButtSex>
        <section className="flex items-center space-x-4 px-10">
          <ButtSex>{vxrequest?.status}</ButtSex>
          <ButtSex inverted>
            {vxrequest?.status === "draft" ? "Submit" : "Update"}
          </ButtSex>
        </section>
      </FlexRow>
      <div>
        <h1 className="pb-3 text-xl font-bold tracking-tight">
          Policy Request Details
        </h1>
        <Accordion defaultExpandedKeys={["request"]}>
          <DetailItem value="request">
            <RowItem label="Request ID" value={vxrequest?.request_id} />
            <RowItem label="Assured name" value={vxrequest?.assured_name} />
          </DetailItem>
        </Accordion>
      </div>
    </div>
  );
};

interface DetailItemProps {
  value: string;
  children: ReactNode;
}
const DetailItem = ({ value, children }: DetailItemProps) => {
  return (
    <AccordionItem
      key={value}
      aria-label={value}
      title={<h2 className="capitalize">{value}</h2>}
    >
      {children}
    </AccordionItem>
  );
};

interface RowItemProps {
  label: string;
  value: string | undefined;
}
const RowItem = ({ label, value }: RowItemProps) => (
  <FlexRow className="h-fit items-center">
    <span className="font-semibold opacity-60">{label}</span>
    <span>{value}</span>
  </FlexRow>
);
