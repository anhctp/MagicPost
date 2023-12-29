
import { XCircleIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function AccountModal({setOpenDetail, componentRef, transactionAccount}: {
    setOpenDetail: React.Dispatch<React.SetStateAction<number | null>>,
    componentRef: React.RefObject<HTMLDivElement> | undefined,
    transactionAccount: any}) {
    const closeModal = () => {
        setOpenDetail(null);
    }

    const style = {
        label: "mb-2 text-sm font-medium",
        input: "border border-gray-300 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 w-full p-2.5",
        button: "text-white bg-green-700 hover:bg-green-900 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center",
    }

    return (
        <div>
            {/* 
            <div className="w-full flex justify-end text-stone-600">
                <button onClick={openModal}
                    className="border border-stone-600 rounded-2xl text-center px-5 flex items-center justify-between space-x-2">
                    <div className="font-bold text-2xl">+</div>
                    <div>Thêm tài khoản</div>
                </button>
            </div>
            */}
            <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed md:inset-0 max-h-full z-50 outline-none focus:outline-none">
                <div className="relative w-1/2 mt-10 mx-auto max-w-2xl">
                    <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                        <div className="flex items-center justify-between p-5 border-b border-solid border-gray">
                            <h3 className="text-xl font-semibold">
                                Thông tin trưởng điểm
                            </h3>
                            <button onClick={closeModal} className="end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center">
                                <XMarkIcon />
                            </button>
                        </div>
                        <div className="px-4 md:px-5 space-y-2">
                            <div className="space-y-4">
                                <div>
                                    <label className={style.label}>Họ tên
                                        <div id="fullname" className={style.input}>{transactionAccount?.fullname}</div>
                                    </label>
                                </div>
                                <div>
                                    <label className={style.label}>Giới tính
                                        <div id="gender" className={style.input}>{transactionAccount?.gender}</div>
                                    </label>
                                </div>
                                <div>
                                    <label className={style.label}>Chức vụ
                                        <div id="role" className={style.input}>{transactionAccount?.role}</div>
                                    </label>
                                </div>
                                <div>
                                    <label className={style.label}>Ngày sinh
                                        <div id="dateOfBirth" className={style.input}>{transactionAccount?.date_of_birth}</div>
                                    </label>
                                </div>
                                <div>
                                    <label className={style.label}>Số điện thoại
                                        <div id="phone" className={style.input}>{transactionAccount?.phone}</div>
                                    </label>
                                </div>
                                <div>
                                    <label className={style.label}>Email
                                        <div id="email" className={style.input}>{transactionAccount?.email}</div>
                                    </label>
                                </div>

                                <div className="w-full flex justify-end items-center space-x-5 pb-3">
                                    <button className={style.button} type="button">
                                        Xóa
                                    </button>
                                    <button className={style.button} type="button">
                                        Lưu
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}