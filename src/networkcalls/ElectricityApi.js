import { axiosPrivate } from "./axios";

export const getelectricityoperator = async ({ mode }) => {
  let result = await axiosPrivate.post(`/client/getelectricityoperator`, {
    mode,
  });
  return result;
};

export const fetchElectricityBill = async (data) => {
  let res = await axiosPrivate.post("/client/fetchelectricitybill", data);
  return res;
};

export const payElectricityBill = async (data) => {
  let res = await axiosPrivate.post("/client/electricitybill", data);
  return res;
};
