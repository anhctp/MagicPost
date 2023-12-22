"use client";
import { TableGathering } from "@/components/staff/table";
import useTransactionPoint from "@/hooks/useTransactionPoint";
import { Transfer } from "@/services/staff/transactionPointHelpers";
import { useState } from "react";

export default function StaffTransaction() {
  const { sendToCustomer, sendToGathering } = useTransactionPoint();
  const headers = [
    "STT",
    "Mã đơn hàng",
    "Loại đơn hàng",
    "Tình trạng",
    "Chi tiết",
  ];

  const [receiveFrom, setReceiveFrom] = useState<string>(Transfer.GATHERING);
  return (
    <>
      <div className="flex justify-start items-center">
        <select
          className="border rounded-full border-stone-600 text-stone-600 px-2"
          onChange={(e) => {
            setReceiveFrom(e.target.value);
          }}
        >
          <option value={Transfer.GATHERING}>{Transfer.GATHERING}</option>
          <option value={Transfer.CUSTOMER}>{Transfer.CUSTOMER}</option>
        </select>
      </div>
      <TableGathering
        headers={headers}
        data={
          receiveFrom === Transfer.CUSTOMER ? sendToCustomer : sendToGathering
        }
        rowsPerPage={5}
      />
    </>
  );
}
