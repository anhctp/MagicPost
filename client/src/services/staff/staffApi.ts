import useAuthStore from "@/stores/authStore";
import axios from "axios";
axios.defaults.withCredentials = true;
axios.defaults.baseURL = "http://localhost:8000/api";

const token = useAuthStore.getState().token;

export const getTransactionById = (idTransaction: number) => {
  return axios.get(`/transaction/get_transaction/${idTransaction}`);
};

export const getTransactionStatistic = () => {
  return axios.get("/transaction/transaction_statistic", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getLocationById = (idLocation: number) => {
  return axios.get(`/location/${idLocation}`);
};
