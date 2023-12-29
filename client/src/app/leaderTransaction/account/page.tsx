"use client";
import { TableAccount } from "@/components/ceo/table";
import { getUserByRole } from "@/services/ceo/ceoApi";
import { UserRoleStaff } from "@/services/leader/leaderTransactionHelpers";
import { useEffect, useState } from "react";
export default function Account() {
  const headers = ["STT", "Họ tên", "Ngày sinh", "Điểm làm việc", "Chi tiết"];
  const [user, setUser] = useState<any>([]);
  const getUser = async () => {
    await getUserByRole(UserRoleStaff.STAFFTRANSACTION)
      .then((value) => {
        setUser(value.data);
      })
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    getUser();
  }, []);

  return (
    <>
      {user && <TableAccount headers={headers} data={user} rowsPerPage={5} />}
    </>
  );
}
