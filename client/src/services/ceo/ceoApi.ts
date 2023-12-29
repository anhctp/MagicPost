import { create } from 'zustand';
"use client";
import axios from "axios";
import { WarehouseInfo } from './accountHelper';
axios.defaults.withCredentials = true;
axios.defaults.baseURL = "http://localhost:8000/api";

const token =
  typeof window !== "undefined" ? localStorage.getItem("token") : "";

export const findAllUser = () => {
  return axios.get(`/user/all`);
}

export const findUserbyId = (userId:number) => {
  return axios.get(`/user/${userId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    }
  })
}

export const getAllWarehouses = () => {
  return axios.get(`/warehouse/find`);
}

export const getWarehouseById = (id:number) => {
  return axios.get(`/warehouse/${id}`);
}

export const UpdateWarehouse = (id:number, data:WarehouseInfo) => {
  return axios.put(`/warehouse/${id}`,data);
}

export const DeleteWarehouse = (id:number) => {
  return axios.delete(`/warehouse/${id}`);
}

export const createWarehouse = (data:WarehouseInfo) => {
  axios.post(`/warehouse/`, data);
}
