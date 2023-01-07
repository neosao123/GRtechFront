import { axiosPrivate } from "./axios";
export const mobileTransactions = async (data) => {
  let res = await axiosPrivate.post("/client/mobile/transactions", data);
  return res.data;
};

export const dthTransactions = async (data) => {
  let res = await axiosPrivate.post("/client/dth/transactions", data);
  return res.data;
};

export const allTransactions = async (data) => {
  let res = await axiosPrivate.post("/client/transactions", data);
  return res.data;
};
