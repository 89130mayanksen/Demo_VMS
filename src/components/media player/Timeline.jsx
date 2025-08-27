import React, { useState, useRef, useEffect } from "react";

const Timeline = ({ focusedIndex, videoRefs }) => {
  const [currentTimes, setCurrentTimes] = useState({});
  const [isDragging, setIsDragging] = useState(false);
  const timelineRef = useRef(null);

  const FIXED_DURATION = 120;
  const divisions = 8;

  const formatTime = (sec) => {
    if (isNaN(sec) || sec < 0) return "0:00";
    const m = Math.floor(sec / 60);
    const s = Math.floor(sec % 60);
    return `${m}:${s.toString().padStart(2, "0")}`;
  };

  const getFocusedVideo = () => {
    if (focusedIndex === null) return null;
    const parentDiv = videoRefs.current[focusedIndex];
    if (parentDiv) {
      return parentDiv.querySelector("video");
    }
    return null;
  };

  const updatePosition = (clientX) => {
    if (!timelineRef.current) return;
    const rect = timelineRef.current.getBoundingClientRect();
    let percent = (clientX - rect.left) / rect.width;
    percent = Math.max(0, Math.min(1, percent));
    const newTime = percent * FIXED_DURATION;

    const focusedVideo = getFocusedVideo();
    if (focusedVideo && focusedVideo.duration) {
      focusedVideo.currentTime =
        (newTime / FIXED_DURATION) * focusedVideo.duration;
    }
  };

  const handleMouseDown = (e) => {
    setIsDragging(true);
    updatePosition(e.clientX);
  };

  const handleMouseMove = (e) => {
    if (isDragging) updatePosition(e.clientX);
  };

  const handleMouseUp = () => setIsDragging(false);

  useEffect(() => {
    if (isDragging) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
    } else {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    }
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging, handleMouseMove, handleMouseUp]);

  useEffect(() => {
    const videoElements = videoRefs.current
      .map((ref) => ref.querySelector("video"))
      .filter(Boolean);

    const handleTimeUpdate = (e) => {
      if (!isDragging) {
        const video = e.target;
        const index = videoRefs.current.findIndex(
          (ref) => ref.querySelector("video") === video
        );

        if (video.duration) {
          const scaledTime =
            (video.currentTime / video.duration) * FIXED_DURATION;
          setCurrentTimes((prev) => ({ ...prev, [index]: scaledTime }));
        }
      }
    };

    videoElements.forEach((video) => {
      video.addEventListener("timeupdate", handleTimeUpdate);
    });

    return () => {
      videoElements.forEach((video) => {
        video.removeEventListener("timeupdate", handleTimeUpdate);
      });
    };
  }, [isDragging, videoRefs]);

  const getProgressPercentage = (index) => {
    const currentTime = currentTimes[index] || 0;
    return `${(currentTime / FIXED_DURATION) * 100}%`;
  };

  return (
    <div className="bg-gray-900 text-white p-3">
      <div
        ref={timelineRef}
        className="relative w-full rounded cursor-pointer"
        onMouseDown={handleMouseDown}
      >
        {videoRefs.current.map((_, index) => (
          <div
            key={index}
            className="relative w-full h-[15px] bg-gray-700 my-[0.9px]"
          >
            <div className="absolute inset-0 flex z-0">
              {Array.from({ length: divisions }).map((_, i) => (
                <div
                  key={i}
                  className="h-full border-l border-gray-500/40"
                  style={{ flex: 1 }}
                />
              ))}
            </div>

            <div
              className="absolute top-0 w-[2px] h-full bg-red-500 rounded cursor-grab z-10"
              style={{
                left: getProgressPercentage(index),
                transform: "translateX(-50%)",
              }}
            />
          </div>
        ))}
      </div>

      <div className="flex justify-between text-xs mt-1 text-gray-300">
        {Array.from({ length: divisions + 1 }).map((_, i) => (
          <span key={i}>{formatTime(i * 15)}</span>
        ))}
      </div>
    </div>
  );
};

export default Timeline;
