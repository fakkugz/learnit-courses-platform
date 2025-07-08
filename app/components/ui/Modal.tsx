'use client';
import { ReactNode } from "react";

export default function Modal({ children, onClose }: { children: ReactNode, onClose: () => void }) {
  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50 px-4">
      <div className="bg-white rounded-xl shadow-xl max-w-md w-full p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 cursor-pointer"
        >
          ❌
        </button>
        {children}
      </div>
    </div>
  );
}
