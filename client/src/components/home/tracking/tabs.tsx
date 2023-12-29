"use client";
import { Router } from "next/router";
import Link from "next/link";
import { useEffect, useState } from "react";
import OrderDetails from "./trackDetails";
import AddressForm from "./trackPoint";
import { title } from "process";
import { ModalLocation } from "@/components/staff/modalLocation";
import {
  getTrackingByTransaction,
  getWarehouseByLocationId,
} from "@/services/customer/customerApi";
import { Warehouse } from "@/services/customer/customerHelper";

export default function Tabs() {
  const style = {
    button: "hover:font-semibold active:font-semibold px-10",
  };
  const [isOpen1, setIsOpen1] = useState(false);
  const [isOpen2, setIsOpen2] = useState(false);
  const [locationId, setLocationId] = useState<number>(1);
  const [warehouses, setWarehouses] = useState<any>([]);
  const [tracking, setTracking] = useState<any>([]);
  const [transaction, setTransaction] = useState<any>();
  const openModal1 = () => {
    if (isOpen2) {
      setIsOpen2(false);
    }
    setIsOpen1(true);
  };

  const openModal2 = () => {
    if (isOpen1) {
      setIsOpen1(false);
    }
    setIsOpen2(true);
  };
  const closeModal1 = () => setIsOpen1(false);
  const closeModal2 = () => setIsOpen2(false);

  const handleClickSearchingWarehouse = async () => {
    await getWarehouseByLocationId(locationId)
      .then((value) => {
        setWarehouses(value.data);
      })
      .catch((err) => console.log(err));
  };
  const handleSearchingTransaction = async () => {
    await getTrackingByTransaction(transaction)
      .then((value) => {
        setTracking(value.data);
      })
      .catch((err) => {
        setTracking(["undefined"]);
        console.log(err);
      });
  };
  useEffect(() => {
    handleClickSearchingWarehouse();
  }, [locationId]);
  useEffect(() => {
    handleSearchingTransaction();
  }, [transaction]);

  return (
    <>
      <div className="mt-5 p-5 h-10 justify-center items-center flex">
        <div className="w-1/2 border-y border-stone-600 flex justify-center items-center text-center text-stone-600">
          <Link
            href="#tra-cuu-don-hang"
            onClick={openModal1}
            className={style.button}
          >
            Tra cứu đơn hàng
          </Link>
          <Link
            href="#tra-cuu-diem-giao-dich"
            onClick={openModal2}
            className={style.button}
          >
            Tra cứu điểm giao dịch
          </Link>
        </div>
      </div>
      {isOpen1 && (
        <div className="flex flex-col items-center justify-center text-stone-600 gap-4">
          <input
            type="text"
            name="search"
            placeholder="Nhập mã vận đơn"
            className="w-[500px] border border-gray rounded-md p-1"
            value={transaction}
            onChange={(e) => setTransaction(e.target.value)}
          />
          <OrderDetails transaction={transaction} tracking={tracking} />
        </div>
      )}
      {isOpen2 && (
        <div className="flex flex-col items-center justify-center text-stone-600 gap-4">
          <ModalLocation setLocationUserId={setLocationId} />
          {warehouses.map((item: any, index: number) => (
            <div className="flex gap-2">
              <div>
                {index + 1}. {item.type}:
              </div>
              <div>
                {item.ward.name}, {item.district.name}, {item.division.name}
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}
