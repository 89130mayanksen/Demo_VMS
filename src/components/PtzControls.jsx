import React from "react";
import {
  RefreshCcw,
  ZoomIn,
  ZoomOut,
  ChevronUp,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

export default function PtzControls() {
  const buttonBaseClasses =
    "w-12 h-12 rounded-full flex items-center justify-center transition-all duration-200 ease-in-out cursor-default";
  const directionalButtonClasses = `${buttonBaseClasses} bg-gray-700 text-gray-300 hover:bg-gray-600 shadow-md`;
  const centerButtonClasses = `${buttonBaseClasses} bg-blue-600 text-white hover:bg-blue-700 shadow-lg`;
  const zoomButtonClasses = `${buttonBaseClasses} bg-gray-700 text-gray-300 hover:bg-gray-600 shadow-md`;

  return (
    <div className="fixed bottom-[10px] left-[10px] py-5 px-3 bg-gray-900 rounded-xl shadow-2xl max-w-[210px] mx-auto font-sans">
      <h2 className="text-lg font-bold mb-5 text-white text-center">
        PTZ Controls
      </h2>

      <div className="grid grid-cols-3 aspect-square gap-4">
        <div className="flex items-center justify-center">
          <button className={directionalButtonClasses}>
            <ChevronUp size={24} className="transform -rotate-45" />
          </button>
        </div>

        <div className="flex items-center justify-center">
          <button className={directionalButtonClasses}>
            <ChevronUp size={24} />
          </button>
        </div>

        <div className="flex items-center justify-center">
          <button className={directionalButtonClasses}>
            <ChevronUp size={24} className="transform rotate-45" />
          </button>
        </div>

        <div className="flex items-center justify-center">
          <button className={directionalButtonClasses}>
            <ChevronLeft size={24} />
          </button>
        </div>

        <div className="flex items-center justify-center">
          <button className={centerButtonClasses}>
            <RefreshCcw size={28} />
          </button>
        </div>

        <div className="flex items-center justify-center">
          <button className={directionalButtonClasses}>
            <ChevronRight size={24} />
          </button>
        </div>

        <div className="flex items-center justify-center">
          <button className={directionalButtonClasses}>
            <ChevronDown size={24} className="transform rotate-45" />
          </button>
        </div>

        <div className="flex items-center justify-center">
          <button className={directionalButtonClasses}>
            <ChevronDown size={24} />
          </button>
        </div>

        <div className="flex items-center justify-center">
          <button className={directionalButtonClasses}>
            <ChevronDown size={24} className="transform -rotate-45" />
          </button>
        </div>
      </div>

      <div className="flex items-center justify-center gap-6 mt-8">
        <button className={zoomButtonClasses}>
          <ZoomOut size={24} />
        </button>
        <button className={zoomButtonClasses}>
          <ZoomIn size={24} />
        </button>
      </div>
    </div>
  );
}
