"use client";
import { TableTransaction } from "@/components/staff/table";
import useTransactionPoint from "@/hooks/useTransactionPoint";
import { Transfer, headers } from "@/services/staff/transactionPointHelpers";
import { useState } from "react";

export default function StaffTransaction() {
  const { sendToCustomer, sendToGathering } = useTransactionPoint();

  const [sendTo, setSendTo] = useState<string>(Transfer.GATHERING);
  return (
    <>
      <div className="flex justify-start items-center">
        <select
          className="border rounded-full border-stone-600 text-stone-600 px-2"
          onChange={(e) => {
            setSendTo(e.target.value);
          }}
        >
          <option value={Transfer.GATHERING}>{Transfer.GATHERING}</option>
          <option value={Transfer.CUSTOMER}>{Transfer.CUSTOMER}</option>
        </select>
      </div>
      <TableTransaction
        headers={headers}
        data={sendTo === Transfer.CUSTOMER ? sendToCustomer : sendToGathering}
        rowsPerPage={5}
        receiveFrom={""}
      />
    </>
  );
}
