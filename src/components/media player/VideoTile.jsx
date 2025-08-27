import React, { useRef, useState, useEffect, forwardRef } from "react";
import clsx from "clsx";

const VideoTile = forwardRef(
  ({ src, onClick, isFocused, isDoubled, isSibling }, ref) => {
    const videoRef = useRef();
    const [videoStatus, setVideoStatus] = useState("loading"); // ⬅️ New state
    const [reloadCount, setReloadCount] = useState(0);

    const handleLoad = () => {
      setVideoStatus("success");
    };

    const handleError = () => {
      setVideoStatus("error");
    };

    const handleReload = () => {
      setReloadCount((prev) => prev + 1);
    };

    useEffect(() => {
      // ⬅️ Reset status and load the video when src or reloadCount changes
      if (videoRef.current && src) {
        setVideoStatus("loading");
        videoRef.current.src = src;
        videoRef.current.load();
      }
    }, [src, reloadCount]);

    const containerClasses = clsx(
      "aspect-video w-full transition-all duration-500 ease-in-out relative overflow-hidden",
      {
        "border-4 border-blue-500": isFocused,
        "border-transparent": !isFocused,
        "w-[900px] max-w-none z-20": isDoubled,
        hidden: isSibling,
        "max-w-[500px] min-w-[400px]": !isDoubled && !isSibling,
      }
    );

    return (
      <div onClick={onClick} ref={ref} className={containerClasses}>
        {videoStatus === "success" ? (
          <video
            ref={videoRef}
            className="w-full h-full object-cover"
            autoPlay
            playsInline
            onLoadedData={handleLoad}
            onError={handleError}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gray-900 text-white">
            {videoStatus === "loading" && <p>Loading video...</p>}
            {videoStatus === "error" && (
              <div className="flex flex-col items-center gap-4 p-4">
                <p className="text-red-500 text-center">
                  Failed to load video.
                </p>
                <button
                  onClick={handleReload}
                  className="px-4 py-2 bg-blue-600 rounded-md hover:bg-blue-700 transition"
                >
                  Reload
                </button>
              </div>
            )}
          </div>
        )}

        {isFocused && (
          <span className="absolute top-2 left-2 bg-blue-500 text-white px-2 py-1 text-xs rounded">
            Focused
          </span>
        )}
      </div>
    );
  }
);

export default VideoTile;
//
//
//
//
//
//
//
//
//

// import React, { forwardRef } from "react";
// import clsx from "clsx";

// const VideoTile = forwardRef(
//   ({ src, onClick, isFocused, isDoubled, isSibling }, ref) => {
//     const containerClasses = clsx(
//       "aspect-video w-full relative overflow-hidden",
//       {
//         "border-4 border-blue-500": isFocused,
//         "border-transparent": !isFocused,

//         "max-w-none z-20": isDoubled,
//         hidden: isSibling,
//         "max-w-full": !isDoubled && !isSibling,
//       }
//     );

//     return (
//       <div onClick={onClick} ref={ref} className={containerClasses}>
//         <video src={src} muted className="w-full h-full object-cover" />
//         {isFocused && (
//           <span className="absolute top-2 left-2 bg-blue-500 text-white px-2 py-1 text-xs rounded">
//             Focused
//           </span>
//         )}
//       </div>
//     );
//   }
// );

// export default VideoTile;
