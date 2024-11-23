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
  useCallback,
  useContext,
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
      byId: (id: string) => Promise<InsertUser | null>;
    };
    update: (
      args: UpdateUser,
    ) => Promise<(string & { __tableName: "users" }) | null>;
  };
  vxuser: SelectUser | null;
  getVxuser: (uid: string | undefined) => Promise<void>;
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

  const createSubject = useMutation(api.subjects.create.default);
  const getSubjectById = useMutation(api.subjects.get.byId);

  const subject = {
    create: (args: InsertSubject) => createSubject(args),
    get: {
      byId: (id: string) => getSubjectById({ subject_id: id }),
    },
  };

  const createAuto = useMutation(api.autos.create.default);
  const getAutoById = useMutation(api.autos.get.byId);

  const auto = {
    create: (args: InsertAuto) => createAuto(args),
    get: {
      byId: (id: string) => getAutoById({ vehicle_id: id }),
    },
  };

  const createUser = useMutation(api.users.create.default);
  const getUserById = useMutation(api.users.get.byId);
  const updateUser = useMutation(api.users.update.update);

  const usr = {
    create: (args: InsertUser) => createUser(args),
    get: {
      byId: (id: string) => getUserById({ uid: id }),
    },
    update: (args: UpdateUser) => updateUser(args),
  };

  const [vxuser, setVxuser] = useState<SelectUser | null>(null);

  const getVxuser = useCallback(
    async (uid: string | undefined) => {
      if (!uid) return;
      const vx = await usr.get.byId(uid);
      // console.log(vx);
      setVxuser(vx);
      return;
    },
    [usr.get],
  );

  return (
    <VexCtx.Provider value={{ request, subject, auto, usr, vxuser, getVxuser }}>
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
