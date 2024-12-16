import type {
  InsertRequest,
  PolicyCoverage,
  PolicyType,
  ServiceType,
} from "convex/requests/d";
import {
  CatIcon,
  CrossIcon,
  PlaneTakeoffIcon,
  RotateCcwIcon,
} from "lucide-react";
import { SparklesIcon, TruckIcon } from "@heroicons/react/24/solid";
import { DevicePhoneMobileIcon, UserIcon } from "@heroicons/react/24/outline";

import type { DualIcon } from "@/app/types";
import type { ChangeEvent, HTMLInputTypeAttribute } from "react";
import type { InsertSubject } from "convex/subjects/d";
import type { InsertAddress } from "convex/addresses/d";
import type { InsertAuto } from "@convex/autos/d";

export interface RadioFields<K, T> {
  title: K;
  icon: DualIcon;
  name: keyof T;
  description?: string;
  type: HTMLInputTypeAttribute;
  disabled?: boolean;
}

export const request_service_type: RadioFields<ServiceType, InsertRequest>[] = [
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

export const request_policy_coverage: RadioFields<
  PolicyCoverage,
  InsertRequest
>[] = [
  {
    title: "compulsory",
    icon: TruckIcon,
    name: "policy_coverage",
    type: "radio",
    description: "CTPL Coverage",
  },
  {
    title: "comprehensive",
    icon: TruckIcon,
    name: "policy_coverage",
    type: "radio",
    description: "Full Coverage",
  },
];

export const request_policy_types: RadioFields<PolicyType, InsertRequest>[] = [
  {
    title: "auto",
    icon: TruckIcon,
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
  required?: boolean;
  hidden?: boolean;
  name: keyof InsertRequest;
  onChange?: VoidFunction;
  placeholder?: string;
  hint?: string;
  type: HTMLInputTypeAttribute;
}

export interface InsertFields<T> {
  title: string;
  description?: string;
  disabled?: boolean;
  required?: boolean;
  hidden?: boolean;
  name: keyof T;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  hint?: string;
  defaultValue?: string;
  id: keyof T;
  type: HTMLInputTypeAttribute;
}

export const assured_name: InsertFields<InsertSubject>[] = [
  {
    title: "first",
    description: "Assured first given name.",
    name: "firstname",
    id: "firstname",
    placeholder: "First name",
    required: true,
    type: "text",
    // defaultValue: "first name",
  },
  {
    title: "middle",
    description: "Assured middle name.",
    name: "middlename",
    id: "middlename",
    placeholder: "Middle name",
    required: false,
    type: "text",
  },
  {
    title: "last",
    description: "Assured last given name.",
    name: "lastname",
    id: "lastname",
    placeholder: "Last name",
    required: true,
    type: "text",
    // defaultValue: "last name",
  },
];

export const assured_contact: InsertFields<InsertSubject>[] = [
  {
    title: "email",
    description: "Assured email address.",
    name: "email",
    id: "email",
    placeholder: "Email address",
    required: false,
    type: "email",
  },
  {
    title: "phone",
    description: "Assured phone number.",
    name: "phone_number",
    id: "phone_number",
    placeholder: "Phone number",
    required: false,
    type: "number",
  },
];

export const address_fields_I: InsertFields<InsertAddress>[] = [
  {
    title: "street",
    description: "Street name",
    name: "line_1",
    id: "line_1",
    placeholder: "Street",
    required: false,
    type: "text",
  },
  {
    title: "subdivision",
    description: "Subdivision",
    name: "line_2",
    id: "line_2",
    placeholder: "Subdivision",
    required: false,
    type: "text",
    defaultValue: "",
  },
];

export const address_fields_II: InsertFields<InsertAddress>[] = [
  {
    title: "city",
    description: "City",
    name: "city",
    id: "city",
    placeholder: "City",
    required: false,
    type: "text",
    defaultValue: "",
  },
  {
    title: "state",
    description: "Province or State",
    name: "state",
    id: "state",
    placeholder: "Province",
    required: false,
    type: "text",
    defaultValue: "",
  },
  {
    title: "country",
    description: "Country",
    name: "country",
    id: "country",
    placeholder: "Country",
    required: false,
    type: "text",
  },
  {
    title: "postal",
    description: "Postal code",
    name: "postal_code",
    id: "postal_code",
    placeholder: "Postal Code",
    required: false,
    type: "text",
    hint: "flash Auto locate",
    // onChange: (e: ChangeEvent<HTMLInputElement>) => {
    //   console.log(e.target.value);
    // },
  },
];

export const auto_fields_II: InsertFields<InsertAuto>[] = [
  {
    title: "plate",
    description: "Plate number",
    name: "plate_no",
    id: "plate_no",
    placeholder: "Plate number",
    required: false,
    type: "text",
  },
  {
    title: "induction",
    description: "Induction",
    name: "induction_no",
    id: "induction_no",
    placeholder: "Induction no.",
    required: false,
    type: "text",
  },
  {
    title: "vin",
    description: "VIN number",
    name: "vin_no",
    id: "vin_no",
    placeholder: "VIN number",
    required: false,
    type: "text",
  },
  {
    title: "MVFile",
    description: "MV File number",
    name: "mvfile_no",
    id: "mvfile_no",
    placeholder: "MV File number",
    required: false,
    type: "text",
  },
];

export const auto_fields_I: InsertFields<InsertAuto>[] = [
  {
    title: "CR no",
    description: "Certificate of Registration number",
    name: "cr_no",
    id: "cr_no",
    placeholder: "CR number",
    required: false,
    type: "text",
    defaultValue: "",
  },
  {
    title: "CR date",
    description: "Date Registered",
    name: "cr_date",
    id: "cr_date",
    placeholder: "CR date",
    required: false,
    type: "text",
  },
  {
    title: "Owner's name",
    description: "Registered owner of the vehicle",
    name: "owner_name",
    id: "owner_name",
    placeholder: "Owner",
    required: false,
    type: "text",
  },
];

export const auto_fields_III: InsertFields<InsertAuto>[] = [
  {
    title: "make",
    description: "Make of the vehicle",
    name: "make",
    id: "make",
    placeholder: "Make",
    required: false,
    type: "text",
  },
  {
    title: "model",
    description: "Model series of the vehicle",
    name: "model",
    id: "model",
    placeholder: "Series",
    required: false,
    type: "text",
  },
  {
    title: "year",
    description: "Year release of the vehicle",
    name: "year",
    id: "year",
    placeholder: "Year",
    required: false,
    type: "text",
  },
];

export const auto_fields_IV: InsertFields<InsertAuto>[] = [
  {
    title: "Chassis no",
    description: "Chassis of the vehicle",
    name: "chassis_no",
    id: "chassis_no",
    placeholder: "Chassis no",
    required: false,
    type: "text",
  },

  {
    title: "body",
    description: "Body type of the vehicle",
    name: "body_type",
    id: "body_type",
    placeholder: "Body type",
    required: false,
    type: "text",
  },

  {
    title: "fuel",
    description: "Fuel type of the vehicle",
    name: "fuel",
    id: "fuel",
    placeholder: "Gas",
    required: false,
    type: "text",
  },
];

export const auto_fields_V: InsertFields<InsertAuto>[] = [
  {
    title: "type",
    description: "Type of transport",
    name: "type",
    id: "type",
    placeholder: "Private or Public",
    required: false,
    type: "text",
  },

  {
    title: "denomination",
    description: "Type of denomination of the vehicle",
    name: "denomination",
    id: "denomination",
    placeholder: "Car light",
    required: false,
    type: "text",
  },
  {
    title: "No. of Cylinders",
    description: "Number of engine cylinders.",
    name: "cylinders",
    id: "cylinders",
    placeholder: "6",
    required: false,
    type: "text",
  },
  {
    title: "Piston Displacement",
    description: "Piston displacement.",
    name: "displacement",
    id: "displacement",
    placeholder: "1400",
    required: false,
    type: "text",
  },
];

export const auto_fields_VI: InsertFields<InsertAuto>[] = [
  {
    title: "Net Wt",
    description: "Vehicle's net weight in kilograms.",
    name: "net_wt",
    id: "net_wt",
    placeholder: "1000",
    required: false,
    type: "text",
  },
  {
    title: "Shipping Wt",
    description: "Vehicle's shipping weight in kilograms.",
    name: "shipping_wt",
    id: "shipping_wt",
    placeholder: "1000",
    required: false,
    type: "text",
  },
  {
    title: "Gross Wt",
    description: "Vehicle's gross weight in kilograms.",
    name: "gross_wt",
    id: "gross_wt",
    placeholder: "1000",
    required: false,
    type: "text",
  },
  {
    title: "Net Cap",
    description: "Vehicle's net capacity in kilograms.",
    name: "net_cap",
    id: "net_cap",
    placeholder: "500",
    required: false,
    type: "text",
  },
];

export const init_request_fields: RequestFields[] = [
  {
    title: "Request ID",
    description: "This field is auto-generated.",
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
    required: false,
    hidden: true,
    name: "agent_email",
    placeholder: "Agent email address",
    type: "email",
  },
  {
    title: "Group ID",
    description: "This field is auto-generated.",
    required: true,
    hidden: true,
    name: "group_code",
    placeholder: "Group ID",
    type: "text",
  },
];

export const resultFields: string[] = [
  "plateNo",
  "engineNo",
  "mvFileNo",
  "crNo",
  "crDate",
  "ownersName",
  "make",
  "series",
  "chassisNo",
  "bodyType",
  "fuel",
  "denomination",
  "pistonDisplacement",
  "cylinders",
  "netWt",
  "shippingWt",
  "grossWt",
  "netCapacity",
];
export const autoFields: (keyof InsertAuto)[] = [
  "plate_no",
  "vin_no",
  "mvfile_no",
  "cr_no",
  "cr_date",
  "owner_name",
  "make",
  "model",
  "chassis_no",
  "body_type",
  "fuel",
  "denomination",
  "displacement",
  "cylinders",
  "net_wt",
  "shipping_wt",
  "gross_wt",
  "net_cap",
] as const;
