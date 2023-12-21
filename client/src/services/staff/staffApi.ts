import axios from "axios";
axios.defaults.withCredentials = true;
axios.defaults.baseURL = "http://localhost:8000/api";

export const getTransactionById = (idTransaction: number) => {
  return axios.get(`/transaction/${idTransaction}`);
};

export const getLocationById = (idLocation: number) => {
  return axios.get(`/location/${idLocation}`);
};
