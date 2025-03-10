"use client";

import { useAuthCtx } from "@/app/ctx/auth/auth";
import { useVex } from "@/app/ctx/convex";
import { onSuccess, onWarn } from "@/app/ctx/toasts";
import type { SpecialEntity } from "@/lib/docai/resource";
import { Err } from "@/utils/helpers";
import { type InsertAddress } from "@convex/address/d";
import type { InsertAuto } from "@convex/autos/d";
import type { InsertSubject } from "@convex/subjects/d";
import type { InsertRequest } from "convex/requests/d";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";

export type SubmitType = "save" | "submit";
//
export const useForm = (file?: File) => {
  const { vxuser } = useAuthCtx();
  const { request, address, auto, subject, logs, files } = useVex();

  const [submitType, setSubmitType] = useState<SubmitType>("save");
  const [parsedScanResults, setParsedScanResults] = useState<
    Record<string, string>[]
  >([]);

  const applyScanResultsData = (scanResults: SpecialEntity[]) => {
    const parsedResults = scanResults?.map(({ type, mentionText }) => ({
      [type]: mentionText,
    }));
    setParsedScanResults(parsedResults);
  };

  const router = useRouter();

  const createLog = useCallback(
    async (underwriter_id: string, request_id: string) => {
      if (vxuser?.uid)
        await logs
          .create({
            uid: vxuser?.uid,
            type: submitType === "save" ? "draft" : "submitted",
            email: underwriter_id,
            ip: "request",
          })
          .then(() => {
            onSuccess(
              submitType === "save"
                ? "Request data saved!"
                : "Request submitted!",
            );
            router.push(`/dashboard/request/viewer?rid=${request_id}`);
          });
    },
    [logs, submitType, vxuser?.uid, router],
  );

  const generateUploadUrl = useCallback(async (file: File) => await files.create(file), [files]);

  const submitAction = useCallback(
    async (defaultValues: object, data: FormData) => {

      const fileIds = file && await generateUploadUrl(file);

      const fullname = `${data.get("firstname") as string} ${data.get("middlename") as string} ${data.get("lastname") as string}`;

      if ((data.get("underwriter_id") as string) === "") {
        onWarn("Select underwriter");
      }

      const addressData = {
        address_id: data.get("address_id") as string,
        line_1: data.get("line_1") as string,
        line_2: data.get("line_2") as string,
        city: data.get("city") as string,
        state: data.get("state") as string,
        country: data.get("country") as string,
        postal_code: data.get("postal_code") as string,
      } as InsertAddress;

      await address.create(addressData).catch(Err);

      const subjectData = {
        subject_id: data.get("subject_id") as string,
        firstname: data.get("firstname") as string,
        lastname: data.get("lastname") as string,
        middlename: data.get("middlename") as string,
        email: data.get("email") as string,
        phone_number: data.get("phone_number") as string,
        address_id: data.get("address_id") as string,
        fullname,
      } as InsertSubject;

      await subject.create(subjectData).catch(Err);
      // console.table(subjectData);
      //
      const autoType = (data.get("type") as string).toLowerCase();
      const cr_no = (data.get("cr_no") as string).toLowerCase();
      const plate_no = (data.get("plate_no") as string).toLowerCase();
      const induction_no = (data.get("induction_no") as string).toLowerCase();

      const withVehicleNumber = plate_no !== "" || induction_no !== "";

      const vehicleData = {
        vehicle_id: (data.get("vehicle_id") as string).toLowerCase(),
        plate_no: plate_no,
        induction_no: induction_no,
        mvfile_no: (data.get("mvfile_no") as string).toLowerCase(),
        cr_no: cr_no,
        cr_date: (data.get("cr_date") as string).toLowerCase(),
        chassis_no: (data.get("chassis_no") as string).toLowerCase(),
        make: (data.get("make") as string).toLowerCase(),
        model: (data.get("model") as string).toLowerCase(),
        year: (data.get("year") as string).toLowerCase(),
        type: autoType.length === 0 ? "private" : autoType,
        body_type: (data.get("body_type") as string).toLowerCase(),
        denomination: (data.get("denomination") as string).toLowerCase(),
        fuel: (data.get("fuel") as string).toLowerCase(),
      } as InsertAuto;

      if (cr_no !== "" && withVehicleNumber) {
        await auto.create(vehicleData).catch(Err);
      }

      const requestData = {
        policy_type: data.get("policy_type") as string,
        policy_coverage: data.get("policy_coverage") as string,
        service_type: data.get("service_type") as string,
        request_id: data.get("request_id") as string,
        subject_id: data.get("subject_id") as string,
        vehicle_id: data.get("vehicle_id") as string,
        underwriter_id: data.get("underwriter_id") as string,
        underwriter_name: data.get("underwriter_name") as string,
        group_code: data.get("group_code") as string,
        assured_name: fullname,
        assured_email: data.get("email") as string,
        files: fileIds,
        agent_id: vxuser?.uid,
        agent_name: vxuser?.fullname ?? vxuser?.nickname ?? vxuser?.email,
        agent_email: vxuser?.email,
        status: submitType === "save" ? "draft" : "submitted",
      } as InsertRequest;

      await request.create(requestData).catch(Err);

      await createLog(
        data.get("underwriter_id") as string,
        data.get("request_id") as string,
      );

      return defaultValues;
    },

    [
      submitType,
      vxuser,
      address,
      auto,
      request,
      subject,
      createLog,
      generateUploadUrl,
      file
    ],
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
    parsedScanResults,
    applyScanResultsData,
    submitAction,
    setSubmitType,
    submitType,
    generateIDs,
  };
};
