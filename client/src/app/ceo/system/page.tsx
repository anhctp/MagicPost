'use client'
import {TableSystem} from "@/components/ceo/table";
import { useAllWarehouses } from "@/hooks/useSystem";
export default function System() {
    const {allWarehouse} = useAllWarehouses();
    const headers = [
        "STT",
        "Địa chỉ",
        "Chi tiết",
        "Xóa"
    ];

    return (
        <>
        <TableSystem title="giao dịch" headers={headers} data={allWarehouse} rowsPerPage={5}/>
        </>
    )
}