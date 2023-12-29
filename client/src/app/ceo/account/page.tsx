"use client";
import { TableAccount } from "@/components/ceo/table";
import { getUserByRole } from "@/services/ceo/ceoApi";
import { UserRoleLeader } from "@/services/ceo/ceoHelpers";
import { useEffect, useState } from "react";
export default function Account() {
  const headers = ["STT", "Họ tên", "Ngày sinh", "Điểm quản lý", "Chi tiết"];
  const [type, setType] = useState<string>(UserRoleLeader.LEADERGATHERING);
  const [user, setUser] = useState<any>([]);
  const getUser = async () => {
    await getUserByRole(type)
      .then((value) => {
        setUser(value.data);
      })
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    getUser();
  }, [type]);

  return (
    <>
      <div className="flex justify-start items-center">
        <select
          className="border rounded-full border-stone-600 text-stone-600 px-2"
          onChange={(e) => {
            setType(e.target.value);
          }}
        >
          <option value={UserRoleLeader.LEADERGATHERING}>
            {UserRoleLeader.LEADERGATHERING}
          </option>
          <option value={UserRoleLeader.LEADERTRANSACTION}>
            {UserRoleLeader.LEADERTRANSACTION}
          </option>
        </select>
      </div>
      {user && <TableAccount headers={headers} data={user} rowsPerPage={5} />}
    </>
  );
}
