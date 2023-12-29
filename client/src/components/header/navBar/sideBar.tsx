'use client'
import { usePathname } from "next/navigation";
import Link from "next/link";
import { useUserStore } from "@/stores/userStore";
import { Role } from "@/services/user/userHelper";

export default function SideBar() {
    const pathname = usePathname();
    const active = ('bg-stone-600 text-white px-5 py-1 font-semibold');
    const activeDrop = ('hover:font-semibold border border-stone-600 px-5 py-1');

    const { userRole } = useUserStore();

    return (
        <ul className="bg-white text-stone-600 text-center text-xl">
            <li value="0" className={`link ${pathname === '/home/info/rules' ? active : activeDrop}`}>
                <Link href="/home/info/rules">Điều khoản</Link>
            </li>
            <li value="1" className={`link ${pathname === '/home/info/news' ? active : activeDrop}`}>
                <Link href="/home/info/news">Tin tức</Link>
            </li>
            <li value="2" className={`link ${pathname === '/home/info/instruction' ? active : activeDrop}`}>
                <Link href="/home/info/instruction">Hướng dẫn</Link>
            </li>
        </ul>
    )
}