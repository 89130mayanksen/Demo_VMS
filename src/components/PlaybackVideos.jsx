import React, { useRef, useState, useEffect } from "react";
import VideoTile from "./media player/VideoTile";
import GlobalMediaPlayer from "./media player/GlobalMediaPlayer";
import Timeline from "./media player/Timeline";
import clsx from "clsx";
import VideoList from "./VideoList";
import axios from "axios";

const API_BASE = "https://ec2-65-0-181-71.ap-south-1.compute.amazonaws.com";

export default function PlaybackVideos() {
  const videoRefs = useRef([]);
  const [focusedIndex, setFocusedIndex] = useState(null);
  const [isDoubled, setIsDoubled] = useState(false);
  const [selectedRecordingIds, setSelectedRecordingIds] = useState([]);
  const [recordings, setRecordings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [retryCount, setRetryCount] = useState(0);

  useEffect(() => {
    const fetchRecordings = async () => {
      try {
        setLoading(true);
        setError(null);
        // ✅ Change API call to fetch recordings
        const response = await axios.get(`${API_BASE}/getallrecordings`);
        const fetchedRecordings = response.data.map((rec) => ({
          id: rec.id,
          name: rec.filename,
          src: rec.downloadUrl, // Assuming the API returns a direct download URL
        }));
        setRecordings(fetchedRecordings);
        setSelectedRecordingIds(fetchedRecordings.map((rec) => rec.id));
      } catch (err) {
        console.error("Failed to fetch recordings:", err);
        setError(
          "Failed to load recordings. Please check the network connection."
        );
      } finally {
        setLoading(false);
      }
    };
    fetchRecordings();
  }, [retryCount]);

  const sources = recordings.filter((rec) =>
    selectedRecordingIds.includes(rec.id)
  );

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

  const handleVideoSelection = (ids) => {
    setSelectedRecordingIds(ids);
  };

  const handleReload = () => {
    setRetryCount((prevCount) => prevCount + 1);
  };

  const gridClasses = clsx(
    "gap-2 bg-gray-900 p-1 place-items-center w-[900px]",
    {
      flex: isDoubled,
      "grid grid-cols-2 grid-rows-2": !isDoubled,
    }
  );

  if (loading) {
    return (
      <div className="flex fixed top-[120px] h-[565px] w-[900px] items-center justify-center text-white text-lg">
        Loading recordings...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex fixed top-[120px] h-[565px] w-[900px] flex-col items-center justify-center text-white text-lg p-4">
        <p className="mb-4 text-red-500">{error}</p>
        <button
          onClick={handleReload}
          className="px-4 py-2 bg-blue-600 rounded-md hover:bg-blue-700 transition"
        >
          Reload
        </button>
      </div>
    );
  }

  return (
    <div className="flex fixed top-[120px] h-[565px]">
      <div className="flex flex-col">
        <div className={gridClasses}>
          {sources.map((source, idx) => (
            <VideoTile
              key={source.id}
              src={source.src}
              ref={(el) => (videoRefs.current[idx] = el)}
              onClick={() => handleFocus(idx)}
              isFocused={focusedIndex === idx}
              isDoubled={isDoubled && focusedIndex === idx}
              isSibling={isDoubled && focusedIndex !== idx}
            />
          ))}
        </div>
        <div>
          <GlobalMediaPlayer
            focusedIndex={focusedIndex}
            videoRefs={videoRefs}
            onToggleSize={handleToggleSize}
            live={false} // ⬅️ Set live to false for recordings
          />
        </div>
        {focusedIndex !== null && (
          <Timeline focusedIndex={focusedIndex} videoRefs={videoRefs} />
        )}
      </div>
      <VideoList
        allVideos={recordings} // ✅ Pass recordings to the list component
        onSelectionChange={handleVideoSelection}
        initialSelected={selectedRecordingIds}
      />
    </div>
  );
}
//
//
//
//
//
//
//
//
//

// import React, { useRef, useState, useEffect } from "react";
// import VideoTile from "./media player/VideoTile";
// import GlobalMediaPlayer from "./media player/GlobalMediaPlayer";
// import Timeline from "./media player/Timeline";
// import clsx from "clsx";
// import VideoList from "./VideoList";
// import axios from "axios";

// const API_BASE = "https://ec2-65-0-181-71.ap-south-1.compute.amazonaws.com";

// export default function PlaybackVideos() {
//   const videoRefs = useRef([]);
//   const [focusedIndex, setFocusedIndex] = useState(null);
//   const [isDoubled, setIsDoubled] = useState(false);
//   const [selectedVideoIds, setSelectedVideoIds] = useState([]);
//   const [cameras, setCameras] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [retryCount, setRetryCount] = useState(0);

//   useEffect(() => {
//     const fetchCameras = async () => {
//       try {
//         setLoading(true);
//         setError(null);
//         const response = await axios.get(`${API_BASE}/getcameras`);
//         const fetchedCameras = response.data.map((cam) => ({
//           id: cam.id,
//           name: cam.name,
//           src: cam.rtspUrl,
//           pathName: cam.pathName,
//         }));
//         setCameras(fetchedCameras);
//         setSelectedVideoIds(fetchedCameras.map((cam) => cam.id));
//       } catch (err) {
//         console.error("Failed to fetch cameras:", err);
//         setError(
//           "Failed to load video streams. Please check the network connection."
//         );
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchCameras();
//   }, [retryCount]);

//   const sources = cameras.filter((cam) => selectedVideoIds.includes(cam.id));

//   const handleFocus = (index) => {
//     setFocusedIndex(index);
//     if (index !== focusedIndex) {
//       setIsDoubled(false);
//     }
//   };

//   const handleToggleSize = () => {
//     if (focusedIndex !== null) {
//       setIsDoubled(!isDoubled);
//     }
//   };

//   const handleVideoSelection = (ids) => {
//     setSelectedVideoIds(ids);
//   };

//   const handleReload = () => {
//     setRetryCount((prevCount) => prevCount + 1);
//   };

//   const gridClasses = clsx(
//     "gap-2 bg-gray-900 p-1 place-items-center w-[900px]",
//     {
//       flex: isDoubled,
//       "grid grid-cols-2 grid-rows-2": !isDoubled,
//     }
//   );

//   if (loading) {
//     return (
//       <div className="flex fixed top-[120px] h-[565px] w-[900px] items-center justify-center text-white text-lg">
//         Loading cameras...
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="flex fixed top-[120px] h-[565px] w-[900px] flex-col items-center justify-center text-white text-lg p-4">
//         <p className="mb-4 text-red-500">{error}</p>
//         <button
//           onClick={handleReload}
//           className="px-4 py-2 bg-blue-600 rounded-md hover:bg-blue-700 transition"
//         >
//           Reload
//         </button>
//       </div>
//     );
//   }

//   return (
//     <div className="flex fixed top-[120px] h-[565px]">
//       <div className="flex flex-col">
//         <div className={gridClasses}>
//           {sources.map((source, idx) => (
//             <VideoTile
//               key={source.id}
//               src={source.src}
//               ref={(el) => (videoRefs.current[idx] = el)}
//               onClick={() => handleFocus(idx)}
//               isFocused={focusedIndex === idx}
//               isDoubled={isDoubled && focusedIndex === idx}
//               isSibling={isDoubled && focusedIndex !== idx}
//             />
//           ))}
//         </div>
//         <div>
//           <GlobalMediaPlayer
//             focusedIndex={focusedIndex}
//             videoRefs={videoRefs}
//             onToggleSize={handleToggleSize}
//           />
//         </div>
//         {focusedIndex !== null && (
//           <Timeline focusedIndex={focusedIndex} videoRefs={videoRefs} />
//         )}
//       </div>
//       <VideoList
//         allVideos={cameras}
//         onSelectionChange={handleVideoSelection}
//         initialSelected={selectedVideoIds}
//       />
//     </div>
//   );
// }
