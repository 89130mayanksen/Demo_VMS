import React, { useState, useEffect } from "react";
import {
  Play,
  Pause,
  Volume2,
  SkipBack,
  SkipForward,
  RotateCcw,
  Maximize,
  Camera,
  CircleDot,
  Square,
} from "lucide-react";
import axios from "axios";

const API_BASE = "https://ec2-65-0-181-71.ap-south-1.compute.amazonaws.com";

export default function GlobalMediaPlayer({
  focusedIndex,
  videoRefs,
  onToggleSize,
  live,
  cameras,
}) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isRecording, setIsRecording] = useState(false);

  const getFocusedVideo = () => {
    if (focusedIndex === null) return null;
    const parentDiv = videoRefs.current[focusedIndex];
    if (parentDiv) {
      return parentDiv.querySelector("video");
    }
    return null;
  };

  const getFocusedCameraId = () => {
    if (focusedIndex === null || !cameras || !cameras[focusedIndex]) {
      return null;
    }
    return cameras[focusedIndex].id;
  };

  const handleStartRecording = async () => {
    const cameraId = getFocusedCameraId();
    if (!cameraId) return alert("Please select a camera first.");

    try {
      await axios.post(`${API_BASE}/startrecording`, { cameraId });
      setIsRecording(true);
      alert(`Recording started for camera ${cameraId}`);
    } catch (err) {
      console.error("Failed to start recording:", err);
      alert("Failed to start recording.");
    }
  };

  const handleStopRecording = async () => {
    const cameraId = getFocusedCameraId();
    if (!cameraId) return alert("Please select a camera first.");

    try {
      await axios.post(`${API_BASE}/stoprecording`, { cameraId });
      setIsRecording(false);
      alert(`Recording stopped for camera ${cameraId}`);
    } catch (err) {
      console.error("Failed to stop recording:", err);
      alert("Failed to stop recording.");
    }
  };

  const togglePlay = () => {
    const video = getFocusedVideo();
    if (!video) return;

    if (video.paused) {
      video.play();
      setIsPlaying(true);
    } else {
      video.pause();
      setIsPlaying(false);
    }
  };

  const resetVideo = () => {
    const video = getFocusedVideo();
    if (video) {
      video.currentTime = 0;
      video.pause();
      setIsPlaying(false);
    }
  };

  const skipForward = () => {
    const video = getFocusedVideo();
    if (video) video.currentTime += 5;
  };

  const skipBackward = () => {
    const video = getFocusedVideo();
    if (video) video.currentTime -= 5;
  };

  const handleSpeed = (e) => {
    const video = getFocusedVideo();
    if (video) {
      video.playbackRate = e.target.value;
    }
  };

  const handleVolume = (e) => {
    const video = getFocusedVideo();
    if (video) video.volume = e.target.value;
  };

  const toggleVideoSize = () => {
    if (focusedIndex !== null) {
      onToggleSize(focusedIndex);
    }
  };

  const takeScreenshot = async () => {
    const video = getFocusedVideo();
    if (!video) return;
    const canvas = document.createElement("canvas");
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const context = canvas.getContext("2d");
    context.drawImage(video, 0, 0, canvas.width, canvas.height);
    const dataUrl = canvas.toDataURL("image/png");
    const blob = await new Promise((resolve) =>
      canvas.toBlob(resolve, "image/png")
    );
    if ("showSaveFilePicker" in window) {
      try {
        const fileHandle = await window.showSaveFilePicker({
          suggestedName: `screenshot-${Date.now()}.png`,
          types: [
            { description: "PNG file", accept: { "image/png": [".png"] } },
          ],
        });
        const writableStream = await fileHandle.createWritable();
        await writableStream.write(blob);
        await writableStream.close();
        return;
      } catch (err) {
        console.error("File saving was aborted or failed:", err);
      }
    }
    const link = document.createElement("a");
    link.href = dataUrl;
    link.download = `screenshot-${Date.now()}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (live) {
    return (
      <div className="bg-gray-800 p-2 flex items-center gap-4 text-gray-200 justify-evenly w-full">
        <button
          onClick={isRecording ? handleStopRecording : handleStartRecording}
          disabled={focusedIndex === null}
          className="p-2 rounded transition"
        >
          {isRecording ? (
            <Square size={20} className="text-red-500" />
          ) : (
            <CircleDot size={20} className="text-red-500" />
          )}
        </button>

        <div className="flex items-center gap-2">
          <Volume2 size={20} />
          <input
            type="range"
            min="0"
            max="1"
            step="0.05"
            onChange={handleVolume}
            className="w-24"
          />
        </div>

        <button
          onClick={takeScreenshot}
          className="p-2 rounded hover:bg-gray-700 transition"
        >
          <Camera size={20} />
        </button>

        <button
          onClick={toggleVideoSize}
          className="p-2 rounded hover:bg-gray-700 transition"
        >
          <Maximize size={20} />
        </button>
      </div>
    );
  }

  return (
    <div className="bg-gray-800 p-2 flex items-center gap-4 text-gray-200 justify-evenly w-full">
      <button
        onClick={togglePlay}
        className="p-2 rounded hover:bg-gray-700 transition"
      >
        {isPlaying ? <Pause size={20} /> : <Play size={20} />}
      </button>

      <button
        onClick={resetVideo}
        className="p-2 rounded hover:bg-gray-700 transition"
      >
        <RotateCcw size={20} />
      </button>

      <button
        onClick={skipBackward}
        className="p-2 rounded hover:bg-gray-700 transition"
      >
        <SkipBack size={20} />
      </button>

      <button
        onClick={skipForward}
        className="p-2 rounded hover:bg-gray-700 transition"
      >
        <SkipForward size={20} />
      </button>

      <div className="flex items-center gap-2">
        <span className="text-gray-400 text-sm">Speed</span>
        <select
          onChange={handleSpeed}
          className="bg-gray-700 text-white rounded p-1 text-sm"
          defaultValue="1"
        >
          <option value="0.5">0.5x</option>
          <option value="1">1x</option>
          <option value="1.5">1.5x</option>
          <option value="2">2x</option>
        </select>
      </div>

      <div className="flex items-center gap-2">
        <Volume2 size={20} />
        <input
          type="range"
          min="0"
          max="1"
          step="0.05"
          onChange={handleVolume}
          className="w-24"
        />
      </div>

      <button
        onClick={takeScreenshot}
        className="p-2 rounded hover:bg-gray-700 transition"
      >
        <Camera size={20} />
      </button>

      <button
        onClick={toggleVideoSize}
        className="p-2 rounded hover:bg-gray-700 transition"
      >
        <Maximize size={20} />
      </button>
    </div>
  );
}
