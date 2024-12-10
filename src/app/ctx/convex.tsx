"use client";
import { env } from "@/env";
import { api } from "@vex/api";
import {
  ConvexProvider,
  ConvexReactClient,
  useMutation,
  useQuery,
} from "convex/react";
import type { InsertRequest, SelectRequest } from "@convex/requests/d";
import type { InsertSubject } from "@convex/subjects/d";
import type { InsertAuto } from "@convex/autos/d";
// import { generateUrl } from "convex/requests/storage";
import {
  createContext,
  type PropsWithChildren,
  useContext,
  useMemo,
  useState,
} from "react";
import type { InsertUser, SelectUser, UpdateUser } from "@convex/users/d";

const convex = new ConvexReactClient(env.NEXT_PUBLIC_CONVEX_URL);

interface VexCtxValues {
  request: {
    create: (
      args: InsertRequest,
    ) => Promise<(string & { __tableName: "requests" }) | null>;
    get: {
      all: () => SelectRequest[] | undefined;
      byId: (id: string) => Promise<SelectRequest | null>;
      byAgentId: (uid: string) => Promise<SelectRequest[]>;
    };
    storage: {
      generateUrl: () => Promise<string>;
    };
    // delete: {
    //   byId: (id: string) => Promise<null>;
    // };
  };
  subject: {
    create: (
      args: InsertSubject,
    ) => Promise<(string & { __tableName: "subjects" }) | null>;
    get: {
      byId: (id: string) => Promise<InsertSubject | null>;
    };
  };
  auto: {
    create: (
      args: InsertAuto,
    ) => Promise<(string & { __tableName: "autos" }) | null>;
    get: {
      byId: (id: string) => Promise<InsertAuto | null>;
    };
  };
  usr: {
    create: (
      args: InsertUser,
    ) => Promise<(string & { __tableName: "users" }) | null>;
    get: {
      byId: (id: string) => Promise<SelectUser | null>;
      byEmail: (email: string) => Promise<SelectUser | null>;
      byGroup: (group_code: string) => Promise<SelectUser[]>;
    };
    update: (args: UpdateUser) => Promise<void>;
  };
  updating: boolean;
}

const VexCtxProvider = ({ children }: PropsWithChildren) => {
  const [updating] = useState<boolean>(false);

  const createRequest = useMutation(api.requests.create.default);
  const getAllRequests = useQuery(api.requests.get.all);
  const getRequestById = useMutation(api.requests.get.byId);
  const getRequestsByAgentId = useMutation(api.requests.get.byAgentId);
  const generateUrl = useMutation(api.requests.storage.generateUrl);

  const request = useMemo(
    () => ({
      create: (args: InsertRequest) => createRequest(args),
      get: {
        all: () => getAllRequests,
        byId: (id: string) => getRequestById({ request_id: id }),
        byAgentId: async (uid: string) => await getRequestsByAgentId({ uid }),
      },
      storage: {
        generateUrl,
      },
    }),
    [
      createRequest,
      getAllRequests,
      getRequestById,
      getRequestsByAgentId,
      generateUrl,
    ],
  );

  const createSubject = useMutation(api.subjects.create.default);
  const getSubjectById = useMutation(api.subjects.get.byId);

  const subject = useMemo(
    () => ({
      create: (args: InsertSubject) => createSubject(args),
      get: {
        byId: (id: string) => getSubjectById({ subject_id: id }),
      },
    }),
    [createSubject, getSubjectById],
  );

  const createAuto = useMutation(api.autos.create.default);
  const getAutoById = useMutation(api.autos.get.byId);

  const auto = useMemo(
    () => ({
      create: (args: InsertAuto) => createAuto(args),
      get: {
        byId: (id: string) => getAutoById({ vehicle_id: id }),
      },
    }),
    [createAuto, getAutoById],
  );

  const createUser = useMutation(api.users.create.default);
  const getUserById = useMutation(api.users.get.byId);
  const getUserByEmail = useMutation(api.users.get.byEmail);
  const getUsersByGroup = useMutation(api.users.get.byGroup);
  const updateUser = useMutation(api.users.update.update);

  const usr = useMemo(
    () => ({
      create: async (args: InsertUser) => await createUser(args),
      get: {
        byId: async (uid: string) => await getUserById({ uid }),
        byEmail: async (email: string) => await getUserByEmail({ email }),
        byGroup: async (group_code: string) =>
          await getUsersByGroup({ group_code }),
      },
      update: async (args: UpdateUser) => {
        const exists = await getUserById({ uid: args.uid });
        if (exists) {
          await updateUser(args);
        }
      },
    }),
    [createUser, getUserById, updateUser, getUsersByGroup, getUserByEmail],
  );

  return (
    <VexCtx.Provider value={{ request, subject, auto, usr, updating }}>
      {children}
    </VexCtx.Provider>
  );
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
