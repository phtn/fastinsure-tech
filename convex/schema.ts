import { defineSchema, defineTable } from "convex/server";
import { user_schema } from "./users/d";
import { request_schema } from "./requests/d";
import { auto_schema } from "./autos/d";
import { address_schema } from "./address/d";
import { subject_schema } from "./subjects/d";
import { log_schema } from "./logs/d";
import { notification_schema } from "./notifications/d";
import { chat_schema } from "./chats/d";
import { room_schema } from "./rooms/d";
import { like_schema } from "./likes/d";
import { group_schema } from "./groups/d";
import { message_schema } from "./messages/d";

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
    .index("by_group_code", [
      "group_code",
      "email",
      "nickname",
      "phone_number",
      "fullname",
      "uid",
      "account_id",
    ])
    .index("by_email", ["email", "fullname", "group_code", "uid", "account_id"])

    .index("by_role", [
      "role",
      "uid",
      "email",
      "fullname",
      "group_code",
      "phone_number",
    ]),

  groups: defineTable(group_schema)
    .index("by_group_id", ["group_id"])
    .index("by_group_code", ["group_code"])
    .index("by_sup_id", ["manager_id"]),

  address: defineTable(address_schema)
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
      "agent_id",
      "policy_id",
      "agent_name",
      "subject_id",
      "status",
      "amount",
    ])
    .index("by_underwriter_id", [
      "underwriter_id",
      "policy_id",
      "agent_name",
      "subject_id",
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
    "email",
  ]),

  logs: defineTable(log_schema).index("by_uid", [
    "uid",
    "email",
    "created_at",
    "device",
    "geolocation",
    "ip",
  ]),

  notifications: defineTable(notification_schema).index("by_receiver_id", [
    "receiver_id",
    "notif_id",
    "sender_id",
    "type",
    "title",
    "content",
    "category",
  ]),

  chats: defineTable(chat_schema)
    .index("by_chat_id", ["chat_id"])
    .index("by_creator_id", ["creator_id"])
    .index("by_participant", ["participants"]),

  messages: defineTable(message_schema)
      .index("by_chat_id", ["chat_id"])
      .index("by_author", ["author"]),

  likes: defineTable(like_schema)
    .index("by_chat_id", ["chat_id"])
    .index("by_liker_uid", ["liker_uid"]),

  rooms: defineTable(room_schema)
    .index("by_room_id", ["room_id", "room_name", "members"])
    .index("by_room_name", ["room_name", "members"]),
});
