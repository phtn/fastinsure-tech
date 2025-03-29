import { onError, onWarn } from "@/app/ctx/toasts";
import { cn } from "@/lib/utils";
import { ButtSpc, ButtSqx } from "@/ui/button/button";
import { TextLoader } from "@/ui/loader";
import { pasteState } from "@/utils/helpers";
import { useToggle } from "@/utils/hooks/useToggle";
import { Button, InputOtp } from "@nextui-org/react";
import { useMutation } from "convex/react";
import { type FormEvent, useActionState, useCallback, useRef, useState } from "react";
import { api } from "@vex/api";
import { useAuthCtx } from "@/app/ctx/auth/auth";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

interface CodeEntryProps {
  activateFn: (hcode: string) => Promise<string | null>;
}
export const CodeEntry = ({ activateFn }: CodeEntryProps) => {
  const initialState = "";
  const {user} = useAuthCtx()

  const updateFn = useMutation(api.users.update.activation)
  const router = useRouter()

  const activateAccount = useCallback(
    async (prev: string | null, f: FormData) => {
      const v = {
        hcode: f.get("hcode") as string,
      };
      if (v.hcode.length !== 6) {
        onWarn("Invalid Code");
        return null
      }
      if (!user?.uid){
        onError("Unauthorized")
        return null
      }
      const group_code = await activateFn(v.hcode);

      if (!group_code){
        onError("Invalid Code")
        return null
      }

      const update = updateFn({
        uid: user.uid,
        data: {
          group_code,
        },
      });

      await toast.promise(update, {
        loading: "Activating...",
        success: "Account Activated!",
        error: "Failed to Activate Account",
      })

      router.push("/dashboard/onboard")

      return null



    },
    [activateFn, updateFn, user, router]
  );
  const [, action, pending] = useActionState(activateAccount, initialState);
  const [pasteText, setPasteText] = useState("");
  const [defaultText, setDefaultText] = useState("");
  const [isInvalid, setIsInvalid] = useState<boolean>();
  const {open, toggle} = useToggle()

  const handlePaste = useCallback(
    async (e: FormEvent<HTMLButtonElement>) => {
      e.preventDefault();
      await pasteState(setPasteText)
      if (!open){
        toggle()
      }
    },
    [toggle, open]);
  const pasteTransformer = (text: string) => text.toUpperCase().replace(/[^A-Z]/g, "");

  const otpRef = useRef<HTMLInputElement>(null)


  const handleClearEntries = useCallback(
      (e: FormEvent<HTMLButtonElement>) => {
        e.preventDefault()
        setPasteText("");
        setDefaultText("");
        setIsInvalid(false)
        toggle()
      },
      [setPasteText, toggle],
    );

  const handleInputChange = useCallback(
    (value: string) => {
      console.log(value)
      if (!open){
        toggle()
      }
      setDefaultText(value.toUpperCase());
    },
    [open, toggle],
  );

  // AEUEFB
  // AFUZDK
  // EHNFNA
  return (
    <div className={cn("z-50 h-fit w-fit space-y-8 overflow-hidden")}>
      <div className="font-inst px-4 text-3xl tracking-tighter font-extrabold text-void dark:text-chalk/80">
        When you&apos;re ready,
      </div>
      <form
        action={action}
        className="flex h-fit w-full overflow-visible relative items-start flex-col space-y-8 whitespace-nowrap pe-6"
      >
        <InputOtp
          ref={otpRef}
          id="hcode"
          length={6}
          defaultValue={defaultText}
          onValueChange={handleInputChange}
          value={pasteText !== "" ? pasteText.toUpperCase() : undefined }
          name="hcode"
          pasteTransformer={pasteTransformer}
          allowedKeys={`[A-Z]*$`}
          description={<div className="flex items-center justify-between w-[19rem]">
                <div className="w-full flex">Enter your activation code</div>
                <div className="flex items-center space-x-1"><span>or paste</span><ButtSpc onClick={handlePaste} shadow="text-macd-gray/10" icon="clipboard-outline" /></div>
              </div>}
          classNames={{
            segment: "bg-macl-gray/5 border border-macl-gray/40",
            segmentWrapper: "space-x-2",
            helperWrapper: "h-10 flex items-center",
            wrapper: "px-1",
            input: "uppercase text-blue-800"
          }}
          isRequired
          isInvalid={!!isInvalid}
        />
        <ButtSqx onClick={handleClearEntries} icon="close-circle" iconStyle="text-orange-500 drop-shadow-sm stroke-[1.5]" className={cn("size-5 absolute -top-10 right-0 hidden animate-enter", {"flex": open} )} />

        <Button
          size="lg"
          type="submit"
          className="w-72 ml-1"
        >
          <span className="text-white text-sm">{pending ? <TextLoader /> : "Activate"}</span>
        </Button>
      </form>
    </div>
  );
};
