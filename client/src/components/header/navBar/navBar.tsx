"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Sign_Button from "../signButton";
import { useState } from "react";
import SideBar from "./sideBar";
import { useEffect, useCallback, useRef } from "react";
import { useUserStore } from "@/stores/userStore";
import { headerStaffGatheringItem } from "@/services/header/headerHelper";
import { Role } from "@/services/user/userHelper";

export default function NavBar() {
  const pathname = usePathname();
  const active =
    "py-2 border-b-2 border-stone-600 text-neutral-400 font-semibold";
  const [isOpen, setIsOpen] = useState(false);

  const { userRole } = useUserStore();

  return (
    <div className="w-full h-fit justify-between items-center py-3 top-0 z-50 bg-white inline-flex">
      <Link href={"/"} className="h-20 w-fit justify-start items-center">
        <img src="/favicon.ico" className="h-20" />
      </Link>
      {userRole === Role.STAFFGATHERING ? (
        <div className="w-fit justify-center items-center inline-flex gap-10 text-center text-stone-600 text-xl">
          {headerStaffGatheringItem.map((item, index) => (
            <Link
              key={index}
              className={`link ${pathname.includes(item.id) ? active : ""}`}
              href={item.link}
            >
              {item.label}
            </Link>
          ))}
        </div>
      ) : (
        <nav className="w-fit">
          <ul className="w-fit justify-center items-center inline-flex gap-10 text-center text-stone-600 text-xl">
            <li>
              <Link
                className={`link ${pathname === "/home" ? active : ""}`}
                href="/home"
              >
                Trang chủ
              </Link>
            </li>
            <li
              onMouseEnter={() => setIsOpen(true)}
              onMouseLeave={() => setIsOpen(false)}
            >
              <Link
                className={`link ${
                  pathname.includes("/home/info") ? active : ""
                }`}
                href="/home/info/rules"
              >
                Thông tin
              </Link>
              {isOpen && (
                <div className="absolute">
                  <SideBar />
                </div>
              )}
            </li>
            <li>
              <Link
                className={`link ${
                  pathname === "/home/services" ? active : ""
                }`}
                href="/home/services"
              >
                Dịch vụ
              </Link>
            </li>
          </ul>
        </nav>
      )}

      <Sign_Button />
    </div>
  );
}
