"use client";

import { useAuthCtx } from "@/app/ctx/auth/auth";
import { useVex } from "@/app/ctx/convex";
import { Err, Ok } from "@/utils/helpers";
import type { SelectAddress } from "@convex/address/d";
import type { SelectAuto } from "@convex/autos/d";
import type { SelectRequest } from "@convex/requests/d";
import type { SelectSubject } from "@convex/subjects/d";
import type { SelectUser } from "@convex/users/d";
import {
  createContext,
  type ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useState,
  useTransition,
  useContext,
} from "react";

// Types
export interface RequestViewerState {
  pending: boolean;
  vxrequest: SelectRequest | null;
  vxaddress: SelectAddress | null;
  vxauto: SelectAuto | null;
  vxsubject: SelectSubject | null;
  vxusers: SelectUser[] | null;
  underwriters: SelectUser[] | null;
  loading: boolean;
  role: string | undefined;
  attachedFiles: (string | null)[];
}

export interface RequestViewerActions {
  submitRequest: () => Promise<void>;
  updateRequestFiles: (files: (string | null)[]) => Promise<void>;
}

export interface RequestViewerContextValue
  extends RequestViewerState,
    RequestViewerActions {}

const RequestViewerCtx = createContext<RequestViewerContextValue | null>(null);

export interface RequestViewProps {
  children: ReactNode;
  request_id: string | null;
}

// Custom hook for data fetching
const useRequestData = (request_id: string | null) => {
  const { request, usr, address, auto, subject, files } = useVex();
  const { vxuser } = useAuthCtx();
  const [state, setState] = useState<RequestViewerState>({
    pending: false,
    vxrequest: null,
    vxaddress: null,
    vxauto: null,
    vxsubject: null,
    vxusers: null,
    underwriters: null,
    loading: false,
    role: vxuser?.role,
    attachedFiles: [],
  });

  const [isPending, startTransition] = useTransition();

  // Helper function to safely update state
  const updateState = useCallback((updates: Partial<RequestViewerState>) => {
    setState((prev) => ({ ...prev, ...updates }));
  }, []);

  // Fetch request data
  const fetchRequest = useCallback(async () => {
    if (!request_id) return;
    try {
      const data = await request.get.byId(request_id);
      updateState({ vxrequest: data });
      return data;
    } catch (error) {
      console.error("Error fetching request:", error);
    }
  }, [request_id, request.get, updateState]);

  // Fetch underwriters
  const fetchUnderwriters = useCallback(
    async (groupCode: string) => {
      try {
        const users = await usr.get.byGroup(groupCode);
        const underwriters = users.filter((u) => u.role === "underwriter");
        updateState({
          vxusers: users,
          underwriters,
        });
      } catch (error) {
        console.error("Error fetching underwriters:", error);
      }
    },
    [usr.get, updateState],
  );

  // Fetch address
  const fetchAddress = useCallback(
    async (addressId: string) => {
      try {
        const data = await address.get.byId(addressId);
        updateState({ vxaddress: data });
      } catch (error) {
        console.error("Error fetching address:", error);
      }
    },
    [address.get, updateState],
  );

  // Fetch auto
  const fetchAuto = useCallback(
    async (vehicleId: string) => {
      try {
        const data = await auto.get.byId(vehicleId);
        updateState({ vxauto: data });
      } catch (error) {
        console.error("Error fetching auto:", error);
      }
    },
    [auto.get, updateState],
  );

  // Fetch subject
  const fetchSubject = useCallback(
    async (subjectId: string) => {
      try {
        const data = await subject.get.byId(subjectId);
        updateState({ vxsubject: data });
      } catch (error) {
        console.error("Error fetching subject:", error);
      }
    },
    [subject.get, updateState],
  );

  // Fetch files kg20zst27vcwekynt4hq74ekhx7btfrs
  const getFileUrl = useCallback(async (id: string) => await files.get(id), [files])
  const fetchFiles = useCallback(
    async (ids: string[]) => {
      console.log(ids)
      try {
          const attachedFiles = await Promise.all(ids.map(getFileUrl));
          updateState({attachedFiles})
      } catch (error) {
        console.error("Error fetching files:", error);
      }
    },
    [updateState, getFileUrl],
  );

  // Actions
  const actions: RequestViewerActions = useMemo(
    () => ({
      submitRequest: async () => {
        if (!state.vxrequest?.request_id) return;
        updateState({ loading: true });
        try {
          await request.update.status(state.vxrequest.request_id, "submitted");
          Ok(() => updateState({ loading: false }), "Request submitted.")();
        } catch (error) {
          if (error instanceof Error) {
            Err(() => updateState({ loading: false }), "Update failed.")(error);
          } else {
            console.error("Unknown error:", error);
            updateState({ loading: false });
          }
        }
      },
      updateRequestFiles: async (files: (string | null)[]) => {
        if (!state.vxrequest?.request_id) return;
        try {
          await request.update.files(state.vxrequest.request_id, files);
        } catch (error) {
          console.error("Error updating files:", error);
        }
      },
    }),
    [state.vxrequest?.request_id, request.update, updateState],
  );

  // Effect to fetch initial data
  useEffect(() => {
    if (!request_id) return;

    const fetchData = async () => {
      startTransition(async () => {
        const requestData = await fetchRequest();
        if (!requestData) return;

        const addressId = requestData.request_id.split("-")[0];
        if (addressId) await fetchAddress(addressId);
        if (requestData.vehicle_id) await fetchAuto(requestData.vehicle_id);
        if (requestData.subject_id) await fetchSubject(requestData.subject_id);
        if (requestData.group_code)
          await fetchUnderwriters(requestData.group_code);
        if (requestData.files) await fetchFiles(requestData.files);
      });
    };

    fetchData().catch((error) => {
      console.error("Error fetching data:", error);
    });
  }, [
    request_id,
    fetchRequest,
    fetchAddress,
    fetchAuto,
    fetchSubject,
    fetchUnderwriters,
    fetchFiles,
  ]);

  return {
    state: { ...state, pending: isPending },
    actions,
  };
};

export const RequestViewerProvider = ({
  children,
  request_id,
}: RequestViewProps) => {
  const { state, actions } = useRequestData(request_id);

  const contextValue = useMemo(
    () => ({
      ...state,
      ...actions,
    }),
    [state, actions],
  );

  return (
    <RequestViewerCtx.Provider value={contextValue}>
      {children}
    </RequestViewerCtx.Provider>
  );
};

export const useRequestViewer = () => {
  const context = useContext(RequestViewerCtx);
  if (!context) {
    throw new Error(
      "useRequestViewer must be used within a RequestViewerProvider",
    );
  }
  return context;
};
