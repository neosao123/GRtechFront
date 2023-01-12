import { axiosPrivate } from "./axios";

export const getdthoperator = async () => {
  let res = await axiosPrivate.get("/client/getdthoperator");
  return res.data;
};

export const getdthinfo = async (data) => {
  let res = await axiosPrivate.post("/client/getdthinfo", data);
  return res.data;
};

export const getdthcircle = async () => {
  let res = await axiosPrivate.get("/client/getdthcircle");
  return res.data;
};
export const dthrecharge = async (data) => {
  let res = await axiosPrivate.post("/client/dthrecharge", data);
  return res.data;
};
export const retryDthRecharge = async (data) => {
  let res = await axiosPrivate.post(`client/retrydthrecharge`, data);
  return res.data;
};
