// src/components/Cell.tsx
"use client";

interface CellProps {
  value: string | null;
  onClick: () => void;
}

export default function Cell({ value, onClick }: CellProps) {
    return (
        <button
          onClick={onClick}
          className={`
            w-12 h-12 border border-gray-400 flex items-center justify-center 
            text-2xl font-extrabold transition duration-200
            ${value === "X" ? "text-blue-600" : ""}
            ${value === "O" ? "text-red-600" : ""}
            hover:bg-yellow-50 active:bg-yellow-100
          `}
        >
          {value}
        </button>
      );
      
}
