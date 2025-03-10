"use client";
import { scanDocument } from "@/lib/docai/caller";
import type { RawDocument, SpecialEntity } from "@/lib/docai/resource";
import { Err } from "@/utils/helpers";
import { type FormEvent, useState, useEffect, useRef } from "react";

export const useScanner = () => {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<SpecialEntity[] | null>(null);
  const [elapsed, setElapsed] = useState(0);
  const [runningTime, setRunningTime] = useState(0);
  const startTimeRef = useRef<number | null>(null);

  useEffect(() => {
    let intervalId: ReturnType<typeof setInterval>;

    if (loading) {
      startTimeRef.current = Date.now();
      setRunningTime(0);
      
      intervalId = setInterval(() => {
        if (startTimeRef.current) {
          setRunningTime((Date.now() - startTimeRef.current) / 1000);
        }
      }, 100);
    }

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [loading]);

  const handleScanDocument =
    (rawDocument: RawDocument | null) => async (e: FormEvent<HTMLButtonElement>) => {
      e.preventDefault();
      if (!rawDocument) return;
      
      setLoading(true);
      try {
        const response = await scanDocument(rawDocument);
        const finalElapsed = startTimeRef.current ? (Date.now() - startTimeRef.current) / 1000 : 0;
        setResult(response as SpecialEntity[]);
        setElapsed(finalElapsed);
        setLoading(false);
      } catch (error) {
        Err(setLoading)(error as Error);
      }
    };

  return { handleScanDocument, loading, result, elapsed, runningTime };
};
