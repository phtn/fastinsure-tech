"use server";

// import { api } from "@vex/api";

import { api } from "@/trpc/server";

export const getUsers = async () => await api.convex.getUsers();
