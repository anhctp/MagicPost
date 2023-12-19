"use client";
import { login } from "@/services/user/userApi";
import useAuthStore from "@/stores/authStore";
import { useUserStore } from "@/stores/userStore";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Signin() {
  const input =
    "w-[400px] focus:outline-none text-lg rounded-2xl border border-stone-600 p-1 px-2 ";
  const router = useRouter();
  const [password, setPassword] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const handleLogin = async () => {
    if (email && password) {
      const res = await login({
        email: email,
        password: password,
      });
      useAuthStore.getState().setToken(res.data.jwtToken);
      useAuthStore.getState().setAuthorized(true);
      const newUser = res.data.user;
      localStorage.setItem("user", JSON.stringify(newUser));
      useUserStore.getState().setUser(newUser);
      localStorage.setItem("token", res.data.jwtToken);
      router.push("/");
    }
  };
  return (
    <div className="w-screen px-5 items-center inline-flex relative">
      <div className="w-full h-fit justify-start items-center">
        <img src="/2.png" className="max-w-[440px]" />
      </div>
      <div className="w-full h-fit border-l border-stone-600 justify-center items-center block">
        <div className="space-y-5">
          <h2 className="text-center text-stone-600 text-2xl font-bold">
            Đăng nhập
          </h2>
          <div className="flex justify-center">
            <input
              type="email"
              name="email"
              required
              placeholder="Email"
              className={input}
              value={email}
              onChange={(event) => {
                setEmail(event.target.value);
              }}
            />
          </div>
          <div className="flex justify-center">
            <input
              type="password"
              name="password"
              required
              placeholder="Password"
              className={input}
              value={password}
              onChange={(event) => {
                setPassword(event.target.value);
              }}
            />
          </div>
          <div className="flex justify-center">
            <button
              className="text-lg rounded-2xl border border-stone-600 hover:bg-stone-600 hover:text-white p-1 px-4 text-stone-600 font-semibold"
              onClick={handleLogin}
            >
              Đăng nhập
            </button>
          </div>
          <p className="text-center text-stone-600 font-semibold text-lg">
            Chưa có tài khoản?
            <Link
              href="/home/signUp"
              className="text-neutral-400 hover:underline"
            >
              {" "}
              Đăng ký ngay!
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
