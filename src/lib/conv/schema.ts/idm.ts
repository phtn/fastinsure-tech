import { z } from "zod";
import { AccountTypeSchema } from "./user";

export const RequestStatusSchema = z.union([
  z.literal("draft"),
  z.literal("submitted"),
  z.literal("received"),
  z.literal("processing"),
  z.literal("complete"),
  z.literal("voided"),
]);

export type RequestStatus = z.infer<typeof RequestStatusSchema>;

export const AddressSchema = z.object({
  line1: z.string().or(z.undefined()),
  line2: z.string().or(z.undefined()),
  city: z.string().or(z.undefined()),
  state: z.string().or(z.undefined()),
  postalCode: z.string().or(z.undefined()),
  country: z.string().or(z.undefined()),
});

export const PlateTypeSchema = z.union([
  z.literal("plate"),
  z.literal("conduction"),
]);

export type PlateType = z.infer<typeof PlateTypeSchema>;

export const VehicleBodyTypeSchema = z.union([
  z.literal("motorcycle"),
  z.literal("sedan"),
  z.literal("van"),
  z.literal("suv"),
  z.literal("auv"),
  z.literal("truck"),
  z.literal("bus"),
  z.literal("sidecar"),
  z.literal("trailer"),
]);

export type VehicleBodyType = z.infer<typeof VehicleBodyTypeSchema>;

export const VehicleInfoSchema = z.object({
  make: z.string().or(z.undefined()),
  model: z.string().or(z.undefined()),
  year: z.string().or(z.undefined()),
  type: z.union([z.literal("public"), z.literal("private")]).or(z.undefined()),
  body: VehicleBodyTypeSchema.or(z.undefined()),
  plateType: PlateTypeSchema.or(z.undefined()),
  plateNumber: z.string().or(z.undefined()),
  conductionNumber: z.string().or(z.undefined()),
});

export type VehicleInfo = z.infer<typeof VehicleInfoSchema>;

export const PolicyTypeSchema = z.union([
  z.literal("CTPL"),
  z.literal("COMP"),
  z.literal("PAIN"),
]);
export type PolicyType = z.infer<typeof PolicyTypeSchema>;

export type Address = z.infer<typeof AddressSchema>;

export const MetadataSchema = z.record(
  z.string(),
  z
    .record(z.string())
    .or(z.number().or(z.boolean().or(z.null().or(z.undefined())))),
);

export type Metadata = z.infer<typeof MetadataSchema>;

export const IDMPolicySchema = z.object({
  id: z.string(),
  assuredName: z.string(),
  policyNumber: z.string(),
  policyType: PolicyTypeSchema,
  policyEndDate: z.string(),
  policyStartDate: z.string(),
  policyStatus: z.string(),
  premiumAmount: z.string(),
  metadata: MetadataSchema,
});
export type IDMPolicy = z.infer<typeof IDMPolicySchema>;

export const IDMAssuredSchema = z.object({
  id: z.string().or(z.undefined()),
  firstName: z.string().or(z.undefined()),
  lastName: z.string().or(z.undefined()),
  middleName: z.string().or(z.undefined()),
  email: z.string().email().or(z.undefined()),
  phone: z.string().or(z.undefined()),
  address: AddressSchema.or(z.undefined()),
  metadata: MetadataSchema.or(z.undefined()),
  policyId: z.string().or(z.undefined()),
  policyNumber: z.string().or(z.undefined()),
  policyData: IDMPolicySchema.or(z.undefined()),
});
export type IDMAssured = z.infer<typeof IDMAssuredSchema>;

export const IDMAgentSchema = z.object({
  id: z.string().or(z.undefined()),
  firstName: z.string().min(1).or(z.undefined()),
  lastName: z.string().min(1),
  middleName: z.string().or(z.undefined()),
  email: z.string().email(),
  phone: z.string(),
  address: AddressSchema,
  accountType: AccountTypeSchema,
  handle: z.string(),
  totalSubmitted: z.number().or(z.null()),
  isActive: z.boolean(),
  group: z.string(),
  parentNode: z.string().or(z.null()),
  level: z.string(),
  childNode: z.string().or(z.null()),
  joinedSince: z.string().datetime(),
  badges: z.array(z.string().or(z.null())),
  pointsGained: z.number(),
});
export type IDMAgent = z.infer<typeof IDMAgentSchema>;

export const IDMAgentBasicInfoSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string(),
  phone: z.string(),
  handle: z.string(),
});
export type IDMAgentBasicInfo = z.infer<typeof IDMAgentBasicInfoSchema>;

export const IDMUnderwriterBasicInfoSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string(),
  phone: z.string(),
  handle: z.string(),
  insuranceGroup: z.string(),
});

export const IDMAgentCreateSchema = z.object({
  id: z.string(),
  policyNumber: z.string(),
  policyType: PolicyTypeSchema,
  agentId: z.string(),
  agentName: z.string(),
  customerId: z.string(),
  customerName: z.string(),
  createdAt: z.string().datetime(),
  underwriterId: z.string(),
  underwriterName: z.string(),
  // agentData: IDMAgentBasicInfo,
  // policyData: IDMPolicyResource,
  // customerData: IDMCustomerResource,
  // underwriterData: IDMUnderwriterBasicInfo,
  // updatedAt: z.string().datetime(),
  // submittedItems: z.array(z.string()).or(z.null()),
  submittedAt: z.string().datetime(),
  submittedItemsCount: z.number().or(z.undefined()),
  status: z.string(),
  // remarks: z.string().or(z.null()),
  // metadata: Metadata,
});
export type IDMAgentCreate = z.infer<typeof IDMAgentCreateSchema>;

export const IDMRequestSchema = z.object({
  id: z.string(),
  policyType: PolicyTypeSchema,
  assuredId: z.string().or(z.undefined()),
  assuredName: z.string().or(z.undefined()),
  assuredData: IDMAssuredSchema.or(z.undefined()),
  agentId: z.string().or(z.undefined()),
  agentCode: z.string().or(z.undefined()),
  agentName: z.string().or(z.undefined()),
  branchCode: z.string().or(z.undefined()),
  underwriterId: z.string().or(z.undefined()),
  underwriterName: z.string().or(z.undefined()),
  vehicleInfo: VehicleInfoSchema.or(z.undefined()),
  files: z.array(z.string()).or(z.undefined()),
  active: z.boolean(),
  remarks: z.string().or(z.undefined()),
  updatedAt: z.string().datetime(),
  createdAt: z.string().datetime(),
  status: RequestStatusSchema,
});

export type IDMRequest = z.infer<typeof IDMRequestSchema>;

export const IDMUnderwriterCreateSchema = z.object({
  id: z.string(),
  policyNumber: z.string(),
  policyType: z.string(),
  policyData: IDMPolicySchema,
  agentId: z.string(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
  submittedAt: z.string().datetime(),
  submittedItems: z.array(z.string()).or(z.null()),
  submittedItemsCount: z.number().or(z.undefined()),
  status: z.string(),
  remarks: z.string().or(z.null()),
  metadata: MetadataSchema,
});
export type IDMUnderwriterCreate = z.infer<typeof IDMUnderwriterCreateSchema>;
