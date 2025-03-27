import type { FC } from "react";

interface EmailTemplateProps {
  firstName: string;
}

export const ActivationEmail: FC<EmailTemplateProps> = async ({
  firstName,
}) => (
  <div>
    <h1>Welcome, {firstName}!</h1>
  </div>
);
