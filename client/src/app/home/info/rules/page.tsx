'use client'
import Link from "next/link";
import React from "react";
import Delivery from "@/components/home/services/delivery";
import Company from "@/components/home/services/company";


const base = ('border font-bold px-5');
const style = {
    h1: "text-stone-600 font-bold text-xl",
    ol: "list-inside ml-2 list-[upper-roman] text-md",
    ol_li: "font-bold",
    ol_ol: "list-disc ml-4 list-inside text-wrap font-normal",
    ol_p: "italic",
}

export default function Rules() {
    return (
        <div className="relative justify-center items-start">
            <ul className="flex justify-center items-start py-1 text-stone-600">
                <li className={base}>
                    <Link href="#company">Về phía công ty</Link>
                </li>
                <li className={base}>
                    <Link href="#delivery">Về phía vận chuyển</Link>
                </li>
            </ul>

            <div id="company">
                <h1 className={style.h1}>Về phía công ty</h1>
                <Company/>
            </div>

            <div id="delivery">
                <h1 className={style.h1}>Về phía vận chuyển</h1>
                <Delivery/>
            </div>
        </div>
    )
}