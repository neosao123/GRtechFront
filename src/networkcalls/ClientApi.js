import { axiosPrivate } from "./axios";

export const LoginWithOtp = async (data) => {
  const res = await axiosPrivate.post("/client/login", data);
  return res.data;
};

export const VerifyOtp = async (data) => {
  const res = await axiosPrivate.post("/client/verifyotp", data);
  return res.data;
};

export const CompleteProfile = async (data, config) => {
  const res = await axiosPrivate.post("/client/completeprofile", data, config);
  return res.data;
};

export const CompleteKyc = async (data) => {
  const res = await axiosPrivate.post("/client/completekyc", data);
  return res.data;
};

export const clientProfile = async (data) => {
  const res = await axiosPrivate.post("/client/profile", data);
  return res.data;
};

export const resendOtp = async (data) => {
  const res = await axiosPrivate.post("/client/resendotp", data);
  return res.data;
};
export const getclientdashboard = async (data) => {
  const res = await axiosPrivate.post("/client/getclientdashboard", data);
  return res.data;
};
export const addclientwalletamount = async (data) => {
  const res = await axiosPrivate.post("/client/addclientwalletamount", data);
  return res.data;
};
