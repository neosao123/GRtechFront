import { axiosPrivate } from "./axios";

export const getFastTagOperator = async () => {
  let res = await axiosPrivate.get("/client/getfasttagoperator");
  return res.data;
};

export const getConsumerDetails = async (data) => {
  let res = await axiosPrivate.post("/client/getconsumerdetails", data);
  return res.data;
};

export const fastTagRecharge = async (data) => {
  let res = await axiosPrivate.post("/client/fasttagrecharge", data);
  return res.data;
};
