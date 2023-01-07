import { axiosPrivate } from "./axios";

export const getelectricityoperator = async ({ mode }) => {
  let result = await axiosPrivate.post(`/client/getelectricityoperator`, {
    mode,
  });
  return result;
};
