// import { type EmailAndPassword, loginFields } from "./schema";
// import { LoginField } from "./input";
// import { GoogleSignin } from "./google";
// import { useCallback } from "react";
// import { useForm } from "react-hook-form";
// import { Button, Image } from "@nextui-org/react";
// import { useAuthCtx } from "../ctx/auth";
// import { cn } from "@/lib/utils";
// import { EnvelopeIcon } from "@heroicons/react/24/outline";

// export const EmailForm = () => {
//   const { signUserWithEmail, loading } = useAuthCtx();

//   const { register, handleSubmit } = useForm<EmailAndPassword>({
//     defaultValues: { email: "", password: "" },
//   });

//   const creds = useCallback(
//     async (data: EmailAndPassword) => signUserWithEmail(data),
//     [signUserWithEmail],
//   );

//   return (
//     <form onSubmit={handleSubmit(creds)} className="flex flex-col space-y-4">
//       <div className="flex h-14 items-end justify-start px-3 text-lg font-semibold tracking-tight">
//         <header>Sign in with email</header>
//       </div>
//       <div
//         className={cn(
//           "shadow-primary-primary-200 h-fit w-full rounded-[10px] shadow-sm",
//           "transition-all duration-500 ease-out transform-gpu hover:shadow-md",
//         )}
//       >
//         <LoginField
//           key={loginFields[0]?.name}
//           start={EnvelopeIcon}
//           icon={loginFields[0]?.icon}
//           title={loginFields[0]?.label}
//           className={cn(
//             "rounded-b-none rounded-t-lg border border-b-0 border-[#1B1F22]/30",
//           )}
//           {...register("email")}
//         />
//         <LoginField
//           key={loginFields[1]?.name}
//           start={loginFields[1]?.icon}
//           icon={loginFields[1]?.icon}
//           title={loginFields[1]?.label}
//           className={cn(
//             "border-x-double rounded-b-lg rounded-t-none border border-[#1B1F22]/30",
//           )}
//           {...register("password")}
//         />
//       </div>
//       <div className="space-y-2 px-2 text-sm">
//         <Button
//           type="submit"
//           variant="shadow"
//           color="primary"
//           isLoading={loading}
//           className="h-[5rem] w-full items-center space-x-4 rounded-md bg-[#1b1f22] font-inst text-sm font-semibold text-foreground hover:bg-background/80 sm:h-12"
//           fullWidth
//         >
//           <div>Sign in</div>
//         </Button>
//         <div className="flex h-8 items-center justify-center text-xs">
//           <p>or</p>
//         </div>
//         <GoogleSignin />
//         <div className="flex h-8 items-center justify-center text-xs"></div>
//       </div>
//     </form>
//   );
// };

// export const SigninHeader = () => (
//   <div className="absolute left-0 top-0 z-[70] flex h-[calc(100vh*0.15)] w-full items-center space-x-4 pl-6 md:pl-14 xl:h-[calc(100vh*0.15)] xl:pl-20">
//     <div className="flex size-[24px] items-center justify-center rounded-full border-[0.33px] border-[#1B1F22]/50 bg-[#1B1F22]/10 xl:size-[32px]">
//       <Image
//         alt=""
//         src={1 ? "/svg/logo_dark.svg" : "/svg/f.svg"}
//         className="size-[12px] rounded-none xl:size-[16px]"
//       />
//     </div>
//     <h1 className="font-inst font-medium text-[#1B1F22] drop-shadow-lg xl:text-lg">
//       FastInsure Technologies
//     </h1>
//   </div>
// );
