import React, { useState } from "react";
import { Search } from "lucide-react";
import clsx from "clsx";

export default function VideoList({
  allVideos,
  onSelectionChange,
  initialSelected,
}) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedVideos, setSelectedVideos] = useState(initialSelected || []);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleCheckboxChange = (id) => {
    let newSelectedVideos;
    if (selectedVideos.includes(id)) {
      newSelectedVideos = selectedVideos.filter((videoId) => videoId !== id);
    } else {
      newSelectedVideos = [...selectedVideos, id];
    }
    setSelectedVideos(newSelectedVideos);
    onSelectionChange(newSelectedVideos);
  };

  const filteredVideos = allVideos.filter((video) =>
    video.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex-col fixed left-[1120px] right-0 h-full bg-gray-800 p-4 overflow-y-auto">
      <div className="relative mb-4">
        <input
          type="text"
          placeholder="Search videos..."
          value={searchQuery}
          onChange={handleSearchChange}
          className="w-full pl-10 pr-4 py-2 rounded-lg bg-gray-700 text-white border-none focus:ring-2 focus:ring-blue-500 focus:outline-none"
        />
        <Search
          size={20}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
        />
      </div>

      <div className="flex flex-col gap-2">
        {filteredVideos.map((video) => (
          <div
            key={video.id}
            className="flex items-center space-x-2 p-2 bg-gray-700 rounded-lg"
          >
            <input
              type="checkbox"
              id={video.id}
              checked={selectedVideos.includes(video.id)}
              onChange={() => handleCheckboxChange(video.id)}
              className="form-checkbox text-blue-500 rounded"
            />
            <label
              htmlFor={video.id}
              className="text-white text-sm cursor-pointer truncate"
            >
              {video.name}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
}
