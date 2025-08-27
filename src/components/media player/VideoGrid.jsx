import React, { useRef, useState, useEffect } from "react";
import LiveStream from "../LiveStream";
import GlobalMediaPlayer from "./GlobalMediaPlayer";
import CameraManager from "../CameraManager";
import clsx from "clsx";
import demoVideo from "../../assets/demoVideo.mp4";

const STREAM_URL =
  "http://ec2-65-0-181-71.ap-south-1.compute.amazonaws.com:8888/Test_Cam_1/index.m3u8";

export default function VideoGrid() {
  const videoRefs = useRef([]);
  const [focusedIndex, setFocusedIndex] = useState(0);
  const [isDoubled, setIsDoubled] = useState(false);
  const [streams, setStreams] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStream = async () => {
      try {
        setLoading(true);
        setStreams([{ id: 0, webrtcUrl: STREAM_URL }]);
      } catch (error) {
        console.error("Failed to set stream URL:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchStream();
  }, []);

  const handleFocus = (index) => {
    setFocusedIndex(index);
    if (index !== focusedIndex) {
      setIsDoubled(false);
    }
  };

  const handleToggleSize = () => {
    if (focusedIndex !== null) {
      setIsDoubled(!isDoubled);
    }
  };

  const containerClasses = clsx("flex fixed top-[60px] flex-col h-[800px]", {
    "items-center": isDoubled,
  });

  const gridClasses = clsx(
    "gap-2 bg-gray-900 p-1 place-items-center w-[1200px]",
    {
      flex: true,
      "justify-center items-center": true,
    }
  );

  return (
    <div className="flex flex-row">
      <div className={containerClasses}>
        <div className={gridClasses}>
          {loading ? (
            <p className="text-white text-lg">Loading live stream...</p>
          ) : (
            streams.map((stream, idx) => (
              <LiveStream
                key={idx}
                webrtcUrl={stream.webrtcUrl}
                demoVideo={demoVideo}
                ref={(el) => (videoRefs.current[idx] = el)}
                onClick={() => handleFocus(idx)}
                isFocused={focusedIndex === idx}
                isDoubled={isDoubled && focusedIndex === idx}
                isSibling={isDoubled && focusedIndex !== idx}
              />
            ))
          )}
        </div>
        <GlobalMediaPlayer
          focusedIndex={focusedIndex}
          videoRefs={videoRefs}
          onToggleSize={handleToggleSize}
          live={true}
        />
      </div>
      <CameraManager />
    </div>
  );
}
