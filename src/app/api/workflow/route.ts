import { onError, onSuccess } from "@/app/ctx/toasts";
import { activationGet } from "@/server/rdb/caller";
import { type ActivationSet } from "@/server/rdb/schema";
import { NextResponse, type NextRequest } from "next/server";

export const POST = async (request: NextRequest) => {
  const apikey = request.headers.get("x-api-key")
  if (!apikey) {
    return new Response("Unauthorized", { status: 401 });
  }
  const { hcode } = await request.json() as { hcode: string};


  const storedValue = await activationGet({ key: `ACT•${hcode}`, path: "$" }) as ActivationSet[] | null

  if (!storedValue) {
    onError("Activation code invalid");
    return NextResponse.json(null)
  }
  onSuccess("Code verified!")
  return NextResponse.json({group_code: storedValue[0]?.value.group})

}
