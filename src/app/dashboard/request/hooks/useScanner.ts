"use client";
import { scanDocument } from "@/lib/docai/caller";
import type { RawDocument, SpecialEntity } from "@/lib/docai/resource";
import { Err } from "@/utils/helpers";
import { type FormEvent, useState } from "react";

export const useScanner = () => {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<SpecialEntity[] | null>(null);
  const [elapsed, setElapsed] = useState(0);

  const handleScanDocument =
    (rawDocument: RawDocument | null) => (e: FormEvent<HTMLButtonElement>) => {
      e.preventDefault();
      const startTime = Date.now();
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
