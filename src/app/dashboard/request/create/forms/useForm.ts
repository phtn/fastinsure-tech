"use client";

import { useAuthCtx } from "@/app/ctx/auth";
import { useVex } from "@/app/ctx/convex";
import { Err, Ok } from "@/utils/helpers";
import type { InsertRequest } from "convex/requests/d";
import { useState, useCallback } from "react";
import { useFile } from "./useFile";
import { usePathname } from "next/navigation";
import type { SpecialEntity } from "@/lib/docai/resource";
import type { InsertSubject } from "@convex/subjects/d";
import type { InsertAuto } from "@convex/autos/d";

export type SubmitType = "save" | "submit";
export const useForm = () => {
  const { user } = useAuthCtx();
  const { request } = useVex();
  const { selectedFile } = useFile();
  const [loading, setLoading] = useState(false);
  const [submitType, setSubmitType] = useState<SubmitType>("save");
  const [parsedScanResults, setParsedScanResults] = useState<
    Record<string, string>[]
  >([]);

  const pathname = usePathname();
  const request_id = pathname.split("/")[4];

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
        policy_type: data.get("policy_type"),
        policy_coverage: data.get("policy_coverage"),
        service_type: data.get("service_type"),
        subject_id: data.get("subject_id"),
      } as InsertRequest;

      /* LOG PAYLOAD */
      console.table({
        ...initialRequestData,
        agent_id: user?.uid,
        request_id,
        files,
      });
      /* -----------  */
      // request
      //   .create({ ...initialRequestData, agent_id: uid })
      //   .then(Ok(setLoading, "Request submitted!"))
      //   .catch(Err(setLoading, "Failed to submit request."));
    },
    [user?.uid, request.storage, selectedFile, request_id],
  );

  const insertRequest = useCallback(
    async (data: FormData) => {
      const validatedRequestFields = {
        policy_id: data.get("policy_id"),
        policy_type: data.get("policy_type"),
        policy_coverage: data.get("policy_coverage"),
        subject_id: data.get("subject_id"),
        agent_name: data.get("agent_name"),
        agent_email: data.get("agent_email"),
        underwriter_id: data.get("underwriter_id"),
        underwriter_name: data.get("underwriter_name"),
        underwriter_email: data.get("underwriter_email"),
        amount: data.get("amount")?.valueOf(),
        duration: data.get("duration"),
        expiry_date: data.get("expiry_date"),
        date_delivered: data.get("date_delivered")?.valueOf(),
        remarks: data.get(""),
        metadata: data.get("")?.valueOf(),
        status: data.get("status"),
      } as InsertRequest;

      request
        .create({
          ...validatedRequestFields,
          agent_id: user?.uid,
          request_id,
        })
        .then(Ok(setLoading, "1 category added."))
        .catch(Err(setLoading, "Failed to add category."));
    },
    [user?.uid, request, request_id],
  );

  const applyScanResultsData = (scanResults: SpecialEntity[]) => {
    const parsedResults = scanResults?.map(({ type, mentionText }) => ({
      [type]: mentionText,
    }));
    setParsedScanResults(parsedResults);
  };

  const saveAsDraft = useCallback(
    (data: FormData) => {
      if (submitType === "save") {
        // console.log("save");
      } else {
        // console.log("submit");
      }

      const fullname = `${data.get("firstname") as string} ${data.get("middlename") as string} ${data.get("lastname") as string}`;

      const subjectData = {
        subject_id: data.get("subject_id"),
        firstname: data.get("firstname"),
        lastname: data.get("lastname"),
        middlename: data.get("middlename"),
        email: data.get("email"),
        phone_number: data.get("phone_number"),
        address_id: data.get("address_id"),
        fullname,
      } as InsertSubject;

      console.table(subjectData);

      const autoData = {
        vehicle_id: data.get("vehicle_id"),
        plate_no: data.get("plate_no"),
        induction_no: data.get("induction_no"),
        mvfile_no: data.get("mvfile_no"),
        cr_no: data.get("cr_no"),
        cr_date: data.get("cr_date"),
        chassis_no: data.get("chassis_no"),
        make: data.get("make"),
        model: data.get("model"),
        year: data.get("year"),
        type: data.get("type"),
        body_type: data.get("body_type"),
        denomination: data.get("denomination"),
        fuel: data.get("fuel"),
      } as InsertAuto;

      console.table(autoData);

      const requestData = {
        policy_type: data.get("policy_type"),
        policy_coverage: data.get("policy_coverage"),
        service_type: data.get("service_type"),
        request_id: data.get("request_id"),
        subject_id: data.get("subject_id"),
        vehicle_id: data.get("vehicle_id"),
        agent_id: data.get("agent_id"),
        agent_name: data.get("agent_name"),
        agent_email: data.get("agent_email"),
        group_code: data.get("group_code"),
        status: submitType === "save" ? "draft" : "submitted",
      } as InsertRequest;

      console.table(requestData);
    },
    [submitType],
  );

  const generateIDs = useCallback((rid: string | null) => {
    if (!rid) return;
    const ids = rid.split("-");
    const subject_id = ids?.[4];
    const address_id = ids?.[0];
    const vehicle_id = `${ids?.[1]}-${ids?.[2]}-${ids?.[3]}`;
    return { subject_id, address_id, vehicle_id };
  }, []);

  return {
    loading,
    insertRequest,
    initializeRequest,
    parsedScanResults,
    applyScanResultsData,
    saveAsDraft,
    setSubmitType,
    generateIDs,
  };
};
