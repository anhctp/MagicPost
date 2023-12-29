"use client";
import axios from "axios";
axios.defaults.withCredentials = true;
axios.defaults.baseURL = "http://localhost:8000/api";

const token =
  typeof window !== "undefined" ? localStorage.getItem("token") : "";

export const manageTransaction = (idWarehouse: number) => {
  return axios.get(`/mangage_transaction/${idWarehouse}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getAllTransaction = () => {
    return axios.get("/mangage_all", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  };

export const getAllWarehouses = () => {
  return axios.get("/find");
}

export const getWarehouseById = (idWarehouse:number) => {
  return axios.get(`/${idWarehouse}`);
}

export const createWarehouse =() => {
  return axios.post("/");
}

export const updateWarehouse = (idWarehouse:number) => {
  return axios.put(`/${idWarehouse}`);
}

export const deleteWarehouse = (idWarehouse:number) => {
  return axios.delete(`/${idWarehouse}`);
}