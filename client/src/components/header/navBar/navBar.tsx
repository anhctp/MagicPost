'use client'

import Link from "next/link";
import SearchBar from "../searchBar";
import { usePathname } from "next/navigation";
import Sign_Button from "../signButton";
import { useState } from "react";
import SideBar from "./sideBar";
import { useEffect, useCallback, useRef } from "react";

export default function NavBar() {
    const pathname = usePathname();
    const active = ('border-b border-stone-600 text-neutral-400 font-semibold');

    let [isOpen, setIsOpen] = useState(false);

    return (
        <div className="w-full h-fit sticky py-3 top-0 z-50 bg-white inline-flex">
            <img className="w-fit h-20 justify-center items-center" src="/favicon.ico" />
            <div className="w-full justify-center items-center px-10 space-y-3">
                <SearchBar />

                <nav>
                    <ul className="space-x-10 w-fit self-stretch inline-flex text-center text-stone-600 text-xl">
                        <li>
                            <Link className={`link ${pathname === '/home' ? active : ''}`} href="/home">
                                Trang chủ
                            </Link>
                        </li>
                        <li onMouseEnter={() => setIsOpen(true)} onMouseLeave={() => setIsOpen(false)}>
                            <Link className={`link ${pathname.includes('/home/info') ? active : ''}`} href="/home/info/rules">Thông tin</Link>
                            {isOpen &&
                            <div className="absolute"><SideBar/></div>
                            }
                        </li>
                        <li>
                            <Link className={`link ${pathname === '/home/services' ? active : ''}`} href="/home/services">Dịch vụ</Link>
                        </li>
                    </ul>
                </nav>
            </div>

            <Sign_Button />
        </div>

    );
}