import { RawDocumentSchema } from "@/lib/docai/resource";
import { proc, router } from "../trpc";
import { processDocument } from "@/lib/docai/handlers";

const docai_proc = proc.input(RawDocumentSchema);

export const docaiRouter = router({
  send: docai_proc.mutation(async ({ input }) => {
    return await processDocument(input);
  }),
});
