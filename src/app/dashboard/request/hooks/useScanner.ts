"use client";
import { scanDocument } from "@/lib/docai/caller";
import type { RawDocument, SpecialEntity } from "@/lib/docai/resource";
import { Err } from "@/utils/helpers";
import { type FormEvent, useState } from "react";
import { exampleResult } from "../create/forms/components";

export const useScanner = () => {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<SpecialEntity[] | null>(exampleResult);
  const [elapsed, setElapsed] = useState(0);
  const [startTime, setStartTime] = useState<number>(Date.now());

  const handleScanDocument =
    (rawDocument: RawDocument | null) => (e: FormEvent<HTMLButtonElement>) => {
      e.preventDefault();
      setStartTime(Date.now());
      if (!rawDocument) return;
      setLoading(true);
      scanDocument(rawDocument)
        .then((response) => {
          setResult(response as SpecialEntity[]);
          setElapsed((Date.now() - startTime) / 1000);
          setLoading(false);
        })
        .catch(Err(setLoading));
    };

  return { handleScanDocument, loading, result, elapsed };
};
