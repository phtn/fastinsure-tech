import { EmailAndPasswordSchema } from "./schema";

export const actionState = async (
  p: Record<string, number> | undefined,
  f: FormData,
) => {
  const v = EmailAndPasswordSchema.safeParse({
    email: f.get("email"),
    password: f.get("password"),
  });

  if (v.success) return p;
  return undefined;
};
