"use server"

import { api } from "@/trpc/server";
import { asyncFn } from "../api/utils";

export const sendEmail = asyncFn(api.email.send)
