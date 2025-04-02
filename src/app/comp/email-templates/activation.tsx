import type { FC } from "react";
import { BRAND_NAME } from "./static";

interface EmailTemplateProps {
  text?: string | undefined;
}

export const ActivationEmail: FC<EmailTemplateProps> = async ({
  text
}) => {
  const details = text?.split("--")
  return (
    <div>
      <div style={{
        marginBottom: 32,
        marginTop: 16,
        color: "#111111"
      }}>
        <p>Here is your Activation code.</p>
      </div>
      <div>
      <div style={{
        borderRadius: 8,
        backgroundColor: "rgba(0, 155, 248, 0.1)",
        marginBottom: 24,
        padding: "18px 56px",
        width: 160
      }}>
        <h1 style={{
          letterSpacing: "4px",
        }}>{details?.[0]}</h1>
      </div>
      <span>Activate your account &rarr;</span>
      <a style={{marginLeft: 8}} href={details?.[1] ?? "#"}>here</a>
      </div>
      <div style={{marginTop: 56, marginBottom: 56, color: "#333333"}} >
        <div style={{
          display: "block"
        }}>
            <p style={{fontWeight: "bolder", lineHeight: "16px"}}>
              {BRAND_NAME.split(" ").shift()}
            </p>
            <p style={{lineHeight: "16px"}}>
              {BRAND_NAME.split(" ").pop()}
            </p>
          </div>
      </div>
    </div>


  )
};
