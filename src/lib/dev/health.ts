import { ruConn } from "../secure/handlers";

export const useHealthCheck = () => {
  const healthCheck = async () => await ruConn().then(console.log);

  return {
    healthCheck,
  };
};
