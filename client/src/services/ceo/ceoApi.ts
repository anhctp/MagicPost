"use client";
import axios from "axios";
axios.defaults.withCredentials = true;
axios.defaults.baseURL = "http://localhost:8000/api";

const token =
  typeof window !== "undefined" ? localStorage.getItem("token") : "";

export const manageTransaction = (idWarehouse: number) => {
  return axios.get(`/manage/mangage_transaction/${idWarehouse}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getAllTransaction = () => {
  return axios.get("/manage/mangage_all", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getAllWarehouses = (page: number, size: number, type: string) => {
  return axios.get(`/warehouse/find?page=${page}&size=${size}&type=${type}`);
};

export const getWarehouseById = (idWarehouse: number) => {
  return axios.get(`/${idWarehouse}`);
};

export const createWarehouse = () => {
  return axios.post("/");
};

export const updateWarehouse = (idWarehouse: number) => {
  return axios.put(`/${idWarehouse}`);
};

export const deleteWarehouse = (idWarehouse: number) => {
  return axios.delete(`/${idWarehouse}`);
};

export const getUserByRole = (role: string) => {
  return axios.get(`/user/find?role=${role}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
export const getUserById = (userId: string) => {
  return axios.get(`/user/${userId}`);
};
export const deleteUser = (userId: number) => {
  return axios.get(`/user/delete/${userId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
