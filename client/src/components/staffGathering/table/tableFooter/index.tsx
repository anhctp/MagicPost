import React, { useEffect } from "react";
import { BackwardIcon, ForwardIcon } from "@heroicons/react/24/outline";

interface Props {
  range: any[];
  setPage: React.Dispatch<React.SetStateAction<number>>;
  page: number;
  slice: any;
}

const TableFooter: React.FC<Props> = ({ range, setPage, page, slice }) => {
  const styles = {
    footer: "flex items-center justify-end gap-2",
    button:
      "w-8 me-1 h-8 flex items-center justify-center cursor-pointer text-stone-600",
    active: "border rounded-md border-stone-600",
    hover: "hover:bg-neutral-400 hover:text-white hover:boder hover:rounded-md",
  };
  useEffect(() => {
    if (slice.length < 1 && page !== 1) {
      setPage(page - 1);
    }
  }, [slice, page, setPage]);
  return (
    <div className={styles.footer}>
      <div
        className={`${styles.button} ${
          page === 1 ? "cursor-not-allowed" : styles.hover
        }`}
        onClick={() => page !== 1 && setPage(page - 1)}
      >
        <BackwardIcon />
      </div>
      {range.map((item, index) => (
        <div
          key={index}
          className={`${styles.button} ${page === item && styles.active}`}
          onClick={() => setPage(item)}
        >
          {item}
        </div>
      ))}
      <div
        className={`${styles.button} ${
          page === range.length ? "cursor-not-allowed" : styles.hover
        }`}
        onClick={() => page !== range.length && setPage(page + 1)}
      >
        <ForwardIcon />
      </div>
    </div>
  );
};

export default TableFooter;
