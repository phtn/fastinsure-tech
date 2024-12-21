import { type Infer, v } from "convex/values";

export const subject_schema = v.object({
  subject_id: v.optional(v.string()),
  address_id: v.optional(v.string()),
  firstname: v.optional(v.string()),
  fullname: v.optional(v.string()),
  lastname: v.optional(v.string()),
  nickname: v.optional(v.string()),
  middlename: v.optional(v.string()),
  email: v.optional(v.string()),
  phone_number: v.optional(v.string()),
  photo_url: v.optional(v.string()),
  file: v.optional(v.array(v.string())),
  metadata: v.optional(v.array(v.record(v.string(), v.any()))),
  updated_at: v.optional(v.float64()),
});

export type InsertSubject = Infer<typeof subject_schema>;
export type SelectSubject = Infer<typeof subject_schema>;
