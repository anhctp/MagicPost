"use client";
import React, { useRef, useState } from "react";
import { PrinterIcon } from "@heroicons/react/24/outline";
import useTable from "@/hooks/useTable";
import TableFooter from "./tableFooter";
import { ModalDetail } from "../modalDetails";
import ReactToPrint from "react-to-print";
import Receipt from "../componentToPrint";

interface Props {
  headers: any[];
  data: any;
  rowsPerPage: number;
}

export const TableGathering: React.FC<Props> = ({
  headers,
  data,
  rowsPerPage,
}) => {
  const [page, setPage] = useState(1);
  const [openDetail, setOpenDetail] = useState<number | null>(null);
  const { slice, range } = useTable(data, page, rowsPerPage);
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
                <td className={styles.tableCell}>{item.transaction_type}</td>
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
      </div>
      {openDetail && (
        <ModalDetail openDetail={openDetail} setOpenDetail={setOpenDetail} />
      )}
    </>
  );
};
export const TableTransaction: React.FC<Props> = ({
  headers,
  data,
  rowsPerPage,
}) => {
  const [page, setPage] = useState(1);
  const [openDetail, setOpenDetail] = useState<number | null>(null);
  const componentRef = useRef<HTMLDivElement>(null);
  const { slice, range } = useTable(data, page, rowsPerPage);
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
        <table className={styles.table}>
          <thead className={styles.tableRowHeader}>
            <tr>
              {headers.map((item, index) => (
                <th key={index} className={styles.tableHeader}>
                  {item}
                </th>
              ))}
              <th className={styles.tableHeader}></th>
            </tr>
          </thead>
          <tbody>
            {slice.map((item) => (
              <tr className={styles.tableRowItems} key={item.id}>
                <td className={styles.tableCell}>{item.id}</td>
                <td className={styles.tableCell}>{item.code}</td>
                <td className={styles.tableCell}>{item.transaction_type}</td>
                <td className={styles.tableCell}>{item.status}</td>
                <td
                  className={styles.tableCellDetail}
                  onClick={() => setOpenDetail(item.id)}
                >
                  Chi tiết
                </td>
                <td className={styles.tableCellDetail}>
                  <ReactToPrint
                    trigger={() => (
                      <div className="flex items-center justify-end gap-2">
                        <PrinterIcon width={20} height={20} />
                        Print
                      </div>
                    )}
                    content={() => componentRef.current}
                  />
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
      </div>
      {openDetail && (
        <ModalDetail openDetail={openDetail} setOpenDetail={setOpenDetail} />
      )}
      <div className="hidden">
        <Receipt innerRef={componentRef} />
      </div>
    </>
  );
};
