"use client";

import { useState } from "react";
import Cell from "./Cell";

interface BoardProps {
  mode?: "pve" | "pvp";
  difficulty?: "easy" | "medium" | "hard" | null;
}

const SIZE = 15;

export default function Board({ mode = "pvp", difficulty }: BoardProps) {
  const [board, setBoard] = useState<(string | null)[][]>(
    Array(SIZE)
      .fill(null)
      .map(() => Array(SIZE).fill(null))
  );
  const [currentPlayer, setCurrentPlayer] = useState<"X" | "O">("X");

  async function handleClick(row: number, col: number) {
    if (board[row][col]) return;

    const newBoard = board.map((r) => [...r]);
    newBoard[row][col] = currentPlayer;
    setBoard(newBoard);

    // Nếu PVP: đổi lượt
    if (mode === "pvp") {
      setCurrentPlayer(currentPlayer === "X" ? "O" : "X");
    }

    // Nếu PVE: gọi AI sau lượt X
    if (mode === "pve") {
      const res = await fetch("http://127.0.0.1:8000/api/move", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          board: newBoard,
          difficulty: difficulty || "easy", // fallback
        }),
      });

      if (!res.ok) {
        const text = await res.text();
        console.error("❌ API error:", res.status, text);
        return;
      }

      const data = await res.json();
      if (data.move) {
        const { x, y } = data.move;
        const updatedBoard = newBoard.map((r) => [...r]);
        updatedBoard[x][y] = "O"; // AI đánh O
        setBoard(updatedBoard);
      }
    }
  }

  return (
    <div className="space-y-4">
      {/* Thông tin trên bàn cờ */}
      <div className="text-center">
        <p className="text-lg font-semibold text-gray-700">
          🎮 Chế độ:{" "}
          <span className="text-indigo-600 font-bold uppercase">{mode}</span>{" "}
          {mode === "pve" && difficulty && (
            <>
              · Mức:{" "}
              <span className="text-blue-600 font-bold capitalize">
                {difficulty}
              </span>
            </>
          )}
        </p>
        {mode === "pvp" && (
          <p className="text-sm text-gray-500 mt-1">
            👤 Lượt của:{" "}
            <span className="font-bold text-purple-600">{currentPlayer}</span>
          </p>
        )}
      </div>

      {/* Bàn cờ */}
      <div className="grid grid-cols-15 gap-0 w-max mx-auto border-2 border-gray-400">
        {board.map((row, i) =>
          row.map((cell, j) => (
            <Cell
              key={`${i}-${j}`}
              value={cell}
              onClick={() => {
                // PVP: chơi bình thường
                if (mode === "pvp") handleClick(i, j);
                // PVE: chỉ cho người X đánh
                if (mode === "pve" && currentPlayer === "X") {
                  handleClick(i, j);
                }
              }}
            />
          ))
        )}
      </div>
    </div>
  );
}
