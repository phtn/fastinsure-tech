/* eslint-disable */
/**
 * Generated `api` utility.
 *
 * THIS CODE IS AUTOMATICALLY GENERATED.
 *
 * To regenerate, run `npx convex dev`.
 * @module
 */

import type {
  ApiFromModules,
  FilterApi,
  FunctionReference,
} from "convex/server";
import type * as address_create from "../address/create.js";
import type * as address_d from "../address/d.js";
import type * as address_get from "../address/get.js";
import type * as autos_create from "../autos/create.js";
import type * as autos_d from "../autos/d.js";
import type * as autos_get from "../autos/get.js";
import type * as chats_create from "../chats/create.js";
import type * as chats_d from "../chats/d.js";
import type * as chats_fn from "../chats/fn.js";
import type * as chats_get from "../chats/get.js";
import type * as files_create from "../files/create.js";
import type * as files_get from "../files/get.js";
import type * as groups_create from "../groups/create.js";
import type * as groups_d from "../groups/d.js";
import type * as http from "../http.js";
import type * as likes_d from "../likes/d.js";
import type * as logs_create from "../logs/create.js";
import type * as logs_d from "../logs/d.js";
import type * as logs_get from "../logs/get.js";
import type * as messages_d from "../messages/d.js";
import type * as messages_functions from "../messages/functions.js";
import type * as messages_get from "../messages/get.js";
import type * as notifications_create from "../notifications/create.js";
import type * as notifications_d from "../notifications/d.js";
import type * as notifications_get from "../notifications/get.js";
import type * as queries_subjects from "../queries/subjects.js";
import type * as requests_create from "../requests/create.js";
import type * as requests_d from "../requests/d.js";
import type * as requests_get from "../requests/get.js";
import type * as requests_update from "../requests/update.js";
import type * as rooms_create from "../rooms/create.js";
import type * as rooms_d from "../rooms/d.js";
import type * as subjects_create from "../subjects/create.js";
import type * as subjects_d from "../subjects/d.js";
import type * as subjects_get from "../subjects/get.js";
import type * as users_add from "../users/add.js";
import type * as users_create from "../users/create.js";
import type * as users_d from "../users/d.js";
import type * as users_get from "../users/get.js";
import type * as users_update from "../users/update.js";

/**
 * A utility for referencing Convex functions in your app's API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = api.myModule.myFunction;
 * ```
 */
declare const fullApi: ApiFromModules<{
  "address/create": typeof address_create;
  "address/d": typeof address_d;
  "address/get": typeof address_get;
  "autos/create": typeof autos_create;
  "autos/d": typeof autos_d;
  "autos/get": typeof autos_get;
  "chats/create": typeof chats_create;
  "chats/d": typeof chats_d;
  "chats/fn": typeof chats_fn;
  "chats/get": typeof chats_get;
  "files/create": typeof files_create;
  "files/get": typeof files_get;
  "groups/create": typeof groups_create;
  "groups/d": typeof groups_d;
  http: typeof http;
  "likes/d": typeof likes_d;
  "logs/create": typeof logs_create;
  "logs/d": typeof logs_d;
  "logs/get": typeof logs_get;
  "messages/d": typeof messages_d;
  "messages/functions": typeof messages_functions;
  "messages/get": typeof messages_get;
  "notifications/create": typeof notifications_create;
  "notifications/d": typeof notifications_d;
  "notifications/get": typeof notifications_get;
  "queries/subjects": typeof queries_subjects;
  "requests/create": typeof requests_create;
  "requests/d": typeof requests_d;
  "requests/get": typeof requests_get;
  "requests/update": typeof requests_update;
  "rooms/create": typeof rooms_create;
  "rooms/d": typeof rooms_d;
  "subjects/create": typeof subjects_create;
  "subjects/d": typeof subjects_d;
  "subjects/get": typeof subjects_get;
  "users/add": typeof users_add;
  "users/create": typeof users_create;
  "users/d": typeof users_d;
  "users/get": typeof users_get;
  "users/update": typeof users_update;
}>;
export declare const api: FilterApi<
  typeof fullApi,
  FunctionReference<any, "public">
>;
export declare const internal: FilterApi<
  typeof fullApi,
  FunctionReference<any, "internal">
>;
