"use client";
import { AllData } from "./table";

export const All = () => {
  return (
    <div className="h-[calc(91.5vh)] w-full items-center justify-center">
      <div className="h-full space-y-3 overflow-y-scroll bg-primary-50 pb-3">
        <AllData />
      </div>
    </div>
  );
};

const RequestItem = () => (
  <div className="h-36 rounded-lg border-[0.33px] border-primary bg-primary-50 hover:bg-warning-50/60"></div>
);
