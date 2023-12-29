"use client";
import { TableSystem } from "@/components/ceo/table";
import { getAllWarehouses } from "@/services/ceo/ceoApi";
import { TransactionTypeWarehouse } from "@/services/ceo/ceoHelpers";
import { useEffect, useState } from "react";
export default function System() {
  const headers = ["STT", "Địa chỉ", "Chi tiết"];
  const [allWarehouse, setAllWarehouse] = useState<any>([]);
  const [type, setType] = useState<string>(TransactionTypeWarehouse.GATHERING);
  const getWarehouses = async () => {
    await getAllWarehouses(1, 30, type).then((response) => {
      setAllWarehouse(response.data);
    });
  };

  useEffect(() => {
    getWarehouses();
  }, [type]);
  return (
    <>
      <div className="flex justify-start items-center">
        <select
          className="border rounded-full border-stone-600 text-stone-600 px-2"
          onChange={(e) => {
            setType(e.target.value);
          }}
        >
          <option value={TransactionTypeWarehouse.GATHERING}>
            {TransactionTypeWarehouse.GATHERING}
          </option>
          <option value={TransactionTypeWarehouse.TRANSACTION}>
            {TransactionTypeWarehouse.TRANSACTION}
          </option>
        </select>
      </div>
      {allWarehouse && (
        <TableSystem
          title="giao dịch"
          headers={headers}
          data={allWarehouse}
          rowsPerPage={5}
        />
      )}
    </>
  );
}
