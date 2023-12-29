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
  createBackwardSendingGather,
  createForwardSending,
  createGatheringSending,
  updateStatusGathering,
  updateStatusTransaction,
} from "@/services/staff/staffApi";
import {
  TransactionStatus,
  Transfer,
} from "@/services/staff/transactionPointHelpers";
import { TransferGathering } from "@/services/staff/gatheringPointHelpers";

interface Props {
  headers: any[];
  data: any;
  rowsPerPage: number;
  receive: boolean;
  transfer: string;
}

const styles = {
  table: "border-collapse w-full table-auto",
  tableRowHeader: "transition text-left",
  tableRowItems: "cursor-auto",
  tableHeader: "border-b border-stone-600 p-3 text-sm",
  tableCell: "p-3 text-sm",
  tableCellDetail: "p-3 text-sm text-stone-600 cursor-pointer",
};

export const TableGathering: React.FC<Props> = ({
  receive,
  transfer,
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
  const handleClickedButton = async (id: number, status: string) => {
    if (status === "sending") {
      await updateStatusGathering(id);
    } else {
      if (transfer === TransferGathering.GATHERING) {
        await createBackwardSendingGather(id);
      } else {
        await createGatheringSending(id);
      }
    }
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
                    {receive && (
                      <td className={styles.tableCell}>
                        <div
                          className="w-fit flex items-center justify-center gap-2 border rounded-xl border-stone-600 cursor-pointer text-stone-600 hover:bg-stone-600 hover:text-white p-2"
                          onClick={() =>
                            handleClickedButton(item.id, item.status)
                          }
                        >
                          <PaperAirplaneIcon width={20} height={20} />
                          {item.status === "sending"
                            ? "Đã nhận hàng"
                            : transfer === TransferGathering.GATHERING
                            ? "Gửi tới điểm giao dịch"
                            : "Gửi tới điểm tập kết"}
                        </div>
                      </td>
                    )}
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

export const TableTransaction: React.FC<Props> = ({
  receive,
  transfer,
  headers,
  data,
  rowsPerPage,
}) => {
  const [page, setPage] = useState(1);
  const [openDetail, setOpenDetail] = useState<number | null>(null);
  const [updateStatus, setUpdateStatus] = useState<string>(
    TransactionStatus.RECEIVED
  );
  const componentRef = useRef<HTMLDivElement>(null);
  const { slice, range } = useTable(data, page, rowsPerPage);
  const { transactions, locationReceiver, locationSender } = useReceipt(
    openDetail!
  );

  const handleSend = async (id: number, currStatus: string) => {
    if (currStatus === "sending") {
      await updateStatusTransaction(id, updateStatus);
    } else if (currStatus === "received") {
      if (transfer === Transfer.CUSTOMER) {
        await createForwardSending(id);
      } else {
        await createBackwardSending(id);
      }
    }
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
                      {transfer === Transfer.CUSTOMER && receive
                        ? "Chi tiết và in"
                        : "Chi tiết"}
                    </td>
                    {receive && (
                      <td
                        className={styles.tableCell}
                        onClick={() => handleSend(item.id, item.status)}
                      >
                        {transfer === Transfer.CUSTOMER &&
                          (item.status === "sending" ? (
                            <div
                              className="w-fit flex items-center justify-center gap-2 border rounded-xl border-stone-600 cursor-pointer text-stone-600 hover:bg-stone-600 hover:text-white p-2"
                              onClick={() =>
                                setUpdateStatus(TransactionStatus.RECEIVED)
                              }
                            >
                              <PaperAirplaneIcon width={20} height={20} />
                              Đã nhận được hàng
                            </div>
                          ) : (
                            <div className="w-fit flex items-center justify-center gap-2 border rounded-xl border-stone-600 cursor-pointer text-stone-600 hover:bg-stone-600 hover:text-white p-2">
                              <PaperAirplaneIcon width={20} height={20} />
                              Gửi đến điểm tập kết
                            </div>
                          ))}
                        {transfer === Transfer.GATHERING &&
                          (item.status === "sending" ? (
                            <div
                              className="w-fit flex items-center justify-center gap-2 border rounded-xl border-stone-600 cursor-pointer text-stone-600 hover:bg-stone-600 hover:text-white p-2"
                              onClick={() =>
                                setUpdateStatus(TransactionStatus.RECEIVED)
                              }
                            >
                              <PaperAirplaneIcon width={20} height={20} />
                              Đã nhận được hàng
                            </div>
                          ) : (
                            item.status === "received" && (
                              <div className="w-fit flex items-center justify-center gap-2 border rounded-xl border-stone-600 cursor-pointer text-stone-600 hover:bg-stone-600 hover:text-white p-2">
                                <PaperAirplaneIcon width={20} height={20} />
                                Giao cho khách hàng
                              </div>
                            )
                          ))}
                      </td>
                    )}
                    {!receive && (
                      <td
                        className={styles.tableCell}
                        onClick={() => handleSend(item.id, item.status)}
                      >
                        {transfer === Transfer.CUSTOMER && (
                          <div className="flex items-center gap-2">
                            <div
                              className="w-fit flex items-center justify-center gap-2 border rounded-xl border-stone-600 cursor-pointer text-stone-600 hover:bg-stone-600 hover:text-white p-2"
                              onClick={() =>
                                setUpdateStatus(TransactionStatus.SHIPPED)
                              }
                            >
                              <PaperAirplaneIcon width={20} height={20} />
                              Giao hàng thàng công
                            </div>
                            <div
                              className="w-fit flex items-center justify-center gap-2 border rounded-xl border-stone-600 cursor-pointer text-stone-600 hover:bg-stone-600 hover:text-white p-2"
                              onClick={() =>
                                setUpdateStatus(TransactionStatus.RETURN)
                              }
                            >
                              <PaperAirplaneIcon width={20} height={20} />
                              Giao hàng thất bại
                            </div>
                          </div>
                        )}
                      </td>
                    )}
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
