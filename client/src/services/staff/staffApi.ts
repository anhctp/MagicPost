"use client";
import axios from "axios";
import { FullTransaction } from "./transactionPointHelpers";
import { TransactionStatus } from "./transactionPointHelpers";
axios.defaults.withCredentials = true;
axios.defaults.baseURL = "http://localhost:8000/api";

const token =
  typeof window !== "undefined" ? localStorage.getItem("token") : "";

// Transaction
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

export const createFullTransaction = (fullTransaction: FullTransaction) => {
  return axios.post("/transaction/create_transactions", fullTransaction, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getLocations = () => {
  return axios.get(`/location`);
};
export const getLocationByWardId = (wardId: number) => {
  return axios.get(`/location/ward/${wardId}`);
};

export const getAllDivision = () => {
  return axios.get("/division");
};
export const getAllDistrictByDivisionID = (divisionID: number) => {
  return axios.get(`/district/${divisionID}`);
};
export const getAllWardByDistrictID = (districtID: number) => {
  return axios.get(`/ward/${districtID}`);
};

export const createForwardSending = (transactionId: number) => {
  return axios.get(`/transaction/create_forward_sending/${transactionId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
export const createBackwardSending = (transactionId: number) => {
  return axios.get(`/transaction/create_backward_sending/${transactionId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const updateStatusTransaction = (
  transactionId: number,
  status: TransactionStatus
) => {
  return axios.get(`/transaction/confirm/${transactionId}?status=${status}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

// Gathering

export const getGatheringStatistic = () => {
  return axios.get("/gathering/gathering_statistic", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
export const createGatheringSending = (transactionId: number) => {
  return axios.get(`/gathering/create_gg_sending/${transactionId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
export const createBackwardSendingGather = (transactionId: number) => {
  return axios.get(`/gathering/create_backward_sending/${transactionId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
export const updateStatusGathering = (transactionId: number) => {
  return axios.get(`/gathering/confirm/${transactionId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
