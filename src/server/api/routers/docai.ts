import { RawDocumentSchema } from "@/lib/docai/resource";
import { proc, router } from "../trpc";
import { processDocument } from "@/lib/docai/claude";
import { asyncR } from "../utils";

const docai_proc = proc.input(RawDocumentSchema);

export const docaiRouter = router({
  send: docai_proc.mutation(asyncR(processDocument)),
});
