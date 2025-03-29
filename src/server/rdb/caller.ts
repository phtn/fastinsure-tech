"use server"

import { api } from "@/trpc/server";
import { asyncFn } from "../api/utils";

export const rdbExampleSet = asyncFn(api.rdb.rdbExampleSet)
export const activationSet = asyncFn(api.rdb.activationSet)
export const activationGet = asyncFn(api.rdb.activationGet)
export const activationDel = asyncFn(api.rdb.activationDel)
