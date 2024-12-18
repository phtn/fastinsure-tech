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
import type * as logs_create from "../logs/create.js";
import type * as logs_d from "../logs/d.js";
import type * as logs_get from "../logs/get.js";
import type * as requests_create from "../requests/create.js";
import type * as requests_d from "../requests/d.js";
import type * as requests_get from "../requests/get.js";
import type * as requests_storage from "../requests/storage.js";
import type * as subjects_create from "../subjects/create.js";
import type * as subjects_d from "../subjects/d.js";
import type * as subjects_get from "../subjects/get.js";
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
  "logs/create": typeof logs_create;
  "logs/d": typeof logs_d;
  "logs/get": typeof logs_get;
  "requests/create": typeof requests_create;
  "requests/d": typeof requests_d;
  "requests/get": typeof requests_get;
  "requests/storage": typeof requests_storage;
  "subjects/create": typeof subjects_create;
  "subjects/d": typeof subjects_d;
  "subjects/get": typeof subjects_get;
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
