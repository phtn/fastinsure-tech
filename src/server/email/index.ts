import { axFn } from "../api/utils";
import { createAxiosInstance } from "../secure/axios";
import { sendEmail } from "./handlers";

const ax = createAxiosInstance();

export const email = {
  send: axFn(sendEmail, ax)
}
