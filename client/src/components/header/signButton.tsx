import Link from "next/link";
import useAuthStore from "@/stores/authStore";

export default function Sign_Button() {
  const { authorized } = useAuthStore();
  return authorized ? (
    <div>Signed</div>
  ) : (
    <div className="w-full h-fit justify-end items-start inline-flex text-center text-sm text-stone-600 font-semibold">
      <Link className="border-r px-2 hover:underline" href="/home/signIn">
        Đăng nhập
      </Link>
      <Link className="px-2 hover:underline" href="/home/signUp">
        Đăng ký
      </Link>
    </div>
  );
}
