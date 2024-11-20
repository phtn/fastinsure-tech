import { defineSchema, defineTable } from "convex/server";
import { user_schema } from "./users/d";
import { request_schema } from "./requests/d";
import { auto_schema } from "./autos/d";
import { address_schema } from "./contact/d";

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
      "assured_id",
      "assured_fullname",
      "status",
      "amount",
    ])
    .index("by_agent_id", [
      "policy_id",
      "agent_id",
      "agent_name",
      "assured_id",
      "assured_fullname",
      "status",
      "amount",
    ])
    .index("by_underwriter_id", [
      "policy_id",
      "agent_name",
      "assured_id",
      "assured_fullname",
      "underwriter_id",
      "status",
      "amount",
    ]),

  autos: defineTable(auto_schema).index("by_policy_id", [
    "policy_id",
    "make",
    "model",
    "year",
    "body",
    "type",
  ]),
});
