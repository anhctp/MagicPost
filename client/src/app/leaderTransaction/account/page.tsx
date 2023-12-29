'use client'
import { TableAccount } from "@/components/ceo/table";
import { allAccount } from "@/hooks/useAccount";

export default function AccountTransaction() {
    const headers = [
        "STT",
        "Họ tên",
        "Ngày sinh",
        "Điểm quản lý",
        "Chi tiết"
    ];

    const data = allAccount();;
    return (
        <>
        <TableAccount headers={headers} data={data} rowsPerPage={5}/>
        </>
    )
}