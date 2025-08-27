import React from "react";
import { UploadCloud } from "lucide-react";

export default function UploadTile() {
  return (
    <button
      className="fixed right-10 bottom-10 w-16 h-16 flex items-center justify-center 
                 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full 
                 shadow-lg transform transition-all duration-300 
                 hover:scale-110 hover:bg-white/20 hover:border-white/30 
                 cursor-pointer group focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-gray-900"
    >
      <div className="absolute inset-0 bg-white/5 backdrop-blur-md rounded-full"></div>

      <UploadCloud
        size={28}
        className="relative z-10 text-white opacity-70 transition-transform 
                   duration-300 group-hover:scale-110 group-hover:opacity-100"
      />
    </button>
  );
}
