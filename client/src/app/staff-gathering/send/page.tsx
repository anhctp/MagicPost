"use client";
import { TableGathering } from "@/components/staff/table";
import useGatheringPoint from "@/hooks/useGatheringPoint";
import { TransferGathering } from "@/services/staff/gatheringPointHelpers";
import { headersShort } from "@/services/staff/transactionPointHelpers";
import { useState } from "react";

export default function StaffGathering() {
  const { sendToGathering, sendToTransaction } = useGatheringPoint();

  const [sendTo, setSendTo] = useState<string>(TransferGathering.GATHERING);
  return (
    <>
      <div className="flex justify-start items-center">
        <select
          className="border rounded-full border-stone-600 text-stone-600 px-2"
          onChange={(e) => {
            setSendTo(e.target.value);
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
        transfer={sendTo}
        headers={headersShort}
        data={
          sendTo === TransferGathering.GATHERING
            ? sendToGathering
            : sendToTransaction
        }
        rowsPerPage={5}
      />
    </>
  );
}
