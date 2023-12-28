"use client";
import { TableTransaction } from "@/components/staff/table";
import useTransactionPoint from "@/hooks/useTransactionPoint";
import { Transfer, headers } from "@/services/staff/transactionPointHelpers";
import { useEffect, useState } from "react";
import { PlusIcon } from "@heroicons/react/24/outline";
import { ModalCreateTransaction } from "@/components/staff/modalDetails";

export default function StaffTransaction() {
  const { receiveFromCustomer, receiveFromGathering, getTransactions } =
    useTransactionPoint();
  const [openModal, setOpenModal] = useState(false);
  const [receiveFrom, setReceiveFrom] = useState<string>(Transfer.GATHERING);
  useEffect(() => {
    getTransactions();
  }, [openModal]);
  return (
    <>
      <div className="flex justify-start items-center gap-4">
        <select
          className="border rounded-full border-stone-600 text-stone-600 px-2"
          onChange={(e) => {
            setReceiveFrom(e.target.value);
          }}
        >
          <option value={Transfer.GATHERING}>{Transfer.GATHERING}</option>
          <option value={Transfer.CUSTOMER}>{Transfer.CUSTOMER}</option>
        </select>
        {receiveFrom === Transfer.CUSTOMER && (
          <div
            className="flex items-center justify-center gap-2 border rounded-xl border-stone-600 px-2 cursor-pointer text-stone-600 hover:bg-stone-600 hover:text-white"
            onClick={() => setOpenModal(true)}
          >
            <PlusIcon width={20} height={20} />
            Tạo đơn hàng
          </div>
        )}
      </div>
      <TableTransaction
        headers={headers}
        receiveFrom={receiveFrom}
        data={
          receiveFrom === Transfer.CUSTOMER
            ? receiveFromCustomer
            : receiveFromGathering
        }
        rowsPerPage={5}
      />
      {openModal && <ModalCreateTransaction setOpenModel={setOpenModal} />}
    </>
  );
}
