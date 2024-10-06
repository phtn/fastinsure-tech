import { useState } from "react";
import { getUsers } from "../conv/users";
import type { ConvResponse } from "../conv/fetch";
import { errHandler, settle } from "@/utils/helpers";

export const useDev = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<unknown>();
  const [users, setUsers] = useState<ConvResponse>();

  const getAllUsers = async () => {
    setLoading(true);
    await getUsers()
      .then(setUsers)
      .catch(errHandler(setLoading, setError))
      .finally(settle(setLoading));
  };
  return { getAllUsers, error, users, loading };
};
