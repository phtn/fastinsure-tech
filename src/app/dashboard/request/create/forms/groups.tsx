import { type ChangeEvent, memo } from "react";
import { NewCardGroup } from "./components";
import { HyperRadioCard } from "@/ui/radio";
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
  request_policy_coverage,
  request_policy_types,
  request_service_type,
} from "./fields";
import {
  FastFieldGroup,
  FastFieldGroupII,
  FastFieldGroupIII,
} from "@/ui/input";
import type { UseFormRegister, FieldValues } from "react-hook-form";

const PolicyTypes = () => (
  <div className="flex h-fit w-full overflow-x-scroll">
    <NewCardGroup title="Policy Type">
      <HyperRadioCard
        name="policy_type"
        items={request_policy_types}
        orientation="horizontal"
      />
    </NewCardGroup>
  </div>
);
export const PolicyTypeFields = memo(PolicyTypes);

const CoverageAndService = () => {
  return (
    <div className="flex w-full overflow-x-scroll">
      <NewCardGroup title="Policy Coverage">
        <HyperRadioCard
          name="policy_coverage"
          items={request_policy_coverage}
          orientation="horizontal"
        />
      </NewCardGroup>
      <NewCardGroup title="Service Type">
        <HyperRadioCard
          name="service_type"
          items={request_service_type}
          orientation="horizontal"
        />
      </NewCardGroup>
    </div>
  );
};

interface IAssuredInfo {
  register: UseFormRegister<FieldValues>;
}
const AssuredInfo = ({ register }: IAssuredInfo) => (
  <NewCardGroup title="Assured Basic Info">
    <FastFieldGroup
      register={register}
      items={assured_name}
      group="Full name"
    />
  </NewCardGroup>
);
export const AssuredInfoFields = memo(AssuredInfo);

export const CoverageAndServiceFields = memo(CoverageAndService);

interface IAssuredAddress {
  register: UseFormRegister<FieldValues>;
  changeFn: (e: ChangeEvent<HTMLInputElement>) => void;
}
const AddressFieldsSection = ({ register, changeFn }: IAssuredAddress) => (
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
          changeFn={changeFn}
          changeField="postal_code"
          group="Address"
        />
      </div>
    </NewCardGroup>
  </div>
);
export const AddressFields = memo(AddressFieldsSection);

interface IAutoFieldsSection {
  register: UseFormRegister<FieldValues>;
}

const AutoFieldsSection = ({ register }: IAutoFieldsSection) => {
  return (
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
  );
};
export const AutoFields = memo(AutoFieldsSection);
