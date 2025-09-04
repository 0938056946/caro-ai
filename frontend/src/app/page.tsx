"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function SplashScreen() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push("/home"); // sau 2.5s thì vào trang Home
    }, 2500);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <main className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-200 to-blue-400">
      <div className="text-center animate-pulse">
        <h1 className="text-5xl font-extrabold text-white mb-4">
          🎮 Cờ Caro AI
        </h1>
        <p className="text-lg text-white opacity-80">
          Đang tải ứng dụng...
        </p>
      </div>
    </main>
  );
}
