"use client";
import { TableAccount } from "@/components/ceo/table";
import { useState, useEffect } from "react";
import { findAllUser } from "@/services/ceo/ceoApi";
import { allAccount } from "@/hooks/useAccount";

export default function Account() {
    const headers = [
        "STT",
        "Họ tên",
        "Ngày sinh",
        "Điểm quản lý",
        "Chức vụ",
        "Chi tiết",
    ];
    const data = allAccount();
    return (
        <div className="flex justify-center items-center mx-5">
            <TableAccount headers={headers} data={data} rowsPerPage={6} />
        </div>
    );
}
