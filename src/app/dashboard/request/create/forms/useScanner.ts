"use client";
import { scanDocument } from "@/lib/docai/caller";
import type { RawDocument, SpecialEntity } from "@/lib/docai/resource";
import { errHandler } from "@/utils/helpers";
import { useState } from "react";
import { exampleResult } from "./components";

export const useScanner = () => {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<SpecialEntity[] | null>(exampleResult);
  const [elapsed, setElapsed] = useState(0);
  const [startTime, setStartTime] = useState<number>(0);

  let endTime: number;
  const handleScanDocument = (rawDocument: RawDocument | null) => () => {
    if (!rawDocument) return;
    setStartTime(Date.now());
    setLoading(true);
    scanDocument(rawDocument)
      .then((response) => {
        setResult(response as SpecialEntity[]);
        endTime = Date.now();
        setElapsed((endTime - startTime) / 1000);
        setLoading(false);
      })
      .catch(errHandler(setLoading));
  };

  return { handleScanDocument, loading, result, elapsed };
};
