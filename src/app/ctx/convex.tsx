"use client";
import { env } from "@/env";
import { api } from "@vex/api";
import {
  ConvexProvider,
  ConvexReactClient,
  useMutation,
  useQuery,
} from "convex/react";
import type { InsertRequest, SelectRequest } from "convex/requests/d";
// import { generateUrl } from "convex/requests/storage";
import { createContext, useContext, type PropsWithChildren } from "react";

const convex = new ConvexReactClient(env.NEXT_PUBLIC_CONVEX_URL);

interface VexCtxValues {
  request: {
    create: (
      args: InsertRequest,
    ) => Promise<(string & { __tableName: "requests" }) | null>;
    get: {
      all: () => SelectRequest[] | undefined;
      byId: (id: string) => Promise<SelectRequest | null>;
    };
    storage: {
      generateUrl: () => Promise<string>;
    };
    // delete: {
    //   byId: (id: string) => Promise<null>;
    // };
  };
}

const VexCtxProvider = ({ children }: PropsWithChildren) => {
  const createRequest = useMutation(api.requests.create.default);
  const getAllRequests = useQuery(api.requests.get.all);
  const getRequestById = useMutation(api.requests.get.byId);
  const generateUrl = useMutation(api.requests.storage.generateUrl);

  const request = {
    create: (args: InsertRequest) => createRequest(args),
    get: {
      all: () => getAllRequests,
      byId: (id: string) => getRequestById({ request_id: id }),
    },
    storage: {
      generateUrl,
    },
  };

  return <VexCtx.Provider value={{ request }}>{children}</VexCtx.Provider>;
};

const VexCtx = createContext<VexCtxValues | null>(null);

export const useVex = () => {
  const context = useContext(VexCtx);
  if (!context) throw new Error();
  return context;
};

export const Vex = ({ children }: PropsWithChildren) => {
  return (
    <ConvexProvider client={convex}>
      <VexCtxProvider>{children}</VexCtxProvider>
    </ConvexProvider>
  );
};
