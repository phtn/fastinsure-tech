import { env } from "@/env";
import type { AgentCodeResponse, VerifyIdToken } from "@/server/secure/resource";
import { NextResponse } from "next/server";
import { randomBytes } from "node:crypto";


export const POST = async (req: Request) => {
  const apikey = req.headers.get('x-api-key');
  if (!apikey) return NextResponse.json({error: 'Missing API key'}, {status: 401});
  if (apikey !== env.RE_UP_SECURE_API_KEY) return NextResponse.json({error: 'Invalid API key'}, {status: 401});

  const { email, id_token, uid, group_code } = await req.json() as VerifyIdToken;

  if (!email || !id_token || !uid) return NextResponse.json({error: 'Missing email, id_token or uid'}, {status: 400});
  if (!group_code || !uid) return NextResponse.json({error: 'Missing group code or uid'}, {status: 400});

  const code = await generateRandomCode(6);
  const issuer = issuerIds()
  const idx = randIdx(issuer.length)
  const id = new TextEncoder().encode(uid).toString();
  const expiry = Date.now() + 172800000

  const genkey = (i: string) => {
    const SEP = '-';
    const iid = issuer[idx];
        const key = `/hcode?hkey=${iid}${SEP}&grp=${i}${SEP}&nonce=${idx}&sha=${btoa(id)}&exp=$${expiry}$`;
        return key;
      }
  const key = genkey(group_code);

  const base = env.NODE_ENV === 'production' ? 'https://fastinsure-tech.vercel.app' : 'http://localhost:3000';

  const url = base + key

  const data = {
    Data: {
      code: code,
      url: url,
      expiry: Date.now() + 172800000
    },
    Code: "OK",
    Status: 200
  } as AgentCodeResponse;



  return NextResponse.json(data);
};

const generateRandomCode = async (length: number) => {
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

    try {
      const code = new Uint8Array(length);
      for (let i = 0; i < length; i++) {
        const randomByte = randomBytes(1)[0]; // Get a single random byte
        if (randomByte){
          const index = randomByte % letters.length; // Map to the letters index
          code[i] = letters.charCodeAt(index);
        }
      }

      return String.fromCharCode(...code);
    }catch (error){
      console.error(error)

    }
}


const issuerIds = () => {
    const issuerId = env.RE_UP_ISSUER_ID;

    const ids: string[] = [];
    for (let i = 0; i <= issuerId.length - 16; i++) {
      ids.push(issuerId.substring(i, i + 16));
    }
    return ids
};




const randIdx = (n: number) => {
  if (n <= 0) {
    console.error("Argument must be a positive integer");
  }
  return Math.floor(Math.random() * n);
}


// class KeyGenerationError extends Data.TaggedError("KeyGenerationError")<{
//   message: string;
// }> {}

// const NEW_KEY_LENGTH = 48; // You mentioned 48 in the `RandIdx(48)`, but I am unsure how the number comes to be. It seems as though the indexes can only have a possible 31 entries.

// const newKey = (i: string) => {
//   const sep = "--";

//   return Effect.gen(function* ($) {
//     const ids = yield* $(issuerIds());
//     const idx = yield* $(randIdx(6));

//     if (idx >= 6) {
//       return yield* $(Effect.fail(new KeyGenerationError({message: "Index out of bounds"})));
//     }

//     const iid = ids[idx];
//     const key = `${iid}${sep}${i}${sep}${idx}`;

//     return key;
//   });
// };

// Example Usage
// const program = issuerIds();

// Effect.runPromise(program)
//   .then((ids) => {
//     console.log("Issuer IDs:", ids);
//   })
//   .catch((error) => {
//     console.error("Error getting issuer IDs:", error);
//   });

// Example Usage

// Effect.runPromise(program)
//   .then((code) => {
//     console.log("Generated Code:", code);
//   })
//   .catch((error) => {
//     console.error("Error generating code:", error);
//   });
