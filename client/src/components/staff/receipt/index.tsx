import useReceipt from "@/hooks/useReceipt";
import Image from "next/image";
import { useEffect, useState } from "react";
import Barcode from "react-barcode";

interface ReceiptProps {
  id: number | null;
  innerRef: React.RefObject<HTMLDivElement>;
}

const Receipt: React.FC<ReceiptProps> = ({ id, innerRef }) => {
  const { data } = useReceipt(id!);
  return (
    <div ref={innerRef} className="w-full flex flex-col p-4">
      <div className="w-full flex justify-around items-center">
        <Image src={"/favicon.ico"} alt="icon" width={200} height={200} />
        <Barcode height={100} value={data ? data.code : "undefined"} />
      </div>
      <div className="text-red-500">{data?.user.fullname}</div>
    </div>
  );
};

export default Receipt;
