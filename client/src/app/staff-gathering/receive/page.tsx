"use client";
import { TableGathering } from "@/components/staff/table";
import useGatheringPoint from "@/hooks/useGatheringPoint";
import { TransferGathering } from "@/services/staff/gatheringPointHelpers";
import { headers } from "@/services/staff/transactionPointHelpers";
import { useState } from "react";

export default function StaffGathering() {
  const { receiveFromGathering, receiveFromTransaction } = useGatheringPoint();
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
        receive={true}
        headers={headers}
        transfer={receiveFrom}
        data={
          receiveFrom === TransferGathering.TRANSACTION
            ? receiveFromTransaction
            : receiveFromGathering
        }
        rowsPerPage={5}
      />
    </>
  );
}
