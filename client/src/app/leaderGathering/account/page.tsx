'use client'
import {TableAccount} from "@/components/ceo/table";
import { useAllAccount } from "@/hooks/useAccount";
export default function AccountGathering() {
    const {allTransaction} = useAllAccount();
    const headers = [
        "STT",
        "Họ tên",
        "Ngày sinh",
        "Điểm quản lý",
        "Chi tiết",
        "Xóa"
    ];

    return (
        <>
        <TableAccount headers={headers} data={allTransaction} rowsPerPage={5}/>
        </>
    )
}