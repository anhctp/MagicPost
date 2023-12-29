import axios from "axios";
axios.defaults.baseURL = "http://localhost:8000/api";

const token =
  typeof window !== "undefined" ? localStorage.getItem("token") : "";

export const getTypeQuantity = () => {
  return axios.get(`/transaction/get_type_quantity`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
