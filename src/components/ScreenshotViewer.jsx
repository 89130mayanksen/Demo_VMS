import React, { useState } from "react";
import { Search } from "lucide-react";

export default function ScreenshotViewer({ screenshots }) {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredScreenshots = (screenshots || []).filter((screenshot) =>
    screenshot.fileName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="fixed top-[120px] right-0 left-[220px] h-[670px] bg-gray-800 rounded-lg overflow-hidden shadow-2xl flex flex-col justify-center min-w-[900px]">
      <div className="p-4 border-b border-gray-700 relative w-full">
        <input
          type="text"
          placeholder="Search screenshots by name..."
          value={searchQuery}
          onChange={handleSearchChange}
          className="w-full pl-10 pr-4 py-2 rounded-lg bg-gray-700 text-white border-none focus:ring-2 focus:ring-blue-500 focus:outline-none"
        />
        <Search
          size={20}
          className="absolute left-7 top-1/2 -translate-y-1/2 text-gray-400"
        />
      </div>

      <div className="flex-grow p-4 overflow-y-auto">
        <div className="grid grid-cols-4 gap-4">
          {filteredScreenshots.length > 0 ? (
            filteredScreenshots.map((screenshot, index) => (
              <div
                key={index}
                className="bg-gray-700 rounded-lg overflow-hidden shadow-lg flex flex-col columns-4"
              >
                <img
                  src={screenshot.dataUrl}
                  alt={screenshot.fileName}
                  className="w-full h-auto object-cover cursor-pointer"
                  onClick={() => window.open(screenshot.dataUrl, "_blank")}
                />
                <p className="p-2 text-sm text-gray-300 truncate text-center bg-gray-800">
                  {screenshot.fileName}
                </p>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500 col-span-full">
              No screenshots match your search.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
