"use client";
import { TableTransaction } from "@/components/staff/table";
import useTransactionPoint from "@/hooks/useTransactionPoint";
import { ReceiveFrom } from "@/services/staff/transactionPointHelpers";
import { useState } from "react";

export default function StaffTransaction() {
  const { receiveFromCustomer, receiveFromGathering } = useTransactionPoint();
  const headers = [
    "STT",
    "Mã đơn hàng",
    "Loại đơn hàng",
    "Tình trạng",
    "Chi tiết",
  ];

  const [receiveFrom, setReceiveFrom] = useState<string>(ReceiveFrom.GATHERING);
  return (
    <>
      <div className="flex justify-start items-center">
        <select
          className="border rounded-full border-stone-600 text-stone-600 px-2"
          onChange={(e) => {
            setReceiveFrom(e.target.value);
          }}
        >
          <option value={ReceiveFrom.GATHERING}>{ReceiveFrom.GATHERING}</option>
          <option value={ReceiveFrom.CUSTOMER}>{ReceiveFrom.CUSTOMER}</option>
        </select>
      </div>
      <TableTransaction
        headers={headers}
        data={
          receiveFrom === ReceiveFrom.CUSTOMER
            ? receiveFromCustomer
            : receiveFromGathering
        }
        rowsPerPage={5}
      />
    </>
  );
}
