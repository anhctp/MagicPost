import axios from "axios";
import { UserLogin } from "./userHelper";
axios.defaults.withCredentials = true;
axios.defaults.baseURL = "http://localhost:8000/api";

export const login = (data: UserLogin) => {
  return axios.post("/login", data);
};