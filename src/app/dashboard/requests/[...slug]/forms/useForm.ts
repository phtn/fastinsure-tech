"use client";

import { useAuthCtx } from "@/app/ctx/auth";
import { useVex } from "@/app/ctx/convex";
import { Err, Ok } from "@/utils/helpers";
import type { InsertRequest } from "convex/requests/d";
import { useState, useCallback } from "react";
import { guid } from "@/utils/helpers";
import { useFile } from "./useFile";

export const useForm = () => {
  const { user } = useAuthCtx();
  const { request } = useVex();
  const { selectedFile } = useFile();
  const [loading, setLoading] = useState(false);

  const initializeRequest = useCallback(
    async (data: FormData) => {
      const postUrl = await request.storage.generateUrl();

      const result = (
        await fetch(postUrl, {
          method: "POST",
          body: selectedFile,
          headers: {
            "Content-Type": selectedFile?.type ?? "image/*",
          },
        })
      ).json() as Promise<{ storageId: string }>;

      const files: string[] = [(await result).storageId];

      const initialRequestData = {
        request_id: data.get("request_id"),
        agent_email: data.get("agent_email"),
        group_code: data.get("group_code"),
        policy_type: data.get("policy_type"),
        policy_coverage: data.get("policy_coverage"),
        service_type: data.get("service_type"),
        assured_firstname: data.get("assured_firstname"),
        assured_middlename: data.get("assured_middlename"),
        assured_lastname: data.get("assured_lastname"),
      } as InsertRequest;
      console.table({
        ...initialRequestData,
        assured_id: guid(),
        agent_id: user?.uid,
        files,
      });
      // request
      //   .create({ ...initialRequestData, agent_id: uid })
      //   .then(Ok(setLoading, "Request submitted!"))
      //   .catch(Err(setLoading, "Failed to submit request."));
    },
    [user?.uid, request.storage, selectedFile],
  );

  const insertRequest = useCallback(
    async (data: FormData) => {
      const validatedRequestFields = {
        request_id: data.get("request_id"),
        policy_id: data.get("policy_id"),
        policy_type: data.get("policy_type"),
        policy_coverage: data.get("policy_coverage"),
        assured_id: data.get("assured_id"),
        assured_firstname: data.get("assured_firstname"),
        assured_lastname: data.get("assured_lastname"),
        assured_middlename: data.get("assured_middlename"),
        assured_fullname: data.get("assured_fullname"),
        agent_name: data.get("agent_name"),
        agent_email: data.get("agent_email"),
        underwriter_id: data.get("underwriter_id"),
        underwriter_name: data.get("underwriter_name"),
        underwriter_email: data.get("underwriter_email"),
        amount: data.get("amount")?.valueOf(),
        duration: data.get("duration"),
        expiry_date: data.get("expiry_date"),
        updates: data.get("updates")?.toString(),
        date_delivered: data.get("date_delivered")?.valueOf(),
        remarks: data.get(""),
        metadata: data.get("")?.valueOf(),
        status: data.get("status"),
      } as InsertRequest;

      request
        .create({ ...validatedRequestFields, agent_id: user?.uid })
        .then(Ok(setLoading, "1 category added."))
        .catch(Err(setLoading, "Failed to add category."));
    },
    [user?.uid, request],
  );

  return { loading, insertRequest, initializeRequest };
};
