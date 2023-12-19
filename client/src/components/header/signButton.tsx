import Link from "next/link";
import useAuthStore from "@/stores/authStore";
import { useRouter } from "next/navigation";

export default function SignButton() {
  const { authorized } = useAuthStore();
  const logout = useAuthStore((state) => state.logout);
  const router = useRouter();
  const handleLogout = () => {
    logout();
    router.push("/");
  };
  return authorized ? (
    <div className="cursor-pointer" onClick={handleLogout}>
      Signed
    </div>
  ) : (
    <div className="w-fit justify-end inline-flex text-center text-sm text-stone-600 font-semibold">
      <Link className="border-r px-2 hover:underline" href="/home/signIn">
        Đăng nhập
      </Link>
      <Link className="px-2 hover:underline" href="/home/signUp">
        Đăng ký
      </Link>
    </div>
  );
}
