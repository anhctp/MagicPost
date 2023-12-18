import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import Image from "next/image";

export default function SearchBar() {
    return (
        <form method="GET">
            <div className="h-10 rounded-2xl border items-center inline-flex px-2" >
                <input type="text" name="search" placeholder="Tra cứu" className="w-[300px] focus:outline-none text-[16px]" />
                <button type="submit" className="right-0 w-6">
                    <MagnifyingGlassIcon/>
                </button>
            </div>
        </form>
    )
}