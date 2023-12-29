"use client";
import { getAllWarehouses, getWarehouseById } from "@/services/ceo/ceoApi";
import { useEffect, useState } from "react";

// export const useAllWarehouses = () => {
//     const [allWarehouse, setAllWarehouse] = useState<any>([]);
//     const getWarehouses = async () => {
//         await getAllWarehouses().then((response) => {
//             setAllWarehouse(response.data.getAllWarehouses);
//         })
//     }

//     useEffect(() => {
//         getWarehouses();
//     }, []);

//     return {
//         allWarehouse,
//     };
// }

const useWarehouses = (id: number) => {
  const [warehouse, setWarehouse] = useState<any>([]);
  const getWarehouse = async () => {
    await getWarehouseById(id)
      .then((response) => {
        const location = response.data;
        setWarehouse(
          (location.address ? location.address + ", " : "") +
            location.ward.name +
            ", " +
            location.district.name +
            ", " +
            location.division.name
        );
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getWarehouse();
  }, [id]);

  return {
    warehouse,
  };
};

export default useWarehouses;
