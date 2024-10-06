// import { z } from "zod";
import { api } from "@/lib/conv/fetch";
import { proc, router } from "../trpc";

export const convexRouter = router({
  getUsers: proc.query(async () => api("user/users/get").run()),
});
