import axios from "axios";

export const getWarehouseByLocationId = (idTransaction: number) => {
  return axios.get(`/warehouse/location/${idTransaction}`);
};
export const getTrackingByTransaction = (idTransaction: number) => {
  return axios.get(
    `/tracking/get_transaction/?transaction_code=${idTransaction}`
  );
};
