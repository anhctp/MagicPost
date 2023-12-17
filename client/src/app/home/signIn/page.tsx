import Link from "next/link";

export default function Sign_In() {
    const input = ('w-[400px] focus:outline-none text-lg rounded-2xl border border-stone-600 p-1 px-2 ');

    return (
        <div className="w-screen px-5 items-center inline-flex relative">
            <div className="w-full h-fit justify-start items-center">
                <img src="/2.png" className="max-w-[440px]" />
            </div>
            <div className="w-full h-fit border-l border-stone-600 justify-center items-center block">
                <form method="POST" className="space-y-5">
                    <h2 className="text-center text-stone-600 text-2xl font-bold">Đăng nhập</h2>
                    <div className="flex justify-center">
                        <input type="email" name="email" autoComplete="email" required placeholder="Email" className={input} />
                    </div>
                    <div className="flex justify-center">
                        <input type="password" name="password" required placeholder="Password" className={input} />
                    </div>
                    <div className="flex justify-center">
                        <button type="submit" value="" className="text-lg rounded-2xl border border-stone-600 hover:bg-stone-600 hover:text-white p-1 px-4 text-stone-600 font-semibold">Đăng nhập</button>
                    </div>
                    <p className="text-center text-stone-600 font-semibold text-lg">Chưa có tài khoản?
                        <Link href="/home/signUp" className="text-neutral-400 hover:underline"> Đăng ký ngay!</Link>
                    </p>
                </form>
            </div>
        </div>
    );
}