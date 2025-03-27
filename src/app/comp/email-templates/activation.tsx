import type { FC } from "react";

interface EmailTemplateProps {
  code: string | undefined;
}

export const ActivationEmail: FC<EmailTemplateProps> = async ({
  code,
}) => (
  <div>
    <div className="px-3 py-1 border border-primary rounded-xl">
      <h1 className="uppercase font-mono font-light tracking-widest">{code}</h1>
    </div>
  </div>
);
