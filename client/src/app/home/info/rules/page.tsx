import Link from "next/link";

export default function Rules() {
    const base = ('border font-bold px-5');

    return (
        <div className="relative justify-center items-start">
            <ul className="flex justify-center items-start py-1 text-stone-600">
                <li className={base}>
                    <Link href="/home/info/rules#company">Về phía vận chuyển</Link>
                </li>
                <li className={base}>
                    <Link href="/home/info/rules#delivery">Về phía công ty</Link>
                </li>
            </ul>

            <div id="company">
                <h1 className="font-bold text-xl">Về phía công ty</h1>
                <p>1. Text</p>
            </div>

            <div id="delivery">
            <h1 className="font-bold text-xl">Về phía vận chuyển</h1>
                <p>1. Text</p>
            </div>
        </div>
    )
}