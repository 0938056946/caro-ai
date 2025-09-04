/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import api from "../api/axios";
import { useRouter } from "next/navigation";

export default function SignPage() {
  const [mode, setMode] = useState<"login" | "register">("login");
  const [form, setForm] = useState({
    username: "",
    password: "",
    password_confirmation: "",
  });
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const url = mode === "login" ? "/login" : "/register";
      const res = await api.post(url, form);

      if (res.data?.status) {
        if (mode === "login") {
          localStorage.setItem("token", res.data.data.token);
          localStorage.setItem("user", JSON.stringify(res.data.data.user));
          alert("✅ Đăng nhập thành công!");
          router.push("/");
        } else {
          alert("🎉 Đăng ký thành công! Mời bạn đăng nhập.");
          setMode("login");
        }
      }
    } catch (err: any) {
      console.error(err);
      alert("❌ Lỗi: " + (err.response?.data?.message || "Có lỗi xảy ra"));
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="relative flex w-[800px] h-[500px] bg-white/90 backdrop-blur-xl shadow-2xl rounded-2xl overflow-hidden">
        {/* Hiệu ứng wave overlay */}
        <AnimatePresence mode="wait">
          <motion.div
            key={mode}
            initial={{
              clipPath:
                mode === "login"
                  ? "circle(0% at 0% 50%)"
                  : "circle(0% at 100% 50%)",
            }}
            animate={{
              clipPath: "circle(150% at 50% 50%)",
            }}
            exit={{
              clipPath:
                mode === "login"
                  ? "circle(0% at 100% 50%)"
                  : "circle(0% at 0% 50%)",
            }}
            transition={{ duration: 1, ease: "easeInOut" }}
            className={`absolute inset-0 ${
              mode === "login"
                ? "bg-gradient-to-br from-blue-500 to-purple-600"
                : "bg-gradient-to-br from-purple-600 to-blue-500"
            }`}
          />
        </AnimatePresence>

        {/* Nội dung */}
        {mode === "login" ? (
          <>
            {/* Hình trái */}
            <div className="flex-1 flex items-center justify-center text-white font-extrabold text-4xl relative z-10 drop-shadow-lg">
              Welcome Back
            </div>

            {/* Form phải */}
            <div className="flex-1 flex items-center justify-center relative z-10">
              <div className="w-72">
                <h2 className="text-3xl font-extrabold mb-6 text-center text-gray-900 drop-shadow">
                  Đăng Nhập
                </h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <input
                    type="text"
                    name="username"
                    placeholder="Tên người dùng"
                    value={form.username}
                    onChange={handleChange}
                    className="w-full p-3 border-2 border-gray-300 rounded-lg text-gray-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-300 transition"
                    required
                  />
                  <input
                    type="password"
                    name="password"
                    placeholder="Mật khẩu"
                    value={form.password}
                    onChange={handleChange}
                    className="w-full p-3 border-2 border-gray-300 rounded-lg text-gray-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-300 transition"
                    required
                  />
                  <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white font-bold p-3 rounded-lg shadow-md hover:from-blue-600 hover:to-purple-600 transition"
                  >
                    Đăng Nhập
                  </button>
                </form>
                <p className="mt-3 text-right">
                  <button className="text-sm font-semibold text-blue-600 hover:underline">
                    Quên mật khẩu?
                  </button>
                </p>
                <p className="mt-4 text-center text-sm text-gray-800">
                  Chưa có tài khoản?{" "}
                  <button
                    onClick={() => setMode("register")}
                    className="text-blue-600 font-semibold hover:underline"
                  >
                    Đăng ký ngay
                  </button>
                </p>
              </div>
            </div>
          </>
        ) : (
          <>
            {/* Form trái */}
            <div className="flex-1 flex items-center justify-center relative z-10">
              <div className="w-72">
                <h2 className="text-3xl font-extrabold mb-6 text-center text-gray-900 drop-shadow">
                  Đăng Ký
                </h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <input
                    type="text"
                    name="username"
                    placeholder="Tên người dùng"
                    value={form.username}
                    onChange={handleChange}
                    className="w-full p-3 border-2 border-gray-300 rounded-lg text-gray-900 focus:border-purple-500 focus:ring-2 focus:ring-purple-300 transition"
                    required
                  />
                  <input
                    type="password"
                    name="password"
                    placeholder="Mật khẩu"
                    value={form.password}
                    onChange={handleChange}
                    className="w-full p-3 border-2 border-gray-300 rounded-lg text-gray-900 focus:border-purple-500 focus:ring-2 focus:ring-purple-300 transition"
                    required
                  />
                  <input
                    type="password"
                    name="password_confirmation"
                    placeholder="Xác nhận mật khẩu"
                    value={form.password_confirmation}
                    onChange={handleChange}
                    className="w-full p-3 border-2 border-gray-300 rounded-lg text-gray-900 focus:border-purple-500 focus:ring-2 focus:ring-purple-300 transition"
                    required
                  />
                  <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-purple-500 to-blue-500 text-white font-bold p-3 rounded-lg shadow-md hover:from-purple-600 hover:to-blue-600 transition"
                  >
                    Đăng Ký
                  </button>
                </form>
                <p className="mt-4 text-center text-sm text-gray-800">
                  Đã có tài khoản?{" "}
                  <button
                    onClick={() => setMode("login")}
                    className="text-blue-600 font-semibold hover:underline"
                  >
                    Đăng nhập
                  </button>
                </p>
              </div>
            </div>

            {/* Hình phải */}
            <div className="flex-1 flex items-center justify-center text-white font-extrabold text-4xl relative z-10 drop-shadow-lg">
              Join Us Today
            </div>
          </>
        )}
      </div>
    </div>
  );
}
