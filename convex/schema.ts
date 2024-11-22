import { defineSchema, defineTable } from "convex/server";
import { user_schema } from "./users/d";
import { request_schema } from "./requests/d";
import { auto_schema } from "./autos/d";
import { address_schema } from "./addresses/d";
import { subject_schema } from "./subjects/d";

export default defineSchema({
  users: defineTable(user_schema)
    .index("by_uid", [
      "uid",
      "email",
      "account_id",
      "phone_number",
      "photo_url",
      "fast_score",
      "fullname",
      "nickname",
    ])
    .index("by_email", ["email", "fullname", "group_code", "uid", "account_id"])
    .index("by_role", [
      "role",
      "fullname",
      "group_code",
      "email",
      "phone_number",
    ]),

  addresses: defineTable(address_schema)
    .index("by_address_id", ["address_id", "city", "country"])
    .index("by_country", ["country", "city", "address_id"]),

  requests: defineTable(request_schema)
    .index("by_request_id", [
      "request_id",
      "policy_id",
      "agent_name",
      "subject_id",
      "status",
      "amount",
    ])
    .index("by_agent_id", [
      "policy_id",
      "agent_id",
      "agent_name",
      "subject_id",
      "status",
      "amount",
    ])
    .index("by_underwriter_id", [
      "policy_id",
      "agent_name",
      "subject_id",
      "underwriter_id",
      "status",
      "amount",
    ])
    .index("by_assured_name", [
      "assured_name",
      "subject_id",
      "policy_id",
      "policy_type",
      "policy_coverage",
      "vehicle_id",
    ]),

  autos: defineTable(auto_schema).index("by_vehicle_id", [
    "vehicle_id",
    "make",
    "model",
    "year",
    "body_type",
    "type",
  ]),

  subjects: defineTable(subject_schema).index("by_subject_id", [
    "subject_id",
    "firstname",
    "lastname",
    "middlename",
  ]),
});
