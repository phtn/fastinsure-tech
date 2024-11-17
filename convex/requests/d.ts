import { type Infer, v } from "convex/values";

const PolicyTypeSchema = v.union(
  v.literal("auto"),
  v.literal("personal"),
  v.literal("travel"),
  v.literal("device"),
  v.literal("health"),
  v.literal("pet"),
  v.literal("other"),
);
export type PolicyType = Infer<typeof PolicyTypeSchema>;

const PolicyCoverageSchema = v.union(
  v.literal("compulsory"),
  v.literal("comprehensive"),
  v.literal("other"),
);
export type PolicyCoverage = Infer<typeof PolicyCoverageSchema>;

const RequestStatusSchema = v.union(
  v.literal("draft"),
  v.literal("submitted"),
  v.literal("received"),
  v.literal("processing"),
  v.literal("complete"),
  v.literal("voided"),
);
export type RequestStatus = Infer<typeof RequestStatusSchema>;

export const ServiceTypeSchema = v.union(
  v.literal("new"),
  v.literal("renewal"),
);
export type ServiceType = Infer<typeof ServiceTypeSchema>;

export const request_schema = v.object({
  request_id: v.optional(v.string()),
  policy_id: v.optional(v.string()),
  policy_type: v.optional(PolicyTypeSchema),
  policy_coverage: v.optional(PolicyCoverageSchema),
  service_type: v.optional(ServiceTypeSchema),
  files: v.optional(v.array(v.string())),
  amount: v.optional(v.number()),
  duration: v.optional(v.string()),
  expiry_date: v.optional(v.string()),
  updates: v.optional(v.array(v.record(v.string(), v.float64()))),
  assured_id: v.optional(v.string()),
  assured_fullname: v.optional(v.string()),
  assured_firstname: v.optional(v.string()),
  assured_lastname: v.optional(v.string()),
  assured_middlename: v.optional(v.string()),
  assured_email: v.optional(v.string()),
  assured_phone: v.optional(v.string()),
  agent_id: v.optional(v.string()),
  agent_name: v.optional(v.string()),
  agent_email: v.optional(v.string()),
  group_code: v.optional(v.string()),
  group_name: v.optional(v.string()),
  underwriter_id: v.optional(v.string()),
  underwriter_name: v.optional(v.string()),
  underwriter_email: v.optional(v.string()),
  status: v.optional(RequestStatusSchema),
  updated_at: v.optional(v.float64()),
  date_delivered: v.optional(v.string()),
  remarks: v.optional(v.string()),
  metadata: v.optional(v.record(v.string(), v.any())),
});

export type SelectRequest = Infer<typeof request_schema>;

export const insert_request_schema = v.object({
  request_id: v.optional(v.string()),
  policy_id: v.optional(v.string()),
  policy_type: v.optional(PolicyTypeSchema),
  policy_coverage: v.optional(PolicyCoverageSchema),
  service_type: v.optional(ServiceTypeSchema),
  files: v.optional(v.array(v.string())),
  amount: v.optional(v.number()),
  duration: v.optional(v.string()),
  expiry_date: v.optional(v.string()),
  updates: v.optional(v.array(v.record(v.string(), v.float64()))),
  assured_id: v.optional(v.string()),
  assured_fullname: v.optional(v.string()),
  assured_firstname: v.optional(v.string()),
  assured_lastname: v.optional(v.string()),
  assured_middlename: v.optional(v.string()),
  assured_email: v.optional(v.string()),
  assured_phone: v.optional(v.string()),
  agent_id: v.optional(v.string()),
  agent_name: v.optional(v.string()),
  agent_email: v.optional(v.string()),
  group_code: v.optional(v.string()),
  group_name: v.optional(v.string()),
  underwriter_id: v.optional(v.string()),
  underwriter_name: v.optional(v.string()),
  underwriter_email: v.optional(v.string()),
  status: v.optional(RequestStatusSchema),
  updated_at: v.optional(v.float64()),
  date_delivered: v.optional(v.string()),
  remarks: v.optional(v.string()),
  metadata: v.optional(v.record(v.string(), v.any())),
});

export type InsertRequest = Infer<typeof insert_request_schema>;
