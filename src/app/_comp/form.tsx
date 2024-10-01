"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  type EmailAndPassword,
  EmailAndPasswordSchema,
  loginFields,
} from "./schema";
import { InputForm } from "@/ui/input";
import { Button, Input, Link, Tab, Tabs } from "@nextui-org/react";
import { GoogleSignin } from "./google";
import {
  type ChangeEvent,
  type FormEvent,
  type Key,
  useCallback,
  useMemo,
  useState,
} from "react";
import {
  ArrowRightEndOnRectangleIcon,
  CheckIcon,
} from "@heroicons/react/24/outline";
import { cn } from "@/lib/utils";
import { useSignInWithEmail } from "@/lib/auth/useSignIn";

const SigninForm = () => {
  const [secure, setSecure] = useState(true);
  const toggleSecure = useCallback((e: FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setSecure((s) => !s);
  }, []);
  const form = useForm<EmailAndPassword>({
    resolver: zodResolver(EmailAndPasswordSchema),
    defaultValues: {},
  });
  const { handleSubmit, formState, register } = form;
  const { isValid, isDirty } = formState;

  const { signIn, loading, creds } = useSignInWithEmail();

  const InputField = useMemo(
    () => (
      <div className="min-w-[325px] space-y-4">
        {loginFields.map((field) => (
          <InputForm
            {...field}
            {...register(field.name)}
            valid={isValid}
            dirty={isDirty}
            loading={loading}
            fn={toggleSecure}
            key={field.name}
            type={
              field.name === "password"
                ? secure
                  ? "password"
                  : "text"
                : "text"
            }
          />
        ))}
      </div>
    ),
    [isDirty, isValid, loading, register, secure, toggleSecure],
  );

  console.log(isDirty);

  const onSubmit = async (data: EmailAndPassword) => {
    await signIn(data);
    console.log(creds);
  };

  return (
    <form
      className="flex flex-col gap-10 md:py-4"
      onSubmit={handleSubmit(onSubmit)}
    >
      {InputField}

      <div className="space-y-4 portrait:mx-3">
        <Button
          size="lg"
          fullWidth
          type="submit"
          color="primary"
          isLoading={loading}
          disabled={!isValid}
          className="flex h-14 animate-enter items-center space-x-4 rounded-[2px] text-sm delay-500"
        >
          <div>Sign in</div>
          <ArrowRightEndOnRectangleIcon className="mx-2 size-5 shrink-0 drop-shadow-lg" />
        </Button>
        <GoogleSignin />
      </div>
      <div className="flex w-full items-center justify-center space-x-3 pb-6 text-xs font-thin">
        <Link
          size="sm"
          className="animate-enter font-normal delay-700 duration-500"
        >
          Sign up
        </Link>
        <p className="text-center font-light">|</p>
        <Link
          size="sm"
          className="animate-enter font-normal delay-500 duration-400"
        >
          Account Recovery
        </Link>
      </div>
    </form>
  );
};

export const Form = () => {
  const [selected, setSelected] = useState("login");
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

  const onSelect = useCallback((key: Key) => setSelected(key as string), []);

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
        <CheckIcon className="size-6 animate-enter text-primary" />
      ) : null,
    [isValidPhone],
  );

  return (
    <div className="flex w-screen flex-col items-center md:w-full md:px-2">
      <div className="h-[calc(100vh-72px)] w-[340px] md:h-[400px] md:max-w-full">
        <div className="w-full flex flex-col items-start justify-center overflow-hidden">
          <Tabs
            size="lg"
            aria-label="Tabs form"
            selectedKey={selected}
            onSelectionChange={onSelect}
            radius="none"
            color="primary"
            variant="underlined"
            className="w-fit px-4 text-primary"
            classNames={{
              tabList: "content-start",
              tab: "text-primary/60 text-sm",
            }}
          >
            <Tab key="email" title="Email">
              <SigninForm />
            </Tab>
            <Tab key="phone" title="Phone">
              <form className="flex h-[320px] flex-col justify-between gap-4">
                <div className="mt-4 animate-enter space-y-4 rounded-2xl bg-white py-6 shadow-sm md:px-2">
                  <p className="font-normal">Type your phone number</p>
                  <div className="flex items-center space-x-4">
                    <Input
                      className={cn(
                        "animate-enter font-mono text-xl font-semibold tracking-widest text-gray-500 opacity-40 delay-100 placeholder:text-gray-200",
                        { "opacity-100": phoneNumber !== "" },
                      )}
                      startContent={
                        <p
                          className={cn(
                            "mr-4 font-mono text-[16.5px] font-medium tracking-normal text-sky-700",
                            {
                              "text-sky-800/70 opacity-100": phoneNumber !== "",
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
                </div>
                <div className="flex w-full">
                  <Button
                    size="lg"
                    fullWidth
                    type="submit"
                    isLoading={false}
                    disabled={!isValidPhone}
                    className="animate-enter delay-200"
                    color={isValidPhone ? "primary" : "default"}
                    variant={isValidPhone ? "shadow" : "solid"}
                  >
                    Sign in
                  </Button>
                </div>
                <div className="flex w-full items-center justify-center space-x-2 text-xs">
                  <p className="text-center font-light">
                    Already have an account?
                  </p>
                  <Link
                    size="sm"
                    onPress={() => setSelected("login")}
                    className="animate-enter font-normal delay-500"
                  >
                    Login
                  </Link>
                </div>
              </form>
            </Tab>
          </Tabs>
        </div>
      </div>
    </div>
  );
};
