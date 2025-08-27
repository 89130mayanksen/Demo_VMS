import React, { useState } from "react";
import { Search } from "lucide-react";

export default function ScreenshotGallery({ screenshots }) {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredScreenshots = (screenshots || []).filter((screenshot) =>
    screenshot.fileName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-4 fixed right-0 left-[220px] top-15 h-full w-[400px] border rounded-md border-black bg-[#202123]">
      <div className="relative w-full max-w-2xl mx-auto mb-2">
        <input
          type="text"
          placeholder="Search screenshots by name..."
          value={searchQuery}
          onChange={handleSearchChange}
          className="w-full pl-10 pr-4 py-2 rounded-lg bg-gray-800 text-white border-none focus:ring-2 focus:ring-blue-500 focus:outline-none"
        />
        <Search
          size={20}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
        />
      </div>

      <div className="grid grid-cols-1 gap-2">
        {filteredScreenshots.length > 0 ? (
          filteredScreenshots.map((screenshot, index) => (
            <div
              key={index}
              className="bg-gray-700 rounded-lg overflow-hidden shadow-lg flex flex-col"
            >
              <img
                src={screenshot.dataUrl}
                alt={screenshot.fileName}
                className="w-[80px] h-auto rounded-md mr-2"
              />
              <p className="text-sm text-gray-300 truncate">
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
  );
}
