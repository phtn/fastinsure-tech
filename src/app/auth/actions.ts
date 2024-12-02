import { EmailAndPasswordSchema } from "../signin/schema";

export const signinStatus = async (
  p: Record<string, number> | undefined,
  f: FormData,
) => {
  const v = EmailAndPasswordSchema.safeParse({
    email: f.get("email"),
    password: f.get("password"),
  });

  if (v.success) return p;
};
