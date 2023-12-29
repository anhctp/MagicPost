'use client'
import {TableSystem} from "@/components/ceo/table";
import { getAllWarehouse } from "@/hooks/useSystem";
import { findAllUser } from "@/services/ceo/ceoApi";
import { UserInfo } from "os";
import { useEffect, useState } from "react";
export default function System() {
    const headers = [
        "STT",
        "Địa chỉ",
        "Vùng",
        "Loại",
        "Chi tiết"
    ];

    const data = getAllWarehouse();
    return (
        <div className="flex justify-center items-center mx-5">
        <TableSystem headers={headers} data={data} rowsPerPage={5}/>
        </div>
    )
}