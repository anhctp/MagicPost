import Link from "next/link";
import useAuthStore from "@/stores/authStore";
import { useRouter } from "next/navigation";
import { MapPinIcon, UserCircleIcon } from "@heroicons/react/24/outline";
import { useUserStore } from "@/stores/userStore";
import { Role } from "@/services/user/userHelper";

export default function SignButton() {
  const { authorized } = useAuthStore();
  const { userRole } = useUserStore();
  const logout = useAuthStore((state) => state.logout);
  const router = useRouter();
  const handleLogout = () => {
    logout();
    router.push("/");
  };
  return authorized ? (
    <div className="flex gap-4 justify-end items-center text-xl text-neutral-400">
      <div className="cursor-pointer text-gray" onClick={handleLogout}>
        <UserCircleIcon width={50} height={50} />
      </div>
      {userRole === Role.LEADERGATHERING || userRole === Role.STAFFGATHERING ? (
        <div className="flex justify-center items-center">
          <MapPinIcon width={30} height={30} />
          Điểm tập kết
        </div>
      ) : userRole === Role.LEADERTRANSACTION ||
        userRole === Role.STAFFTRANSACTION ? (
        <div className="flex justify-center items-center">
          <MapPinIcon width={30} height={30} />
          Điểm giao dịch{" "}
        </div>
      ) : (
        ""
      )}
    </div>
  ) : (
    <div className="w-fit justify-end inline-flex text-center text-sm text-stone-600 font-semibold">
      <Link className="px-2 hover:underline" href="/home/signIn">
        Đăng nhập
      </Link>
    </div>
  );
}
