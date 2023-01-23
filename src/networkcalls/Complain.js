import { axiosPrivate } from "./axios";

export const getComplainCategories = async () => {
  let res = await axiosPrivate.get("/client/complaint/categories");
  return res.data;
};

export const storeComplain = async (data, config) => {
  let res = await axiosPrivate.post("/client/complaint/store", data, config);
  return res.data;
};

export const fetchComplainList = async (clientCode) => {
  let res = await axiosPrivate.post("/client/complaint/fetch", clientCode);
  return res.data;
};
