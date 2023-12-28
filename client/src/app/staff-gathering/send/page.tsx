"use client";
import { TableGathering } from "@/components/staff/table";
import { TransferGathering } from "@/services/staff/gatheringPointHelpers";
import { useState } from "react";

export default function StaffGathering() {
  const data = [
    {
      id: 1,
      code: "MP264989219012",
      transaction_type: "Deliver",
      status: "processing",
    },
    {
      id: 2,
      code: "MP264989219012",
      transaction_type: "Deliver",
      status: "processing",
    },
    {
      id: 3,
      code: "MP264989219012",
      transaction_type: "Deliver",
      status: "processing",
    },
    {
      id: 4,
      code: "MP264989219012",
      transaction_type: "Deliver",
      status: "processing",
    },
    {
      id: 5,
      code: "MP264989219012",
      transaction_type: "Deliver",
      status: "processing",
    },
    {
      id: 6,
      code: "MP264989219012",
      transaction_type: "Deliver",
      status: "processing",
    },
    {
      id: 7,
      code: "MP264989219012",
      transaction_type: "Deliver",
      status: "processing",
    },
  ];
  const headers = [
    "STT",
    "Mã đơn hàng",
    "Loại đơn hàng",
    "Tình trạng",
    "Chi tiết",
  ];

  const [receiveFrom, setReceiveFrom] = useState<string>(
    TransferGathering.GATHERING
  );
  return (
    <>
      <div className="flex justify-start items-center">
        <select
          className="border rounded-full border-stone-600 text-stone-600 px-2"
          onChange={(e) => {
            setReceiveFrom(e.target.value);
          }}
        >
          <option value={TransferGathering.GATHERING}>
            {TransferGathering.GATHERING}
          </option>
          <option value={TransferGathering.TRANSACTION}>
            {TransferGathering.TRANSACTION}
          </option>
        </select>
      </div>
      <TableGathering
        receive={false}
        transfer={receiveFrom}
        headers={headers}
        data={data}
        rowsPerPage={5}
      />
    </>
  );
}
