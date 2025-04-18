"use client";

import { env } from "@/env";
import type { InsertAddress } from "@convex/address/d";
import type { InsertAuto } from "@convex/autos/d";
import type { InsertLog, SelectLog } from "@convex/logs/d";
import type {
  InsertNotification,
  SelectNotification,
} from "@convex/notifications/d";
import type {
  InsertRequest,
  RequestStatus,
  SelectRequest,
} from "@convex/requests/d";
import type { InsertSubject, SelectSubject } from "@convex/subjects/d";
import type { InsertUser, SelectUser, UpdateUser } from "@convex/users/d";
import { api } from "@vex/api";
import type { Id } from "@vex/dataModel";
import {
  ConvexProvider,
  ConvexReactClient,
  useMutation,
  useQuery,
} from "convex/react";
import {
  createContext,
  type PropsWithChildren,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";

const convex = new ConvexReactClient(env.NEXT_PUBLIC_CONVEX_URL);

interface VexCtxValues {
  address: {
    create: (
      args: InsertAddress,
    ) => Promise<(string & { __tableName: "address" }) | null>;
    get: {
      byId: (id: string) => Promise<InsertAddress | null>;
    };
  };
  request: {
    create: (
      args: InsertRequest,
    ) => Promise<(string & { __tableName: "requests" }) | null>;
    get: {
      all: () => SelectRequest[] | undefined;
      byId: (uid: string) => Promise<SelectRequest | null>;
      byAgentId: (uid: string) => Promise<SelectRequest[]>;
      byUnderwriterId: (uid: string) => Promise<SelectRequest[]>;
    };
    update: {
      status: (
        request_id: string,
        status: RequestStatus,
      ) => Promise<Id<"requests"> | null>;
      files: (
        request_id: string,
        files: (string | null)[],
      ) => Promise<Id<"requests"> | null>;
    };
  };
  subject: {
    create: (
      args: InsertSubject,
    ) => Promise<(string & { __tableName: "subjects" }) | null>;
    get: {
      byId: (id: string) => Promise<SelectSubject | null>;
      // byIds: (ids: string[]) => Promise<SelectSubject[] | null>;
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
      byRole: (role: string) => Promise<SelectUser[]>;
    };
    update: {
      groupCode: (
        uid: string,
        group_code: string,
      ) => Promise<Id<"users"> | null>;
      role: (uid: string, role: string) => Promise<Id<"users"> | null>;
      commission: (
        uid: string,
        commission_pct: number,
      ) => Promise<Id<"users"> | null>;
      userInfo: (args: UpdateUser) => Promise<Id<"users"> | null>;
    };
    add: {
      metadata: (
        uid: string,
        record: Record<string, number | string | boolean>,
      ) => Promise<Id<"users"> | null>;
    };
  };
  logs: {
    create: (
      args: InsertLog,
    ) => Promise<(string & { __tableName: "logs" }) | null>;
    get: {
      byId: (uid: string) => Promise<SelectLog[] | null>;
    };
  };
  notifications: {
    create: (
      args: InsertNotification,
    ) => Promise<(string & { __tableName: "notifications" }) | null>;
    get: {
      byReceiverId: (uid: string) => Promise<SelectNotification[] | null>;
    };
  };
  files: {
    create: (file?: File) => Promise<string | null>;
    get: (id: string) => Promise<string | null>;
  };
  updating: boolean;
}

const VexCtxProvider = ({ children }: PropsWithChildren) => {
  const [updating] = useState<boolean>(false);

  const createAddress = useMutation(api.address.create.default);
  const getAddressById = useMutation(api.address.get.byId);

  const address = useMemo(
    () => ({
      create: async (args: InsertAddress) => await createAddress(args),
      get: {
        byId: async (id: string) => await getAddressById({ address_id: id }),
      },
    }),
    [createAddress, getAddressById],
  );

  const createRequest = useMutation(api.requests.create.default);
  const getAllRequests = useQuery(api.requests.get.all);
  const getRequestById = useMutation(api.requests.get.byId);
  const getRequestByUnderwriterId = useMutation(
    api.requests.get.byUnderwriterId,
  );
  const getRequestsByAgentId = useMutation(api.requests.get.byAgentId);
  const updateRequestStatus = useMutation(api.requests.update.status);
  const updateRequestFiles = useMutation(api.requests.update.files);

  const request = useMemo(
    () => ({
      create: async (args: InsertRequest) => await createRequest(args),
      get: {
        all: () => getAllRequests,
        byId: async (id: string) => await getRequestById({ request_id: id }),
        byAgentId: async (uid: string) => await getRequestsByAgentId({ uid }),
        byUnderwriterId: async (uid: string) =>
          await getRequestByUnderwriterId({ uid }),
      },
      update: {
        status: async (request_id: string, status: RequestStatus) =>
          await updateRequestStatus({ request_id, status }),
        files: async (request_id: string, files: (string | null)[]) => {
          const sfiles = files.filter((file) => typeof file === "string");
          return await updateRequestFiles({ request_id, files: sfiles });
        },
      },
    }),
    [
      createRequest,
      getAllRequests,
      getRequestById,
      getRequestsByAgentId,
      updateRequestStatus,
      updateRequestFiles,
      getRequestByUnderwriterId,
    ],
  );

  const createSubject = useMutation(api.subjects.create.default);
  const getSubjectById = useMutation(api.subjects.get.byId);

  const subject = {
      create: async (args: InsertSubject) => await createSubject(args),
      get: {
        byId: async (id: string) => await getSubjectById({ subject_id: id }),
        // byIds: useQuery(api.subjects.get.byIds, "skip"),
      },
    }

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
  const getUsersByRole = useMutation(api.users.get.byRole);
  const updateUser = useMutation(api.users.update.userInfo);
  const updateGroupCode = useMutation(api.users.update.groupCode);
  const updateRole = useMutation(api.users.update.role);
  const updateCommission = useMutation(api.users.update.commission);
  const addMetadata = useMutation(api.users.add.metadata);

  const usr = useMemo(
    () => ({
      create: async (args: InsertUser) => await createUser(args),
      get: {
        byId: async (uid: string) => await getUserById({ uid }),
        byEmail: async (email: string) => await getUserByEmail({ email }),
        byGroup: async (group_code: string) =>
          await getUsersByGroup({ group_code }),
        byRole: async (role: string) => await getUsersByRole({ role }),
      },
      update: {
        userInfo: async (args: UpdateUser) => await updateUser(args),
        groupCode: async (uid: string, group_code: string) =>
          await updateGroupCode({ uid, group_code }),
        role: async (uid: string, role: string) =>
          await updateRole({ uid, role }),
        commission: async (uid: string, commission_pct: number) =>
          await updateCommission({ uid, commission_pct }),
      },
      add: {
        metadata: async (
          uid: string,
          record: Record<string, string | number | boolean>,
        ) => await addMetadata({ uid, record }),
      },
      //
    }),
    [
      addMetadata,
      createUser,
      getUserById,
      updateUser,
      getUsersByGroup,
      getUsersByRole,
      getUserByEmail,
      updateGroupCode,
      updateCommission,
      updateRole,
    ],
  );

  const createLog = useMutation(api.logs.create.default);
  const getLogById = useMutation(api.logs.get.byId);

  const logs = useMemo(
    () => ({
      create: async (args: InsertLog) => await createLog(args),
      get: {
        byId: async (uid: string) => await getLogById({ uid }),
      },
    }),
    [createLog, getLogById],
  );

  const createNotification = useMutation(api.notifications.create.default);
  const getNotificationByReceiverId = useMutation(
    api.notifications.get.byReceiverId,
  );

  const notifications = useMemo(
    () => ({
      create: async (args: InsertNotification) =>
        await createNotification(args),
      get: {
        byReceiverId: async (id: string) =>
          await getNotificationByReceiverId({ receiver_id: id }),
      },
    }),
    [createNotification, getNotificationByReceiverId],
  );

  const generateFileUrl = useMutation(api.files.create.url);
  const getFileUrl = useMutation(api.files.get.url);

  const createUrl = useCallback(
    async (file?: File) => {
      if (!file) return null;
      const postUrl = await generateFileUrl();
      const result = (
        await fetch(postUrl, {
          method: "POST",
          body: file,
          headers: {
            "Content-Type": file?.type ?? "image/*",
          },
        })
      ).json() as Promise<{ storageId: string }>;
      return (await result).storageId;
    },
    [generateFileUrl],
  );

  const files = useMemo(
    () => ({
      create: async (file?: File) => await createUrl(file),
      get: async (storageId: string) => await getFileUrl({ storageId }),
    }),
    [createUrl, getFileUrl],
  );

  return (
    <VexCtx.Provider
      value={{
        files,
        address,
        logs,
        notifications,
        request,
        subject,
        auto,
        usr,
        updating,
      }}
    >
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
