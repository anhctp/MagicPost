'use client'
import { Router } from "next/router";
import Link from "next/link";
import { useState } from "react";
import OrderDetails from "./trackDetails";
import AddressForm from "./trackPoint";
import { title } from "process";

export default function Tabs() {
    const style = {
        button: "hover:font-semibold active:font-semibold px-10"
    }
    const [isOpen1, setIsOpen1] = useState(false);
    const [isOpen2, setIsOpen2] = useState(false);
    const openModal1 = () => {
        if (isOpen2) {
            setIsOpen2(false);
        }
        setIsOpen1(true);
    }

    const openModal2 = () => {
        if (isOpen1) {
            setIsOpen1(false);
        }
        setIsOpen2(true);
    }
    const closeModal1 = () => setIsOpen1(false);
    const closeModal2 = () => setIsOpen2(false);

    return (
        <>
            <div className="mt-5 p-5 h-10 justify-center items-center flex">
                <div className="w-1/2 border-y border-stone-600 flex justify-center items-center text-center text-stone-600">
                    <Link href="#tra-cuu-don-hang" onClick={openModal1} className={style.button}>Tra cứu đơn hàng</Link>
                    <Link href="#tra-cuu-diem-giao-dich" onClick={openModal2} className={style.button}>Tra cứu điểm giao dịch</Link>
                </div>
            </div>
            {isOpen1 &&
                <div className="flex justify-center text-stone-600">
                    <form id="tra-cuu-don-hang" className="absolute justify-center space-y-2">
                        <input type="text" name="search" placeholder="Nhập mã vận đơn" className="w-[500px] border border-gray rounded-md p-1" />
                        <button type="submit" className="bg-stone-600 text-white font-semibold p-1 rounded-md">Tra cứu</button>
                        <OrderDetails isOpen={openModal1} onClose={closeModal1} />
                    </form>
                </div>
            }
            {isOpen2 &&
                <div className="flex justify-center text-stone-600">
                    <form id="tra-cuu-diem-giao-dich" className="absolute justify-center space-y-2">
                        <div className="inline-flex justify-between">
                            <AddressForm isOpen={openModal2} onClose={closeModal2} />
                            <div>
                                <button type="submit" className="bg-stone-600 text-white font-semibold p-1 rounded-md">Tra cứu</button>
                                </div>
                        </div>
                    </form>
                </div>
            }
        </>
    );
}