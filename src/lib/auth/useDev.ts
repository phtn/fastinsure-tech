// import { useState } from "react";
// import { getUsers } from "../conv/users";
// import type { ConvResponse } from "../conv/fetch";
// import { Err, settle } from "@/utils/helpers";
// import { devGet, devSet } from "../secure/callers";
// import { devToken } from "../secure/resource";

// export const useDev = () => {
//   const [loading, setLoading] = useState(false);
//   const [users, setUsers] = useState<ConvResponse>();
//   const [dev, setDev] = useState<object>();

//   const getAllUsers = async () => {
//     setLoading(true);
//     await getUsers()
//       .then(setUsers)
//       .catch(Err(setLoading, "Unable to fetch users."))
//       .finally(settle(setLoading));
//   };

//   const testSet = () => {
//     devSet(devToken)
//       .then(setDev)
//       .catch(Err(setLoading, "Server is unreachable."));
//   };
//   const testGet = () => {
//     devGet().then(setDev).catch(Err(setLoading, "Server is unreachable."));
//   };

//   return {
//     getAllUsers,
//     users,
//     loading,
//     testSet,
//     testGet,
//     dev,
//   };
// };
