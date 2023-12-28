"use client";
import React, { useRef, useState } from "react";
import useTable from "@/hooks/useTable";
import TableFooter from "./tableFooter";
import { ModalDetail, ModalDetailPrint } from "../modalDetails";
import Receipt from "../receipt";
import Image from "next/image";
import useReceipt from "@/hooks/useReceipt";
import { PaperAirplaneIcon } from "@heroicons/react/24/outline";
import {
  createBackwardSending,
  createForwardSending,
} from "@/services/staff/staffApi";
import { Transfer } from "@/services/staff/transactionPointHelpers";

interface Props {
  headers: any[];
  data: any;
  rowsPerPage: number;
}
interface PropsTransaction extends Props {
  receiveFrom: string;
}

export const TableGathering: React.FC<Props> = ({
  headers,
  data,
  rowsPerPage,
}) => {
  const [page, setPage] = useState(1);
  const [openDetail, setOpenDetail] = useState<number | null>(null);
  const { slice, range } = useTable(data, page, rowsPerPage);
  const { transactions, locationReceiver, locationSender } = useReceipt(
    openDetail!
  );
  const styles = {
    table: "border-collapse w-full table-fixed",
    tableRowHeader: "transition text-left",
    tableRowItems: "cursor-auto",
    tableHeader: "border-b border-stone-600 p-3 text-sm",
    tableCell: "p-3 text-sm",
    tableCellDetail: "p-3 text-sm text-stone-600 cursor-pointer",
  };
  return (
    <>
      <div className="flex flex-col gap-4">
        {slice.length ? (
          <>
            <table className={styles.table}>
              <thead className={styles.tableRowHeader}>
                <tr>
                  {headers.map((item, index) => (
                    <th key={index} className={styles.tableHeader}>
                      {item}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {slice.map((item) => (
                  <tr className={styles.tableRowItems} key={item.id}>
                    <td className={styles.tableCell}>{item.id}</td>
                    <td className={styles.tableCell}>{item.code}</td>
                    <td className={styles.tableCell}>
                      {item.transaction_type}
                    </td>
                    <td className={styles.tableCell}>{item.status}</td>
                    <td
                      className={styles.tableCellDetail}
                      onClick={() => setOpenDetail(item.id)}
                    >
                      Chi tiết
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <TableFooter
              range={range}
              slice={slice}
              setPage={setPage}
              page={page}
            />
          </>
        ) : (
          <div className="flex flex-col items-center justify-center gap-4 p-4 text-neutral-400 text-xl">
            <Image
              src={"/deliveryMan.png"}
              alt="delivery-man"
              width={500}
              height={500}
            />
            Chưa có đơn hàng nào tại đây!
          </div>
        )}
      </div>
      {openDetail && (
        <ModalDetail
          setOpenDetail={setOpenDetail}
          transactions={transactions}
          locationSender={locationSender}
          locationReceiver={locationReceiver}
          componentRef={undefined}
        />
      )}
    </>
  );
};
export const TableTransaction: React.FC<PropsTransaction> = ({
  receiveFrom,
  headers,
  data,
  rowsPerPage,
}) => {
  const [page, setPage] = useState(1);
  const [openDetail, setOpenDetail] = useState<number | null>(null);
  const componentRef = useRef<HTMLDivElement>(null);
  const { slice, range } = useTable(data, page, rowsPerPage);
  const { transactions, locationReceiver, locationSender } = useReceipt(
    openDetail!
  );

  const handleSend = async (id: number) => {
    if (receiveFrom === Transfer.CUSTOMER) await createForwardSending(id);
    else await createBackwardSending(id);
  };

  const styles = {
    table: "border-collapse w-full table-fixed",
    tableRowHeader: "transition text-left",
    tableRowItems: "cursor-auto",
    tableHeader: "border-b border-stone-600 p-3 text-sm",
    tableCell: "p-3 text-sm",
    tableCellDetail: "p-3 text-sm text-stone-600 cursor-pointer",
  };
  return (
    <>
      <div className="flex flex-col gap-4">
        {slice.length ? (
          <>
            <table className={styles.table}>
              <thead className={styles.tableRowHeader}>
                <tr>
                  {headers.map((item, index) => (
                    <th key={index} className={styles.tableHeader}>
                      {item}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {slice.map((item, index) => (
                  <tr className={styles.tableRowItems} key={item.id}>
                    <td className={styles.tableCell}>{index + 1}</td>
                    <td className={styles.tableCell}>{item.code}</td>
                    <td className={styles.tableCell}>
                      {item.transaction_type}
                    </td>
                    <td className={styles.tableCell}>{item.status}</td>
                    <td
                      className={styles.tableCellDetail}
                      onClick={() => setOpenDetail(item.id)}
                    >
                      {receiveFrom === Transfer.CUSTOMER
                        ? "Chi tiết và in"
                        : "Chi tiết"}
                    </td>
                    <td
                      className={styles.tableCell}
                      onClick={() => handleSend(item.id)}
                    >
                      <div className="w-fit flex items-center justify-center gap-2 border rounded-xl border-stone-600 cursor-pointer text-stone-600 hover:bg-stone-600 hover:text-white p-2">
                        <PaperAirplaneIcon width={20} height={20} />
                        {receiveFrom === Transfer.CUSTOMER
                          ? "Gửi đến điểm tập kết"
                          : "Giao cho khách hàng"}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <TableFooter
              range={range}
              slice={slice}
              setPage={setPage}
              page={page}
            />
          </>
        ) : (
          <div className="flex flex-col items-center justify-center gap-4 p-4 text-neutral-400 text-xl">
            <Image
              src={"/deliveryMan.png"}
              alt="delivery-man"
              width={500}
              height={500}
            />
            Chưa có đơn hàng nào tại đây!
          </div>
        )}
      </div>
      {openDetail && (
        <ModalDetailPrint
          setOpenDetail={setOpenDetail}
          componentRef={componentRef}
          transactions={transactions}
          locationSender={locationSender}
          locationReceiver={locationReceiver}
        />
      )}
      <div className="hidden">
        <Receipt
          innerRef={componentRef}
          transactions={transactions}
          locationSender={locationSender}
          locationReceiver={locationReceiver}
        />
      </div>
    </>
  );
};
