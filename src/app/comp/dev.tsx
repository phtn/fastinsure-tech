import { useDev } from "@/lib/auth/useDev";
import Json from "@/ui/json";
import { Button } from "@nextui-org/react";

export const Dev = () => {
  const { getAllUsers, users, loading, error } = useDev();
  return (
    <div className="h-[calc(100vh*0.8)] w-screen p-1 md:p-12">
      <div className="h-full w-full space-y-4 overflow-y-scroll rounded-[3rem] border border-primary/20 bg-background/80 p-10 font-inst md:p-20">
        <div className="flex items-center space-x-4">
          <strong>Dev&middot;test</strong>
          <Button
            isLoading={loading}
            onPress={getAllUsers}
            size="sm"
            variant="solid"
            color="secondary"
          >
            fetch users
          </Button>
        </div>
        <Json src={{ ...(error ?? users) }} />
      </div>
    </div>
  );
};
