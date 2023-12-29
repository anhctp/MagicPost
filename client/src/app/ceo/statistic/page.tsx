"use client";
import { TableTransaction } from "@/components/ceo/table";
import { ModalLocation } from "@/components/staff/modalLocation";
import { getAllTransaction, manageTransaction } from "@/services/ceo/ceoApi";
import { TypeWarehouse } from "@/services/ceo/ceoHelpers";
import { getWarehouseByLocationId } from "@/services/customer/customerApi";
import { useEffect, useState } from "react";

export default function Statistic() {
  const headers = ["STT", "Mã đơn hàng", "Trạng thái", "Ngày gửi", "Chi tiết"];
  const [locationId, setLocationId] = useState<number>(1);
  const [warehouseId, setWarehouseId] = useState<number>(1);
  const [manages, setManages] = useState<any>([]);
  const [allManage, setAllManage] = useState<any>([]);
  const [type, setType] = useState<string>(TypeWarehouse.GATHERING);
  const getAllManages = async () => {
    await getAllTransaction().then((response) => {
      setAllManage(response.data);
    });
  };
  const getManages = async () => {
    await manageTransaction(warehouseId).then((response) => {
      setManages(response.data);
    });
  };

  const handleClickSearchingWarehouse = async () => {
    await getWarehouseByLocationId(locationId)
      .then((value) => {
        const matchWarehouse = value.data.find((obj: any) => obj.type === type);
        setWarehouseId(matchWarehouse.id);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    handleClickSearchingWarehouse();
    getAllManages();
  }, [locationId]);

  useEffect(() => {
    getManages();
  }, [warehouseId]);
  return (
    <div>
      <div className="flex flex-col items-center justify-center text-stone-600 gap-4">
        <div className="flex gap-4">
          <ModalLocation setLocationUserId={setLocationId} />
          <div
            className="border rounded-full border-stone-600 text-stone-600 px-2 cursor-pointer"
            onClick={() => setLocationId(0)}
          >
            Toàn bộ
          </div>
        </div>
      </div>
      <div className="flex justify-start items-center">
        <select
          className="border rounded-full border-stone-600 text-stone-600 px-2"
          onChange={(e) => {
            setType(e.target.value);
          }}
        >
          <option value={TypeWarehouse.GATHERING}>
            {TypeWarehouse.GATHERING}
          </option>
          <option value={TypeWarehouse.TRANSACTION}>
            {TypeWarehouse.TRANSACTION}
          </option>
        </select>
      </div>
      {locationId
        ? manages && (
            <TableTransaction
              title="giao dịch"
              headers={headers}
              data={manages}
              rowsPerPage={5}
            />
          )
        : allManage && (
            <TableTransaction
              title="giao dịch"
              headers={headers}
              data={allManage}
              rowsPerPage={5}
            />
          )}
    </div>
  );
}
