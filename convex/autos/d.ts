import { type Infer, v } from "convex/values";

export const body_type_schema = v.union(
  v.literal("motorcycle"),
  v.literal("sedan"),
  v.literal("van"),
  v.literal("suv"),
  v.literal("auv"),
  v.literal("truck"),
  v.literal("bus"),
  v.literal("sidecar"),
  v.literal("trailer"),
  v.literal("hatchback"),
);

export const auto_schema = v.object({
  vehicle_id: v.string(),
  make: v.optional(v.string()),
  model: v.optional(v.string()),
  year: v.optional(v.string()),
  type: v.union(v.literal("private"), v.literal("public")),
  body_type: v.optional(body_type_schema),
  induction_no: v.optional(v.string()),
  plate_no: v.optional(v.string()),
  owner_name: v.optional(v.string()),
  mvfile_no: v.optional(v.string()),
  vin_no: v.optional(v.string()),
  cr_no: v.optional(v.string()),
  cr_date: v.optional(v.string()),
  gross_wt: v.optional(v.number()),
  net_wt: v.optional(v.number()),
  net_cap: v.optional(v.number()),
  shipping_wt: v.optional(v.number()),
  denomination: v.optional(v.string()),
  fuel: v.optional(v.string()),
  cylinders: v.optional(v.number()),
  displacement: v.optional(v.string()),
  chassis_no: v.optional(v.string()),
  metadata: v.optional(v.record(v.string(), v.any())),
  updated_at: v.optional(v.float64()),
});

export type InsertAuto = Infer<typeof auto_schema>;
export type SelectAuto = Infer<typeof auto_schema>;
