import { useState } from "react";
import { getUsers } from "../conv/users";
import type { ConvResponse } from "../conv/fetch";
import { errHandler, settle } from "@/utils/helpers";
import { devGet, devSet } from "../secure/callers";
import { devToken } from "../secure/resource";

export const useDev = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<unknown>();
  const [users, setUsers] = useState<ConvResponse>();
  const [dev, setDev] = useState<object>();

  const getAllUsers = async () => {
    setLoading(true);
    await getUsers()
      .then(setUsers)
      .catch(errHandler(setLoading, setError))
      .finally(settle(setLoading));
  };

  const testSet = () => {
    devSet(devToken).then(setDev).catch(errHandler(setLoading, setError));
  };
  const testGet = () => {
    devGet().then(setDev).catch(errHandler(setLoading, setError));
  };

  return {
    getAllUsers,
    error,
    users,
    loading,
    testSet,
    testGet,
    dev,
  };
};
