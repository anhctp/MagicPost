import axios from "axios";

export const getWarehouseByLocationId = (idTransaction: number) => {
  return axios.get(`/warehouse/location/${idTransaction}`);
};
