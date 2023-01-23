import { axiosPrivate } from "./axios";
export const fetchLicBill = async (data) => {
  let res = await axiosPrivate.post("/client/fetchlicbill", data);
  return res.data;
};

export const payLicBill = async (data) => {
  let res = await axiosPrivate.post("/client/licbill", data);
  return res.data;
};
