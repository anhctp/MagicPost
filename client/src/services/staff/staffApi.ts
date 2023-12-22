"use client";
import axios from "axios";
axios.defaults.withCredentials = true;
axios.defaults.baseURL = "http://localhost:8000/api";

const token =
  typeof window !== "undefined" ? localStorage.getItem("token") : "";

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
