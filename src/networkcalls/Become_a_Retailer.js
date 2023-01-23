import { axiosPrivate } from "./axios";
export const getQualification = () => {
  let res = axiosPrivate.get("/client/getqualification");
  return res;
};
export const saveBasicAddressDetails = (data) => {
  let res = axiosPrivate.post("/client/savebasicaddressdetails", data);
  return res;
};
export const saveAadharDetails = (data) => {
  let res = axiosPrivate.post("/client/saveaadhardetails", data);
  return res;
};
export const saveBankDetails = (data) => {
  let res = axiosPrivate.post("/client/savebankdetails", data);
  return res;
};
