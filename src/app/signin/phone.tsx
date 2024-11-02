import { Badge, Button, Input } from "@nextui-org/react";
import { type ChangeEvent, memo, useCallback, useMemo, useState } from "react";
import { DevicePhoneMobileIcon } from "@heroicons/react/24/outline";
import { cn } from "@/lib/utils";

export const PhoneSigninForm = () => {
  // const [selected, setSelected] = useState("login");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isValidPhone, setIsValidPhone] = useState(false);

  const validatePhone = useCallback((value: string) => {
    const isValid = value.length === 10 && value.startsWith("9");
    setIsValidPhone(isValid);
    return isValid ? isValid : undefined;
  }, []);

  const handlePhoneChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      let input = e.target.value.replace(/\D/g, "");

      if (input.startsWith("0")) {
        input = input.substring(1);
      }

      input = input.slice(0, 10);

      if (input.length > 0) {
        input = "9" + input.slice(1);
      }
      validatePhone(e.target.value);

      setPhoneNumber(input);
    },
    [validatePhone],
  );

  // const onSelect = useCallback((key: Key) => setSelected(key as string), []);

  // const handlePressEnter = useCallback(
  //   (e: KeyboardEvent) => {
  //     if (e.key === "Enter" && !e.shiftKey) {
  //       e.preventDefault();
  //       if (isValidPhone) {
  //         setPhoneNumber("");
  //       }
  //     }
  //   },
  //   [isValidPhone],
  // );

  const ValidPhone = useMemo(
    () =>
      isValidPhone ? (
        <Badge
          size="sm"
          content=""
          shape="circle"
          showOutline={false}
          placement="bottom-right"
          color={isValidPhone ? "success" : "warning"}
        >
          <DevicePhoneMobileIcon className="size-5 animate-enter text-primary" />
        </Badge>
      ) : (
        <div className="size-4" />
      ),
    [isValidPhone],
  );
  return (
    <form className="flex w-full flex-col gap-2 gap-y-4 space-y-6 py-2 xl:gap-6">
      <div className="h-fit w-full space-y-6 md:space-y-4">
        <div className="px-4 font-inst text-sm">Type your phone number</div>
        <Input
          className={cn("font-mono font-medium", {
            "opacity-100": phoneNumber !== "",
          })}
          classNames={{
            mainWrapper: "px-4",
            inputWrapper: "shadow-none w-full px-0 py-0",
            innerWrapper:
              "dark:bg-background/40 bg-foreground/15 shadow-none px-4 border-[0.33px border-slate-100 h-16 sm:h-12 rounded-lg",
            input: cn(
              "leading-none py-2 font-normal bg-foreground text-sm",
              {},
            ),
          }}
          startContent={
            <p
              className={cn(
                "mr-2 text-lg font-medium leading-none text-foreground",
                {
                  "opacity-100": phoneNumber !== "",
                },
              )}
            >
              +63
            </p>
          }
          size="lg"
          radius="md"
          placeholder="9..."
          type="phone"
          value={phoneNumber}
          onChange={handlePhoneChange}
          endContent={ValidPhone}
        />
      </div>
      <div className="space-y-4 px-5 text-sm">
        <Button
          type="submit"
          color="primary"
          isLoading={false}
          disabled={!isValidPhone}
          className="flex h-14 w-full items-center space-x-4 rounded-md sm:h-12"
        >
          <div>Sign in with phone</div>
          <DevicePhoneMobileIcon className="mx-2 size-5 shrink-0" />
        </Button>
      </div>
    </form>
  );
};

export const WithPhoneForm = memo(PhoneSigninForm);
