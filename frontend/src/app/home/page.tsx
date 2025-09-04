"use client";
import Board from "@/app/components/Board";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function HomePage() {
  const router = useRouter();
  const [mode, setMode] = useState<"pve" | "pvp" | null>(null);
  const [user, setUser] = useState<{ username: string } | null>(null);
  const [difficulty, setDifficulty] = useState<
    "easy" | "medium" | "hard" | null
  >(null);

  // Load user từ localStorage khi vào trang
  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  // Đăng xuất
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    alert("🚪 Đã đăng xuất!");
  };

  return (
    <main className="flex flex-col min-h-screen relative text-gray-800">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100"></div>
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage:
            "linear-gradient(to right, #ccc 1px, transparent 1px), linear-gradient(to bottom, #ccc 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      ></div>

      {/* Nội dung chính */}
      <div className="relative z-10 flex flex-col min-h-screen">
        {/* Header */}
        <header className="w-full py-4 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 shadow-lg flex items-center justify-between px-6 rounded-b-2xl">
          {/* Logo / Tiêu đề */}
          <div className="flex items-center gap-2">
            <span className="text-3xl drop-shadow-lg animate-bounce">🎮</span>
            <h1 className="text-2xl font-extrabold text-white drop-shadow-md">
              Cờ Caro AI
            </h1>
          </div>

          {/* Nút Đăng nhập / Đăng xuất */}
          <div className="flex items-center gap-3">
            {user ? (
              <div className="flex items-center gap-3 bg-white/20 px-3 py-1 rounded-lg backdrop-blur-sm">
                <span className="text-white font-medium flex items-center gap-1">
                  👤 {user.username}
                </span>
                <button
                  onClick={handleLogout}
                  className="px-3 py-1 rounded-lg bg-red-500 text-white font-semibold hover:bg-red-600 shadow-md"
                >
                  🚪 Thoát
                </button>
              </div>
            ) : (
              <button
                onClick={() => router.push("/sign_in")}
                className="px-4 py-2 rounded-lg bg-yellow-400 text-gray-900 font-bold hover:bg-yellow-500 shadow-md transition"
              >
                🔑 Đăng nhập
              </button>
            )}
          </div>
        </header>

        {/* Main Content */}
        <section className="flex-1 flex items-center justify-center w-full p-6">
          {!mode ? (
            // Giao diện chọn chế độ chơi
            <div className="bg-white/90 p-10 rounded-2xl shadow-2xl text-center space-y-6 max-w-md w-full border border-purple-200">
              <h2 className="text-3xl font-extrabold text-gray-800 mb-6">
                🚀 Chọn chế độ chơi
              </h2>

              {/* Chơi với AI */}
              <button
                onClick={() => setMode("pve")}
                className="group w-full px-6 py-5 rounded-xl bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold shadow-lg transform transition duration-300 hover:scale-105 hover:shadow-2xl"
              >
                <div className="flex flex-col items-center">
                  <span className="text-5xl mb-2">🤖</span>
                  <span className="text-lg">Chơi 1 mình</span>
                  <p className="text-sm text-blue-100 mt-1 opacity-90">
                    Đối đầu AI thông minh
                  </p>
                </div>
              </button>

              {/* Chơi 2 người */}
              <button
                onClick={() => setMode("pvp")}
                className="group w-full px-6 py-5 rounded-xl bg-gradient-to-r from-green-500 to-green-600 text-white font-semibold shadow-lg transform transition duration-300 hover:scale-105 hover:shadow-2xl"
              >
                <div className="flex flex-col items-center">
                  <span className="text-5xl mb-2">👥</span>
                  <span className="text-lg">Chơi 2 người</span>
                  <p className="text-sm text-green-100 mt-1 opacity-90">
                    Thách đấu cùng bạn bè
                  </p>
                </div>
              </button>
            </div>
          ) : mode === "pve" && !difficulty ? (
            // Nếu chọn chế độ "pve" nhưng chưa chọn mức độ
            <div className="bg-white/90 p-10 rounded-2xl shadow-2xl text-center space-y-6 max-w-md w-full border border-blue-200">
              <h2 className="text-2xl font-bold text-gray-800">
                🧠 Chọn mức độ đối thủ AI
              </h2>
              <div className="grid gap-4">
                <button
                  onClick={() => setDifficulty("easy")}
                  className="w-full px-6 py-4 rounded-xl bg-blue-400 hover:bg-blue-500 text-white font-semibold transition"
                >
                  🐣 Dễ
                </button>
                <button
                  onClick={() => setDifficulty("medium")}
                  className="w-full px-6 py-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold transition"
                >
                  🧩 Trung bình
                </button>
                <button
                  onClick={() => setDifficulty("hard")}
                  className="w-full px-6 py-4 rounded-xl bg-blue-800 hover:bg-blue-900 text-white font-semibold transition"
                >
                  🧠 Khó
                </button>
              </div>
            </div>
          ) : (
            // Board game hiển thị khi đã chọn đủ chế độ & độ khó
            <div className="p-6 bg-white/95 rounded-xl shadow-2xl border border-indigo-200">
              <Board mode={mode} difficulty={difficulty} />
            </div>
          )}
        </section>

        {/* Footer */}
        <footer className="w-full py-4 text-center text-sm text-white bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 shadow-inner">
          © {new Date().getFullYear()} Caro AI Project · Made with ❤️ by Fen
        </footer>
      </div>
    </main>
  );
}
