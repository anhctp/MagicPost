"use client";
import React, { useState } from "react";

import useTable from "@/hooks/useTable";
import TableFooter from "./tableFooter";
import { ModelDetail } from "../modelDetails";

interface Props {
  headers: any[];
  data: any;
  rowsPerPage: number;
}

const Table: React.FC<Props> = ({ headers, data, rowsPerPage }) => {
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
        <ModelDetail openDetail={openDetail} setOpenDetail={setOpenDetail} />
      )}
    </>
  );
};

export default Table;
