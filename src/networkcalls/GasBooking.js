import { axiosPrivate } from "./axios";

export const gasBookingOperator = async (data) => {
  let res = await axiosPrivate.post("/client/getgasbookingoperator", data);
  return res.data;
};
export const fetchGasbookingDetails = async (data) => {
  let res = await axiosPrivate.post("/client/fetchgasbookingdetails", data);
  return res.data;
};
export const gasBooking = async (data) => {
  let res = await axiosPrivate.post("/client/gasbooking", data);
  return res.data;
};
export const getLpgStatelist = async () => {
  let res = await axiosPrivate.get("/client/getlpgstatelist");
  return res.data;
};
export const getLpgDistrictListByState = async (stateId) => {
  let res = await axiosPrivate.post("/client/getlpgdistrictbystate", stateId);
  return res.data;
};
export const getLpgDistributor = async (stateId) => {
  let res = await axiosPrivate.post("/client/getlpgdistributor", stateId);
  return res.data;
};
