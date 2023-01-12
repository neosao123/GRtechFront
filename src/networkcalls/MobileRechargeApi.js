import { axiosPrivate } from "./axios";

export const getPhoneInfo = async (data) => {
  let result = axiosPrivate.post(`/client/getphoneinfo`, data);
  return (await result).data;
};

export const browseplan = async (browsedata) => {
  let result = axiosPrivate.post(`/client/browseplan`, browsedata);
  return (await result).data;
};
export const mobileReacharge = async (data) => {
  let result = axiosPrivate.post(`/client/mobilerecharge`, data);
  return (await result).data;
};

export const getOprator = async () => {
  let result = axiosPrivate.get(`/client/getoperator`);
  return (await result).data;
};
export const getCircle = async () => {
  const res = await axiosPrivate.get(`/client/getcircle`);
  return res.data;
};
export const retryMobileRecharge = async (data) => {
  const res = await axiosPrivate.post(`/client/retrymobilerecharge`, data);
  return res.data;
};
